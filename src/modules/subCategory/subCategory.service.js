const asyncHandler = require("express-async-handler");
const SubCategoryModel = require("./subCategory.model");
const slugify = require("slugify");
const ApiError = require("../../utils/apiError");
const { body } = require("express-validator");

exports.createFilterObj = (req, res, next) => {
  const filterObj = {};
  if (req.params.categoryId) filterObj.category = req.params.categoryId;

  req.filterObj = filterObj;
  next();
};

exports.getAllSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;
  const filter = req.filterObj;
  const totalSubCategories = await SubCategoryModel.countDocuments(filter);

  const pagination = {
    page,
    limit,
    results: totalSubCategories,
  };

  const subCategories = await SubCategoryModel.find(filter)
    .skip(skip)
    .limit(limit)
    .populate("category", "name");

  res.status(200).json({ data: subCategories, pagination });
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
