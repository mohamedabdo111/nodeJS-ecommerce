const validationResultMiddleware = require("../../middlewares/validation.middleware");
const { check, param, body } = require("express-validator");
const CategoryModel = require("../category/category.model");
const SubCategoryModel = require("../subCategory/subCategory.model");
const BrandModel = require("../brands/brands.model");
const slugify = require("slugify");

exports.createProductValidation = [
  check("title").notEmpty().withMessage("Product title is required"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required"),
  check("quantity").notEmpty().withMessage("Product quantity is required"),
  check("price").notEmpty().withMessage("Product price is required"),
  check("priceAfterDiscount")
    .optional()
    .isFloat()
    .isNumeric()
    .withMessage("Product price after discount must be a number")
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error(
          "Product price after discount must be less than product price",
        );
      }
      return true;
    }),

  check("colors")
    .optional()
    .isArray()
    .withMessage("Product colors must be an array"),
  check("images")
    .optional()
    .isArray()
    .withMessage("Product images must be an array"),
  check("imageCover").notEmpty().withMessage("Product image cover is required"),
  check("category")
    .notEmpty()
    .withMessage("Product category is required")
    .isMongoId()
    .withMessage("Invalid category id")
    .custom(async (categoryId) => {
      const category = await CategoryModel.findById(categoryId);
      if (!category) {
        throw new Error("Category not found");
      }
      return true;
    }),
  check("subCategories")
    .optional()
    .isArray()
    .withMessage("SubCategories must be an array"),
  check("subCategories.*").isMongoId().withMessage("Invalid subCategory id"),
  check("subCategories").custom(async (subCategoryIds, { req }) => {
    // check existance
    const subCategories = await SubCategoryModel.find({
      _id: { $in: subCategoryIds },
    });
    if (subCategoryIds && subCategories.length !== subCategoryIds.length) {
      throw new Error("Some subCategories are not found");
    }

    // check belong to the category
    const isSubCategoryBelongToCategory = subCategories.every(
      (sub) => sub.category.toString() === req.body.category.toString(),
    );
    if (!isSubCategoryBelongToCategory) {
      throw new Error("Some subCategories are not belong to the category");
    }
    return true;
  }),
  check("brand")
    .notEmpty()
    .withMessage("Product brand is required")
    .isMongoId()
    .withMessage("Invalid brand id")
    .custom(async (brandId) => {
      const brand = await BrandModel.findById(brandId);
      if (!brand) {
        throw new Error("Brand not found");
      }
      return true;
    }),
  body("title").custom((value, { req }) => {
    req.body.slug = slugify(value, { lower: true });
    return true;
  }),
  validationResultMiddleware,
];

exports.updateProductValidation = [
  param("id").isMongoId().withMessage("Invalid product id"),
  body("title").custom((value, { req }) => {
    req.body.slug = slugify(value, { lower: true });
    return true;
  }),
  validationResultMiddleware,
];

exports.deleteProductValidation = [
  param("id").isMongoId().withMessage("Invalid product id"),
  validationResultMiddleware,
];

exports.getProductByIdValidation = [
  param("id").isMongoId().withMessage("Invalid product id"),
  validationResultMiddleware,
];
