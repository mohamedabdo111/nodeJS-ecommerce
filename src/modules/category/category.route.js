const express = require("express");
const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("./category.service");
const {
  getCategoryValidation,
  updateCategoryValidation,
  deleteCategoryValidation,
  createCategoryValidation,
} = require("./category.validation");
const router = express.Router();
const subCategoryRoute = require("../subCategory/subCategory.route");
const { uploadImgageCategory, imageProcessor } = require("./category.upload");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
router.use("/:categoryId/subCategories", subCategoryRoute);
router
  .route("/")
  .post(
    protectRoutes,
    allowedTo("admin"),
    uploadImgageCategory.single("image"),
    imageProcessor,
    createCategoryValidation,
    createCategory,
  )
  .get(getAllCategories);
router
  .route("/:id")
  .get(getCategoryValidation, getSingleCategory)
  .put(
    protectRoutes,
    allowedTo("admin"),
    uploadImgageCategory.single("image"),
    imageProcessor,
    updateCategoryValidation,
    updateCategory,
  )
  .delete(
    protectRoutes,
    allowedTo("admin"),
    deleteCategoryValidation,
    deleteCategory,
  );
module.exports = router;
