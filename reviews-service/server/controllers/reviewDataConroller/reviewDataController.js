const router = require('express').Router();
const ReviewDataRepository = require('./reviewDataRepository');
const { noReviewData, serverError } = require('../../constants/httpResponses');

router.get('/:space', async (req, res) => {
    const repo = new ReviewDataRepository(req.params.space);
    try {
        const reviewData = await repo.getBySpace();
        if (!reviewData) return res.status(404).json({ message: noReviewData });

        return res.status(200).json(reviewData);
    } catch (error) {
        return res.status(500).json({ message: serverError });
    }
});

module.exports = router;
