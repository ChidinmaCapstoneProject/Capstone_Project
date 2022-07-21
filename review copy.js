const express = require('express')
const router = express.Router();
const reviewController = require('../controllers/reviewsController')

router.post('/', reviewController.handleNewReview);
router.get('/', reviewController.getAllReviews);


module.exports = router;
