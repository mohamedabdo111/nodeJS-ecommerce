const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const categoryRouter = require("./modules/category/category.route");
const subCategoryRouter = require("./modules/subCategory/subCategory.route");
const ApiError = require("./utils/apiError");
const globalErrorHandler = require("./middlewares/error.midleware");
const app = express();
dotenv.config({ path: "config.env" });

const PORT = process.env.PORT;

app.use(express.json());
if (process.env.NODE_DEV === "development") {
  app.use(morgan("dev"));
  console.log("Development mode", process.env.NODE_DEV);
}

// Mount
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subCategories", subCategoryRouter);



// Handle all routes
app.use((req, res, next) => {
  const path = req.originalUrl;
  next(new ApiError(400, `This route ${path} not found`));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
