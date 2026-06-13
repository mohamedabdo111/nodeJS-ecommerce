const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("./product.service");
const {
  createProductValidation,
  getProductByIdValidation,
  deleteProductValidation,
  updateProductValidation,
} = require("./product.validation");
const { uploadImageProduct, imageProcessor } = require("./product.upload");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    protectRoutes,
    allowedTo("admin"),
    uploadImageProduct,
    imageProcessor,
    createProductValidation,
    createProduct,
  );
router
  .route("/:id")
  .get(getProductByIdValidation, getProductById)
  .put(
    protectRoutes,
    allowedTo("admin"),
    uploadImageProduct,
    imageProcessor,
    updateProductValidation,
    updateProduct,
  )
  .delete(
    protectRoutes,
    allowedTo("admin"),
    deleteProductValidation,
    deleteProduct,
  );

module.exports = router;
