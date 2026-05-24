const { validationResult } = require("express-validator");


const validationResultMiddleware = (req, res , next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return next();
    }
  
    res.send({ errors: result.array() });
}

module.exports = validationResultMiddleware;