const SubCategoryModel = require("./subCategory.model");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("../../services/handlerFactory");

exports.createFilterObj = (req, res, next) => {
  const filterObj = {};
  if (req.params.categoryId) filterObj.category = req.params.categoryId;

  req.filterObj = filterObj;
  next();
};

exports.getAllSubCategories = getAll(SubCategoryModel);

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createSubCategory = createOne(SubCategoryModel);

exports.getSingleSubCategory = getOne(SubCategoryModel);

exports.updateSubCategory = updateOne(SubCategoryModel);

exports.deleteSubCategory = deleteOne(SubCategoryModel);
