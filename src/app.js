// core imports
const path = require("path");

// third party imports
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

const ApiError = require("./utils/apiError");
const globalErrorHandler = require("./middlewares/error.midleware");
const app = express();
dotenv.config({ path: "config.env" });

// routes imports
const categoryRouter = require("./modules/category/category.route");
const subCategoryRouter = require("./modules/subCategory/subCategory.route");
const brandsRouter = require("./modules/brands/brands.route");
const productRouter = require("./modules/product/product.route");
const userRouter = require("./modules/user/user.route");
const authRouter = require("./modules/auth/auth.route");
const reviewRouter = require("./modules/reviews/reviews.route");
const wishlistRouter = require("./modules/wishlist/wishlist.route");
const userAddressRouter = require("./modules/userAddress/userAddress.route");
const couponRouter = require("./modules/coupon/coupon.route");
const cartRouter = require("./modules/cart/cart.route");
const orderRouter = require("./modules/orders/orders.route");
const { webHookHandler } = require("./modules/orders/order.service");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.post("/webhook-checkout",express.raw({ type: "application/json" }), webHookHandler);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../uploads")));
if (process.env.NODE_DEV === "development") {
  app.use(morgan("dev"));
}

// Mount


app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subCategories", subCategoryRouter);
app.use("/api/v1/brands", brandsRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/userAddress", userAddressRouter);
app.use("/api/v1/coupons", couponRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Handle all routes
app.use((req, res, next) => {
  const path = req.originalUrl;
  next(new ApiError(400, `This route ${path} not found`));
});

// Global error handling middleware
app.use(globalErrorHandler);

module.exports = app;
