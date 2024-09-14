const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');


exports.getAll=(Model)=>{
  return catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const models = await features.query;
  
    res.status(200).json({
      status: 'success',
      results: models.length,
      data: {
        models,
      },
    });
  });
}

exports.getOne=(Model,popOptions)=>{
  return catchAsync(async (req, res, next) => {
    const query = await Model.findById(req.params.id)
    if(popOptions) query =query.populate(`${popOptions}`)
  
    if (!doc) {
      return next(new AppError('No document found with that ID',404))
    }
  
    res.status(200).json({
      status: 'success',
      data: {
        query,
      },
    });
  });
}

exports.createOne=(Model)=>{
  return catchAsync(async (req, res, next) => {
    const newModel = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newModel,
      },
    });
  });
}

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new appError('No document found with that Id', 404));
    }

    res.status(200).json({
      status: 'success',
      message: `${doc.name} got deleted`,
    });
  });
};

exports.updateOne = (Model) => {
  // console.log(Model);
  return catchAsync(async (req, res, next) => {
    const updatedModel = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedModel) {
      return res.status(404).json({
        status: 'fail',
        message: `No ${Model} found with that ID`,
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedModel,
      },
    });
  });
};
