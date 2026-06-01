const fs = require("fs");
const ProductModel = require("../../../modules/product/product.model");
const connectDB = require("../../../database/database");
const path = require("path");

connectDB();

async function insertDummyProduct() {
  try {
    const filePath = path.join(__dirname, "../product.json");
    const products = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    await ProductModel.insertMany(products);
    console.log("Dummy products inserted successfully");
  } catch (error) {
    console.log("Error inserting dummy products", error);
  }
}

insertDummyProduct();
