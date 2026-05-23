const express = require("express");
const {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("./category.services");
const router = express.Router();

router.route("/").post(createCategory).get(getAllCategories);
router.route("/:id").put(updateCategory).delete(deleteCategory);
module.exports = router;
