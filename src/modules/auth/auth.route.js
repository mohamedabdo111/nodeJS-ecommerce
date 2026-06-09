const express = require("express");
const { Signup, Signin } = require("./auth.service");
const { signupValidation, signinValidation } = require("./auth.validation");
const router = express.Router();

router.route("/signup").post(signupValidation, Signup);
router.route("/login").post(signinValidation, Signin);

module.exports = router;
