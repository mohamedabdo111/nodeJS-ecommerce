const express = require("express");
const {
  getAllUsers,
  addNewUser,
  getUser,
  updateUser,
  deleteUser,
  updateUserPassword,
} = require("./user.service");
const {
  addNewUserValidator,
  updateUserPasswordValidator,
  updateUserValidator,
} = require("./user.validation");
const { uploadUserImage, imageProcessor } = require("./user.upload");
const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(uploadUserImage, imageProcessor, addNewUserValidator, addNewUser);

router
  .route("/:id")
  .get(getUser)
  .put(uploadUserImage, imageProcessor, updateUserValidator, updateUser)
  .delete(deleteUser);

router.put(
  "/changePassword/:id",
  updateUserPasswordValidator,
  updateUserPassword,
);

module.exports = router;
