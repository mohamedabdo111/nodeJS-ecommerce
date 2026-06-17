const express = require("express");
const {
  Signup,
  Signin,
  forgetPassword,
  verifyResetCode,
  resetPassword,
} = require("./auth.service");
const {
  signupValidation,
  signinValidation,
  verifyResetCodeValidation,
} = require("./auth.validation");
const router = express.Router();

router.route("/signup").post(signupValidation, Signup);
router.route("/login").post(signinValidation, Signin);
router.route("/forgetPassword").post(forgetPassword);
router
  .route("/verifyResetCode")
  .post(verifyResetCodeValidation, verifyResetCode);
router.route("/resetPassword").post(resetPassword);

module.exports = router;
