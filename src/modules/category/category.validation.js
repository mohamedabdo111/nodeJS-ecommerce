const { param, check } = require("express-validator");
const validationResultMiddleware = require("../../middlewares/validation.middleware");

exports.getCategoryValidation = [
    param("id").isMongoId().withMessage("Invalid category id"),
    validationResultMiddleware,
]


exports.createCategoryValidation = [
    check("name").notEmpty().withMessage("Name is required").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long").isLength({ max: 50 }).withMessage("Name must be less than 50 characters long"),
    validationResultMiddleware,
]

exports.updateCategoryValidation = [
    param("id").isMongoId().withMessage("Invalid category id"),
    check("name").notEmpty().withMessage("Name is required").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long").isLength({ max: 50 }).withMessage("Name must be less than 50 characters long"),
    validationResultMiddleware,
]


exports.deleteCategoryValidation = [
    param("id").isMongoId().withMessage("Invalid category id"),
    validationResultMiddleware,
]


