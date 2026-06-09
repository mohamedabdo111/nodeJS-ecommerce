const { check } = require("express-validator");
const validationResultMiddleware = require("../../middlewares/validation.middleware");
const slugify = require("slugify");
const UserModel = require("./user.model");
exports.addNewUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .custom((val, { req }) => {
      req.body.slug = slugify(req.body.name);
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
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  check("phone")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Phone number must be a valid Egyptian phone number"),

  check("confirmPassword").custom((val, { req }) => {
    if (val !== req.body.password) {
      return Promise.reject("confirmPassword must be equal to password");
    }
    return true;
  }),

  validationResultMiddleware,
];
