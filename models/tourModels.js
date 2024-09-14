const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const slugify = require('slugify');
// const User= require('./userModel')

const tourSchema = new Schema(
  {
    name: {
      type: String,
      Required: [true, 'A Tour must have a Name'],
      unique: true,
      maxlength: [40, 'name cant have more than 40 character'],
      minlength: [10, 'name cant have less than 10 character'],
    },
    slug: String,

    duration: {
      type: Number,
      required: [true, 'A Tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A Tour must have a group size '],
    },
    difficulty: {
      type: String,
      required: [true, 'A Tour must have difficulty '],
      enum: { values: ['easy', 'medium', 'difficult'] },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      max: [5, 'rating cant be more than 5'],
      min: [1, 'rating cant be lower than 1'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    price: { type: Number, Required: [true, 'A tour should have a price'] },
    discount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      require: [true, 'A Tour must have a description '],
    },
    imageCover: {
      type: String,
      require: [true, 'A Tour must have a cover Image '],
    },
    image: {
      type: [String],
      createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
      },
    },
    secretTour: {
      type: Boolean,
    },
    startDate: {
      type: [Date],
    },
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day:Number
      },
    ],
    guides:[{
      type:mongoose.Schema.ObjectId,
      ref:'User'
    }]
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
//Document Middleware
// tourSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

tourSchema.pre('find', function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

tourSchema.pre(/^find/,function(next){
  this.populate({
    path:'guides',
    select:'-__v-passwordChangedAt'
  });
  next()
})

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

tourSchema.virtual('reviews',{
  ref:'Review',
  foreignField:'tour',
  localField:'_id'
})

const Tour = model('Tour', tourSchema);
module.exports = Tour;
