const ApiError = require("./apiError");

const MulterFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Accept images only"), false);
  }
};

module.exports = MulterFileFilter;
