const express = require("express");
const { getAllSubCategories, createSubCategory, getSingleSubCategory, updateSubCategory, deleteSubCategory, createFilterObj, setCategoryIdToBody } = require("./subCategory.service");
const { createSubCategoryValidation, getSingleSubCategoryValidation, updateSubCategoryValidation, deleteSubCategoryValidation } = require("./subCategory.validation");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const router = express.Router({mergeParams: true});

router.route("/").get(createFilterObj ,getAllSubCategories).post(protectRoutes, allowedTo("admin"), setCategoryIdToBody ,createSubCategoryValidation,createSubCategory);
router.route("/:id").get(getSingleSubCategoryValidation ,getSingleSubCategory).put(protectRoutes, allowedTo("admin"), updateSubCategoryValidation,updateSubCategory).delete(protectRoutes, allowedTo("admin"), deleteSubCategoryValidation,deleteSubCategory);

module.exports = router;