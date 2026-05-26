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
const router = express.Router();

router.route("/").get(getProducts).post(createProductValidation, createProduct);
router
  .route("/:id")
  .get(getProductByIdValidation, getProductById)
  .put(updateProductValidation, updateProduct)
  .delete(deleteProductValidation, deleteProduct);

module.exports = router;
