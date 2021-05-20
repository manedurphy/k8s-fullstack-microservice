/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import ReviewsContainer from './ReviewsContainer.jsx';
const ReviewsService = () => {
    return window.initialData ? (
        <ReviewsContainer reviewInfo={window.initialData.reviewInfo} reviewsList={window.initialData.reviews} />
    ) : (
        <ReviewsContainer />
    );
};

export default ReviewsService;
