const CategoryModel = require("./category.model");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../../utils/apiError");
const ApiFeature = require("../../utils/apiFeature");

// desc create category
// path /api/v1/categories
// access private

exports.createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const updateSlug = slugify(name);

  //
  // refactore again to use asynHandler
  const category = await CategoryModel.create({ name, slug: updateSlug });
  res.status(201).json({ data: category });
});

// desc get all categories
// path /api/v1/categories
// access public
exports.getAllCategories = asyncHandler(async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const skip = (page - 1) * limit;

  // build query
  const totalCategories = await CategoryModel.countDocuments();
  const apiFeature = new ApiFeature(CategoryModel.find(), req.query).filter().search().sort().limitFields().pagination(totalCategories);
  
  // execute query 
  const { mongooseQuery, paginationInfo } = apiFeature;
  const categories = await mongooseQuery;

  res.status(200).json({ data: categories, pagination : paginationInfo });
});

//desc get single category
// path /api/v1/categories/:id
//access public

exports.getSingleCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);

  if (!category) {
    return next(new ApiError(404, `no category found for this id ${id}`));
  }

  res.status(200).json({ data: category });
});

// desc update category
// path /api/v1/categories/:id
// access private

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const updateSlug = slugify(name);

  const category = await CategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: updateSlug },
    { new: true },
  );

  if (!category) {
    return next(new ApiError(404, `no category found for this id ${id}`));
  }

  res
    .status(200)
    .json({ message: "category updated successfully", data: category });
});

// desc delets category
// path /api/v1/categories/:id
// access private

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoryModel.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(404, `no category found for this id ${id}`));
  }

  res.status(200).json({ message: "category deleted successfully" });
});
