const express = require("express");
const { getAllSubCategories, createSubCategory, getSingleSubCategory, updateSubCategory, deleteSubCategory, createFilterObj, setCategoryIdToBody } = require("./subCategory.service");
const { createSubCategoryValidation, getSingleSubCategoryValidation, updateSubCategoryValidation, deleteSubCategoryValidation } = require("./subCategory.validation");
const router = express.Router({mergeParams: true});

router.route("/").get(createFilterObj ,getAllSubCategories).post(setCategoryIdToBody ,createSubCategoryValidation,createSubCategory);
router.route("/:id").get(getSingleSubCategoryValidation ,getSingleSubCategory).put(updateSubCategoryValidation,updateSubCategory).delete(deleteSubCategoryValidation,deleteSubCategory);

module.exports = router;