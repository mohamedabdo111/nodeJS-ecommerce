const { check } = require("express-validator");
const validationResultMiddleware = require("../../middlewares/validation.middleware");
const UserModel = require("../user/user.model");

exports.signupValidation = [
  check("name").notEmpty().withMessage("Name is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (val) => {
      const user = await UserModel.findOne({ email: val });
      if (user) {
        return Promise.reject("Email already exist");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("confirmPassword").custom((val, { req }) => {
    if (val !== req.body.password) {
      return Promise.reject("confirmPassword must be equal to password");
    }
    return true;
  }),
  validationResultMiddleware,
];

exports.signinValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  validationResultMiddleware,
];

exports.verifyResetCodeValidation = [
  check("resetCode").notEmpty().withMessage("Reset code is required"),
  validationResultMiddleware,
];
