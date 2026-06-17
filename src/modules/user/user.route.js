const express = require("express");
const {
  getAllUsers,
  addNewUser,
  getUser,
  updateUser,
  deleteUser,
  updateUserPassword,
  getLoggedUser,
  updateLoggedUserPassword,
  updateLoggedUserData,
} = require("./user.service");
const {
  addNewUserValidator,
  updateUserPasswordValidator,
  updateUserValidator,
  updateLoggedUserPasswordValidator,
} = require("./user.validation");
const { uploadUserImage, imageProcessor } = require("./user.upload");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const router = express.Router();

router.use(protectRoutes);
router
  .route("/")
  .get(getAllUsers)
  .post(
    allowedTo("admin"),
    uploadUserImage,
    imageProcessor,
    addNewUserValidator,
    addNewUser,
  );

router.get("/getMe", getLoggedUser, getUser);


router.put("/changeMyPassword" , updateLoggedUserPasswordValidator, updateLoggedUserPassword)
router.put("/updateMyData" , uploadUserImage, imageProcessor, updateLoggedUserData)




router.use(allowedTo("admin"));

router.put(
  "/changePassword/:id",
  updateUserPasswordValidator,
  updateUserPassword,
);



router
  .route("/:id")
  .get(getUser)
  .put(
    uploadUserImage,
    imageProcessor,
    updateUserValidator,
    updateUser,
  )
  .delete(protectRoutes, allowedTo("admin"), deleteUser);





module.exports = router;
