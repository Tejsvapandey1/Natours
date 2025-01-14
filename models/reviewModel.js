const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    review: { type: String, required: [true, 'cannot be empty'] },
    rating: {
      type: Number,
      min: 1,
      max: [5, "can't be more than 5"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    tour: { // Changed from 'tour1' to 'tour' to match the populate path
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A Tour should have a review'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tour', // Changed to match the schema field name
    select: 'name',
  }).populate({
    path: 'user',
    select: 'name photo',
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;


