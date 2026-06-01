const ProductModel = require("./product.model");
const ApiError = require("../../utils/apiError");
const slugify = require("slugify");
const { query } = require("express-validator");
const ApiFeature = require("../../utils/apiFeature");

exports.getProducts = async (page, limit, queryFilters) => {

const totalDocuments = await ProductModel.countDocuments();


  // build query

  const apiFeature = new ApiFeature(ProductModel.find(), queryFilters)
    .filter()
    .search("product")
    .sort()
    .limitFields()
    .pagination(totalDocuments);

  // execute query
  const {  mongooseQuery , paginationInfo } = apiFeature
  const products = await mongooseQuery;


  return { products, pagination: paginationInfo };
};

exports.createProduct = async (body) => {
  body.slug = slugify(body.title, { lower: true });
  return ProductModel.create(body);
};

exports.getProductById = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return product;
};

exports.updateProduct = async (id, body) => {
  if (body.title) {
    body.slug = slugify(body.title, { lower: true });
  }

  const product = await ProductModel.findByIdAndUpdate(id, body, {
    new: true,
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

exports.deleteProduct = async (id) => {
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return product;
};
