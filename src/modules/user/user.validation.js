const { check, param } = require("express-validator");
const validationResultMiddleware = require("../../middlewares/validation.middleware");
const slugify = require("slugify");
const UserModel = require("./user.model");
const bcrypt = require("bcrypt");
exports.addNewUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email")
    .custom(async (val) => {
      const user = await UserModel.findOne({ email: val });
      if (user) {
        return Promise.reject(new Error("email already exists"));
      }
      return true;
    }),

  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Phone number must be a valid Egyptian phone number"),

  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),

  check("confirmPassword").custom((val, { req }) => {
    if (val !== req.body.password) {
      return Promise.reject("confirmPassword must be equal to password");
    }
    return true;
  }),

  validationResultMiddleware,
];

exports.updateUserValidator = [
  param("id").isMongoId().withMessage("Invalid user id"),
  check("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("invalid email")
    .custom(async (val, { req }) => {
      if (!val) {
        return true;
      }
      const user = await UserModel.findOne({ email: val });
      if (user && user._id.toString() !== req.params.id) {
        return Promise.reject(new Error("email already exists"));
      }
      return true;
    }),

  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Phone number must be a valid Egyptian phone number"),

  validationResultMiddleware,
];

exports.updateUserPasswordValidator = [
  param("id").isMongoId().withMessage("Invalid user id"),
  check("currentPassword")
    .notEmpty()
    .withMessage("current password is required")
    .custom(async (val, { req }) => {
      if (!val) {
        return true;
      }
      const user = await UserModel.findById(req.params.id);

      if (!user) {
        return Promise.reject("user not found");
      }
      const isMatch = await bcrypt.compare(val, user.password);
      if (!isMatch) {
        return Promise.reject("current password is incorrect");
      }
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  check("confirmPassword").custom((val, { req }) => {
    if (val !== req.body.password) {
      return Promise.reject("confirmPassword must be equal to password");
    }
    return true;
  }),
  validationResultMiddleware,
];


exports.updateLoggedUserPasswordValidator = [
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  check("confirmPassword").custom((val, { req }) => {
    if (val !== req.body.password) {
      return Promise.reject("confirmPassword must be equal to password");
    }
    return true;
  }),
  validationResultMiddleware,
]
