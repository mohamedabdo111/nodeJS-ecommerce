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
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const router = express.Router();

router
  .route("/")
  .post(
    protectRoutes,
    allowedTo("admin"),
    uploadImageBrand.single("image"),
    imageProcessor,
    createBrandValidation,
    createBrand,
  )
  .get(getAllBrands);
router
  .route("/:id")
  .put(
    protectRoutes,
    allowedTo("admin"),
    uploadImageBrand.single("image"),
    imageProcessor,
    createBrandValidation,
    updateBrand,
  )
  .get(getSingleBrandValidation, getSingleBrand)
  .delete(
    protectRoutes,
    allowedTo("admin"),
    deleteBrandValidation,
    deleteBrand,
  );

module.exports = router;
