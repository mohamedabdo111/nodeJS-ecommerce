const express = require("express");
const { getAllSubCategories, createSubCategory, getSingleSubCategory, updateSubCategory, deleteSubCategory } = require("./subCategory.service");
const { createSubCategoryValidation, getSingleSubCategoryValidation, updateSubCategoryValidation, deleteSubCategoryValidation } = require("./subCategory.validation");
const router = express.Router();


router.route("/").get(getAllSubCategories).post(createSubCategoryValidation,createSubCategory);
router.route("/:id").get(getSingleSubCategoryValidation ,getSingleSubCategory).put(updateSubCategoryValidation,updateSubCategory).delete(deleteSubCategoryValidation,deleteSubCategory);

module.exports = router;