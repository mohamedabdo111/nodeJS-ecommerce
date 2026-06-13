const globalErrorHandler = (err, req, res, next) => {
  if (err.name === "JsonWebTokenError") {
    err.message = "Invalid token, please login again";
    err.statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    err.message = "Token expired, please login again";
    err.statusCode = 401;
  }
  if (process.env.NODE_DEV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

const sendErrorForDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message;
  const status = err.status || "error";
  const stack = err.stack;

  res.status(statusCode).json({ status, err, message, statusCode, stack });
};

const sendErrorForProd = (err, res) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ err: { message: err.message, statusCode } });
};

module.exports = globalErrorHandler;
