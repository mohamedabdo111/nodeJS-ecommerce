const {check , param} = require("express-validator");
const validationResultMiddleware = require("../../middlewares/validation.middleware");


exports.createBrandValidation = [
    check("name").notEmpty().withMessage("Name is required").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long").isLength({ max: 50 }).withMessage("Name must be less than 50 characters long"),
    validationResultMiddleware,

]

exports.getSingleBrandValidation = [ 
    param("id").isMongoId().withMessage("Invalid brand id"),
    validationResultMiddleware,
]


exports.deleteBrandValidation = [ 
    param("id").isMongoId().withMessage("Invalid brand id"),
    validationResultMiddleware,
]

