import fs from 'fs';
import path from 'path';
import SSR from '../classes/SSR';

const indexPath =
    process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '../public/index.html')
        : path.resolve(__dirname, '../../public/index.html');

export default [
    '/buildings/:space',
    (req, res) => {
        fs.readFile(indexPath, 'utf8', async (_err, data) => {
            try {
                const ssr = new SSR(req.baseUrl, data);
                const html = await ssr.getHtml();

                return res.send(html);
            } catch (error) {
                console.error('[ERROR] 20: ', error);
                return res.send(data);
            }
        });
    },
];
