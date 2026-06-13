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
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(
    protectRoutes,
    allowedTo("admin"),
    uploadUserImage,
    imageProcessor,
    addNewUserValidator,
    addNewUser,
  );

router
  .route("/:id")
  .get(getUser)
  .put(
    protectRoutes,
    allowedTo("admin"),
    uploadUserImage,
    imageProcessor,
    updateUserValidator,
    updateUser,
  )
  .delete(protectRoutes, allowedTo("admin"), deleteUser);

router.put(
  "/changePassword/:id",
  protectRoutes,
  allowedTo("admin"),
  updateUserPasswordValidator,
  updateUserPassword,
);

module.exports = router;
