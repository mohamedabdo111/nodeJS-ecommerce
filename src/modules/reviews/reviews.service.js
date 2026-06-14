


const ReviewModel = require("./reviews.model");
const { createOne, getAll, updateOne, deleteOne } = require("../../services/handlerFactory");

exports.createReview = createOne(ReviewModel);


exports.getAllReviews = getAll(ReviewModel);

exports.getReviewsByProductId = getAll(ReviewModel, "product");


exports.updateReview = updateOne(ReviewModel);

exports.deleteReview = deleteOne(ReviewModel);