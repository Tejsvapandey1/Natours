const express = require('express');
const reviewController = require(`${__dirname}/../controller/reviewController.js`);
const router = express.Router({mergeParams:true});

router
  .route('/')
  .get(reviewController.getAllTourReviews)
  .post(reviewController.createReview );

router.route('/:id').delete(reviewController.deleteReview)
module.exports = router;
