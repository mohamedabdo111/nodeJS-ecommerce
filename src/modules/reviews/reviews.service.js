const expressAsyncHandler = require("express-async-handler");
const ReviewModel = require("./reviews.model");
const { deleteOne } = require("../../services/handlerFactory");
const ApiError = require("../../utils/apiError");

exports.createFilterObj = (req , res , next) => {
  const filterObj ={}
  if(req.params.productId) filterObj.product = req.params.productId
  req.filterObj = filterObj
  next()
}

exports.createReview = expressAsyncHandler(async (req, res, next) => {
  const { title, rate, user, product } = req.body;

  const review = await ReviewModel.create({ title, rate, user, product });

  res.status(201).json({ message: "Review created successfully", review });
});

exports.getAllReviews = expressAsyncHandler(async (req, res, next) => {

  const { product } = req.query;
  const filter = { };

  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  if(product ) {
    filter.product = product;
  }

  if(req.filterObj){
    filter.product = req.filterObj.product;
  }

  const total = await ReviewModel.countDocuments();

  const pagination = {
    page,
    limit,
    totalReviews: total,
  };

  const reviews = await ReviewModel.find(filter).skip(skip).limit(limit);

  res.status(200).json({ data: reviews, pagination });
});

exports.updateReview = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, rate } = req.body;
  const review = await ReviewModel.findByIdAndUpdate(
    id,
    { title, rate },
    { new: true },
  );

  if (!review) {
    return next(new ApiError(404, "Review not found"));
  }

  res.status(200).json({ message: "Review updated successfully", review });
});


exports.deleteReview = deleteOne(ReviewModel);