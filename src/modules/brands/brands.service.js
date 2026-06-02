const BrandModel = require("./brands.model");
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("../../services/handlerFactory");

exports.createBrand = createOne(BrandModel);

exports.getAllBrands = getAll(BrandModel);

exports.getSingleBrand = getOne(BrandModel);
exports.updateBrand = updateOne(BrandModel);

exports.deleteBrand = deleteOne(BrandModel);
