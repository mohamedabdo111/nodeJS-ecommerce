const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const categoryRouter = require("./modules/category/category.router");
const app = express();
dotenv.config({ path: "config.env" });

const PORT = process.env.PORT;

app.use(express.json());
if (process.env.NODE_DEV === "development") {
  app.use(morgan("dev"));
  console.log("Development mode", process.env.NODE_DEV);
}

// routes

app.use("/api/v1/categories", categoryRouter);

module.exports = app;
