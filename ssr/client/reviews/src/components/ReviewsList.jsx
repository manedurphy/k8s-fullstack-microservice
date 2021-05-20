/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import React from 'react';
import Review from './Review.jsx';

const ReviewList = ({ reviewsList = null }) => {
    const excessReviews = reviewsList.length > 9 ? true : false;
    const [show, setShow] = React.useState(3);

    const handleShowMore = () => {
        if (show < 9) setShow(show + 3);
    };

    const SeeAll = () => (
        <a href="http://google.com" id="reviews-see-all-btn" className="blue-links" target="_blank">
            See all &#8594;{' '}
        </a>
    );

    const LoadMore = () => (
        <a id="reviews-load-more-btn" className="blue-links" onClick={handleShowMore}>
            Load more
        </a>
    );

    return (
        <React.Fragment>
            {reviewsList.slice(0, show).map((review, i) => (
                <Review key={i} review={review} />
            ))}
            <br />

            {reviewsList.length > show && show < 9 && <LoadMore />}

            {excessReviews && show >= 9 && <SeeAll />}
        </React.Fragment>
    );
};

export default ReviewList;
