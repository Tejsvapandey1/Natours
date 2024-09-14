const express = require('express');
const reviewController = require(`../controller/reviewController`);
const authController = require(`../controller/authController`);
const {
  getAllTours,
  addTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require(`${__dirname}/../controller/tourController.js`);

const router = express.Router();

router.route('/monthly-plan/:year').get(getMonthlyPlan);

router.route('/tour-stats').get(getTourStats);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(authController.protect, getAllTours).post(addTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(authController.protect, authController.restrictTo('admin'), deleteTour);

router.route('/:tourId/reviews').post(reviewController.createReview);

module.exports = router;
