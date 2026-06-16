const express = require("express");
const {
  createReview,
  getReviewsByProductId,
  getAllReviews,
  updateReview,
  deleteReview,
  createFilterObj,
  addProductIdAndUserIdToBody,
} = require("./reviews.service");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const {
  createReviewsValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require("./reviews.validation");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(
    protectRoutes,
    allowedTo("user"),
    addProductIdAndUserIdToBody,
    createReviewsValidator,
    createReview,
  )
  .get(createFilterObj, getAllReviews);

router
  .route("/:id")
  .put(protectRoutes, allowedTo("user"), updateReviewValidator, updateReview)
  .delete(
    protectRoutes,
    allowedTo("user", "admin"),
    deleteReviewValidator,
    deleteReview,
  );

module.exports = router;
