const asyncHandler = require("express-async-handler");
const ProductModel = require("./product.model");
const ApiError = require("../../utils/apiError");
const slugify = require("slugify");

exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const skip = (page - 1) * limit;

  const totalProducts = await ProductModel.countDocuments();

  const pagination = {
    page,
    limit,
    results: totalProducts,
  };

  const products = await ProductModel.find()
    .skip(skip)
    .limit(limit)
    .populate("category", "name")
    .populate("subCategory", "name");
  res.status(200).json({
    status: "success",
    data: products,
    pagination,
  });
});

exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title, { lower: true });
  const product = await ProductModel.create(req.body);
  res.status(201).json({
    status: "success",
    data: product,
  });
});
exports.updateProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.title);
  const { id } = req.params;
  const product = await ProductModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }
  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }
  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(404, "Product not found"));
  }
  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});
