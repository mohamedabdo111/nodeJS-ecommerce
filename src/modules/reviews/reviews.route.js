const express = require("express");
const { createReview, getReviewsByProductId, getAllReviews, updateReview, deleteReview } = require("./reviews.service");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const { createReviewsValidator, updateReviewValidator } = require("./reviews.validation");

const router = express.Router();


router.route("/").post(protectRoutes,allowedTo("user" , "admin") ,createReviewsValidator, createReview).get(getAllReviews);

router.route("/:id").put(protectRoutes,allowedTo("user" , "admin") , updateReviewValidator, updateReview).delete(protectRoutes ,allowedTo("user" , "admin") , deleteReview);

module.exports = router;