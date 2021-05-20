const ReviewDataRepository = require('../reviewDataConroller/reviewDataRepository');
const Review = require('../../db/models/Review');
const User = require('../../db/models/User');

class ReviewRepository {
    constructor(space) {
        this.space = space;
        this.reviewDataRepository = new ReviewDataRepository(this.space);
    }

    async get() {
        const reviews = await Review.findAll({
            where: { space: this.space },
            attributes: ['rating', 'content', 'date'],
            include: {
                model: User,
                attributes: ['first_name', 'last_name'],
            },
            order: [['date', 'desc']],
        });

        const reviewInfo = await this.reviewDataRepository.getBySpace();

        return { reviews, reviewInfo };
    }

    create(review) {
        return Review.create({ ...review, space: this.space });
    }

    update(updatedReview) {
        return Review.update(updatedReview, { where: { id: updatedReview.id, user_id: updatedReview.user_id } });
    }

    delete(reviewId) {
        return Review.destroy({ where: { id: reviewId.id, user_id: reviewId.user_id } });
    }
}

module.exports = ReviewRepository;
