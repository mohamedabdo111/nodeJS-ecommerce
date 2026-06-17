const fs = require("fs");
const ProductModel = require("../../../modules/product/product.model");
const connectDB = require("../../../database/database");

connectDB();

async function deleteAllProducts() {
  try {
    await ProductModel.deleteMany();
  } catch (error) {}
}

deleteAllProducts();
