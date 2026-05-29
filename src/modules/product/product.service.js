const ProductModel = require("./product.model");
const ApiError = require("../../utils/apiError");
const slugify = require("slugify");
const { query } = require("express-validator");

exports.getProducts = async (
  page,
  limit,
  queryFilters,
  sort,
  fields,
  keyword,
) => {
  const skip = (page - 1) * limit;

  const filters = {};
  if (queryFilters.minPrice) {
    filters.price = {
      $gte: Number(queryFilters.minPrice),
      ...filters.price,
    };
  }
  if (queryFilters.maxPrice) {
    filters.price = {
      $lte: Number(queryFilters.maxPrice),
      ...filters.price,
    };
  }

  if (queryFilters.category) {
    filters.category = queryFilters.category;
  }
  if (queryFilters.subCategory) {
    filters.subCategories = queryFilters.subCategory;
  }

  const formattedSort = sort.split(",").join(" ");
  const formattedFields = fields.split(",").join(" ");

  //   search by word
  if (keyword) {
    filters.$or = [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  const products = await ProductModel.find(filters)
    .skip(skip)
    .limit(limit)
    .populate("category", "name")
    .populate("subCategories", "name")
    .sort(formattedSort)
    .select(formattedFields);

  const pagination = {
    page,
    limit,
    results: products.length,
  };

  return { products, pagination };
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
