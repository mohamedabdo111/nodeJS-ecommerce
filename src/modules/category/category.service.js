const CategoryModel = require("./category.model");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("../../services/handlerFactory");

// desc create category
// path /api/v1/categories
// access private
exports.createCategory = createOne(CategoryModel);
// desc get all categories
// path /api/v1/categories
// access public
exports.getAllCategories = getAll(CategoryModel);

//desc get single category
// path /api/v1/categories/:id
//access public
exports.getSingleCategory = getOne(CategoryModel);

// desc update category
// path /api/v1/categories/:id
// access private
exports.updateCategory = updateOne(CategoryModel);

// desc delets category
// path /api/v1/categories/:id
// access private
exports.deleteCategory = deleteOne(CategoryModel);
