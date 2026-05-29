const asyncHandler = require("express-async-handler");
const productService = require("./product.service");

exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const queryFilters = { ...req.query };
  const excludeFields = ["page", "limit", "sort", "fields"];
  excludeFields.forEach((field) => delete queryFilters[field]);
  const sort = req.query.sort || "-createdAt";

  const { products, pagination } = await productService.getProducts(
    page,
    limit,
    queryFilters,
    sort,
  );

  res.status(200).json({
    status: "success",
    data: products,
    pagination,
  });
});

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);

  res.status(201).json({
    status: "success",
    data: product,
  });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});
