/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import React from 'react';
import ReviewsList from './ReviewsList.jsx';
import Title from './Title.jsx';
import Stats from './Stats.jsx';
import { getReviewsData } from '../actions/index.js';

const ReviewsContainer = ({ reviewsList, reviewInfo }) => {
    const [data, setData] = React.useState({ reviewsList, reviewInfo });

    React.useEffect(() => {
        if (reviewInfo == null) {
            getReviewsData()
                .then((res) => {
                    setData({ reviewsList: res.data.reviews, reviewInfo: res.data.reviewInfo });
                })
                .catch(() => setData({ reviewsList: [], reviewInfo: { reviewCount: 0, avg: null } }));
        }
    }, []);

    return (
        data.reviewInfo && (
            <div className="reviews-section-container">
                <Title />
                <Stats reviewInfo={data.reviewInfo} />
                {data.reviewsList.length > 0 && <ReviewsList reviewsList={data.reviewsList} />}
            </div>
        )
    );
};

export default ReviewsContainer;
