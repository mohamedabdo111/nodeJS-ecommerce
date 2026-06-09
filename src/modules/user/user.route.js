const express = require("express");
const {
  getAllUsers,
  addNewUser,
  getUser,
  updateUser,
  deleteUser,
} = require("./user.service");
const { addNewUserValidator } = require("./user.validation");
const { uploadUserImage, imageProcessor } = require("./user.upload");
const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(uploadUserImage, imageProcessor, addNewUserValidator, addNewUser);

router
  .route("/:id")
  .get(getUser)
  .put(uploadUserImage, imageProcessor, updateUser)
  .delete(deleteUser);

module.exports = router;
