/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
const Stats = ({ reviewInfo = null }) => {
    const { avg, reviewCount } = reviewInfo;

    return (
        <div className="reviews-section-stats">
            <span className="fas fa-sm fa-star star"></span>
            {avg ? avg.slice(0, 3) : 0} <span className="grey-line">|</span> {reviewCount} Google reviews
        </div>
    );
};

export default Stats;
