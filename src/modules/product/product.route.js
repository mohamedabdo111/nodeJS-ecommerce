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
const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    uploadImageProduct,
    imageProcessor,
    createProductValidation,
    createProduct,
  );
router
  .route("/:id")
  .get(getProductByIdValidation, getProductById)
  .put(
    uploadImageProduct,
    imageProcessor,
    updateProductValidation,
    updateProduct,
  )
  .delete(deleteProductValidation, deleteProduct);

module.exports = router;
