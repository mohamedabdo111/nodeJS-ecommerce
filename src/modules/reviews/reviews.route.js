const express = require("express");
const { createReview, getReviewsByProductId, getAllReviews, updateReview } = require("./reviews.service");

const router = express.Router();

router.route("/").post(createReview).get(getAllReviews);

router.route("/:productId").get(getReviewsByProductId);

router.route("/:id").put( updateReview);

module.exports = router;