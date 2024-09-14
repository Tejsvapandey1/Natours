const catchAsync = require('../utils/catchAsync');
const review = require('../../models/reviewModel')
const factory= require('./handlerFactory.js')

exports.getAllTourReviews = catchAsync(async (req, res, next) => {

  const reviewdata = await review.find()
  res.status(200).json({
    result:reviewdata.length,
    message: 'Everything ok',
    data:reviewdata
  });
});

exports.createReview = factory.createOne(review)


exports.deleteReview = factory.deleteOne(review)
exports.updateReveiew=factory.updateOne(review)
