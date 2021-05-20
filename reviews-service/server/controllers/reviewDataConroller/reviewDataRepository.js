const Review = require('../../db/models/Review');
const { fn, col } = require('sequelize');

class ReviewDataRepository {
    constructor(space) {
        this.space = space;
    }

    getBySpace() {
        if (this.space != null)
            return Review.findOne({
                where: { space: this.space },
                attributes: [
                    [fn('count', col('id')), 'reviewCount'],
                    [fn('avg', col('rating')), 'avg'],
                ],
            });
    }
}

module.exports = ReviewDataRepository;
