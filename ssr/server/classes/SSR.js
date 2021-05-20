import axios from 'axios';
import writeClient from '../redis/write';
import readlient from '../redis/read';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReviewsService from '../../client/reviews/src/components/ReviewsContainer';

class SSR {
    constructor(baseUrl, html) {
        this.baseUrl = baseUrl;
        this.html = html;
        this.data = null;
    }

    getId() {
        const splitUrl = this.baseUrl.split('/');
        return splitUrl[splitUrl.length - 1];
    }

    checkCache() {
        console.log('checking redis store');
        return new Promise((resolve, reject) => {
            readlient.get(this.getId(), function (err, html) {
                if (err) reject(err);
                resolve(html);
            });
        });
    }

    setCacheData(html) {
        console.log('setting html in redis store');
        return new Promise((resolve, reject) => {
            writeClient.set(this.getId(), html, function (err) {
                if (err) reject(err);
                resolve(html);
            });
        });
    }

    async getData() {
        const { data } = await axios.get(process.env.GO_DOMAIN + this.getId());
        this.data = data;
    }

    async renderReact() {
        await this.getData();

        const reviewsJSX = ReactDOMServer.renderToString(
            <ReviewsService reviewInfo={this.data.reviewInfo} reviewsList={this.data.reviews} />
        );

        return { reviewsJSX };
    }

    async getHtml() {
        let html = await this.checkCache();

        if (html) {
            console.log('found html in redis store');
            return html;
        }

        html = await this.renderReact();
        html = this.html.replace('<div id="reviews"></div>', `<div id="reviews">${html.reviewsJSX}</div>`);
        html = html.replace(
            '<script defer="defer" id="global"></script>',
            `<script defer="defer" id="global">window.initialData = ${JSON.stringify(this.data)}</script>`
        );

        await this.setCacheData(html);
        return html;
    }
}

export default SSR;
