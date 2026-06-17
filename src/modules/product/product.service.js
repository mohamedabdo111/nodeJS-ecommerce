const ProductModel = require("./product.model");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("../../services/handlerFactory");

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = getAll(ProductModel, "product");

// @desc    Create product
// @route   POST /api/v1/products
// @access  Private
exports.createProduct = createOne(ProductModel);

// @desc    Get single product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProductById = getOne(ProductModel, "reviews");

// @desc    Update product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = updateOne(ProductModel);

// @desc    Delete product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = deleteOne(ProductModel);
