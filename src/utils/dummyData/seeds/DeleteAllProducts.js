const fs = require("fs");
const ProductModel = require("../../../modules/product/product.model");
const connectDB = require("../../../database/database");

connectDB();

async function deleteAllProducts() {
  try {
    const deleteProducts = await ProductModel.deleteMany();
    console.log("All products deleted successfully");
  } catch (error) {
    console.log("Error deleting all products", error);
  }
}

deleteAllProducts();
