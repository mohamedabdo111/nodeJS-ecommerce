const asyncHandler = require("express-async-handler");
const SubCategoryModel = require("./subCategory.model");
const slugify = require("slugify");
const ApiError = require("../../utils/apiError");
const { body } = require("express-validator");
const ApiFeature = require("../../utils/apiFeature");

exports.createFilterObj = (req, res, next) => {
  const filterObj = {};
  if (req.params.categoryId) filterObj.category = req.params.categoryId;

  req.filterObj = filterObj;
  next();
};

exports.getAllSubCategories = asyncHandler(async (req, res) => {

  // build query 
  const totalDocs =await SubCategoryModel.countDocuments()
  const apiFeature = new ApiFeature(SubCategoryModel.find(), req.query).search().pagination(totalDocs).limitFields()

  // execute query
  const { mongooseQuery, paginationInfo } = apiFeature
  const subCategories = await mongooseQuery

  res.status(200).json({ data: subCategories, pagination: paginationInfo });
});

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });

  res.status(201).json({ data: subCategory });
});

exports.getSingleSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategoryModel.findById(id);

  if (!subCategory) {
    return next(new ApiError(404, `no sub category found for this id ${id}`));
  }

  res.status(200).json({ data: subCategory });
});

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategoryModel.findByIdAndUpdate(
    id,
    { name, category },
    { new: true },
  );

  if (!subCategory) {
    return next(new ApiError(404, `no sub category found for this id ${id}`));
  }

  res
    .status(200)
    .json({ message: "sub category updated successfully", data: subCategory });
});

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategory = await SubCategoryModel.findByIdAndDelete(id);

  if (!subCategory) {
    return next(new ApiError(404, `no sub category found for this id ${id}`));
  }

  res.status(200).json({ message: "sub category deleted successfully" });
});
