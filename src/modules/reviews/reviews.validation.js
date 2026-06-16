const { check, param } = require("express-validator");
const validationResultMiddleware = require("../../middlewares/validation.middleware");
const UserModel = require("../user/user.model");
const ReviewModel = require("./reviews.model");
const ProductModel = require("../product/product.model");


exports. createReviewsValidator = [
    check("title").notEmpty().withMessage("Title is required"),
    check("rate").notEmpty().withMessage("Rate is required").isFloat({ min: 1, max: 5 }).withMessage("Rate must be between 1 and 5"),
    check("product").notEmpty().withMessage("Product is required").isMongoId().withMessage("Invalid product id")
    .custom(async(val) => {
        const product = await ProductModel.findById(val);

        if(!product) {
            return Promise.reject("Product not found");
        }
        return true;
    }),
    check("user").notEmpty().withMessage("User is required").isMongoId().withMessage("Invalid user id").custom(async(val , {req}) => {
        const user = await UserModel.findById(val);
        if(!user) {
            return Promise.reject("User not found");
        }

        const reviews = await ReviewModel.find({ user: val , product: req.body.product });
        if(reviews.length > 0) {
            return Promise.reject("You have already reviewed this product");
        }
        return true;
    }),
    validationResultMiddleware,
]


exports.updateReviewValidator = [
    param("id").isMongoId().withMessage("Invalid review id")
    .custom(async (val , {req} ) => {
        const review = await ReviewModel.findById(val);

        if(!review) {
            return Promise.reject("Review not found");
        }

        if(review.user._id.toString() !== req.user.id.toString()) {
            return Promise.reject("You are not authorized to update this review");
        }
        return true;
    }),
    check("title").notEmpty().withMessage("Title is required"),
    check("rate").notEmpty().withMessage("Rate is required").isFloat({ min: 1, max: 5 }).withMessage("Rate must be between 1 and 5"),
    
    validationResultMiddleware,
]

exports.deleteReviewValidator = [
    param("id").isMongoId().withMessage("Invalid review id")
    .custom(async (val , {req}) => {
        const review = await ReviewModel.findById(val);

        if(!review) {
            return Promise.reject("Review not found");
        }

        console.log(req.user.role, "role");
        console.log(review.user.toString(), "review user");
        console.log(req.user.id.toString(), "user id");

        if(req.user.role === "user" && review.user.toString() !== req.user.id.toString()) {
            return Promise.reject("You are not authorized to delete this review");
        }
        return true;
    }),

    validationResultMiddleware,
]