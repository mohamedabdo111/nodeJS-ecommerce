const express = require("express");
const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("./category.service");
const { getCategoryValidation, updateCategoryValidation, deleteCategoryValidation, createCategoryValidation } = require("./category.validation");
const router = express.Router();
const subCategoryRoute = require("../subCategory/subCategory.route");

router.use("/:categoryId/subCategories" , subCategoryRoute);
router.route("/").post(createCategoryValidation, createCategory).get(getAllCategories);
router
  .route("/:id")
  .get(getCategoryValidation, getSingleCategory)
  .put(updateCategoryValidation, updateCategory)
  .delete(deleteCategoryValidation, deleteCategory);
module.exports = router;
