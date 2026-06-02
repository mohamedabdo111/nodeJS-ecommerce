const { check, param, body } = require("express-validator");
const validationResultMiddleware = require("../../middlewares/validation.middleware");
const slugify = require("slugify");
exports.createSubCategoryValidation = [
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters long"),
  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .isMongoId()
    .withMessage("Invalid category id"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value, { lower: true });
    return true;
  }),
  validationResultMiddleware,
];

exports.getSingleSubCategoryValidation = [
  param("id").isMongoId().withMessage("Invalid sub category id"),
  validationResultMiddleware,
];

exports.updateSubCategoryValidation = [
  param("id").isMongoId().withMessage("Invalid sub category id"),
  check("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters long"),
  check("category").optional().isMongoId().withMessage("Invalid category id"),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value, { lower: true });
    return true;
  }),
  validationResultMiddleware,
];

exports.deleteSubCategoryValidation = [
  param("id").isMongoId().withMessage("Invalid sub category id"),
  validationResultMiddleware,
];
