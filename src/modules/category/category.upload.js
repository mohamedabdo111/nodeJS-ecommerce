const multer = require("multer");
const ApiError = require("../../utils/apiError");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categroies");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    fileName = `${uniqueSuffix}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Accept images only"), false);
  }
};

const uploadImgageCategory = multer({ storage, fileFilter });
module.exports = uploadImgageCategory;
