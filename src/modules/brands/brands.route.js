const express = require("express");
const {
  createBrand,
  getAllBrands,
  updateBrand,
  getSingleBrand,
  deleteBrand,
} = require("./brands.service");
const {
  createBrandValidation,
  getSingleBrandValidation,
  deleteBrandValidation,
} = require("./brands.validation");
const { uploadImageBrand, imageProcessor } = require("./brand.upload");
const router = express.Router();

router
  .route("/")
  .post(
    uploadImageBrand.single("image"),
    imageProcessor,
    createBrandValidation,
    createBrand,
  )
  .get(getAllBrands);
router
  .route("/:id")
  .put(createBrandValidation, updateBrand)
  .get(getSingleBrandValidation, getSingleBrand)
  .delete(deleteBrandValidation, deleteBrand);

module.exports = router;
