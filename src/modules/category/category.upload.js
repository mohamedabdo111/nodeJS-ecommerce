const multer = require("multer");
const ApiError = require("../../utils/apiError");
const sharp = require("sharp");
const expressAsyncHandler = require("express-async-handler");

// using disk storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/categroies");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     fileName = `${uniqueSuffix}.${ext}`;
//     cb(null, fileName);
//   },
// });

//using memory storage when i want to manage the the file processing in the memory
const storage = multer.memoryStorage();

const imageProcessor = expressAsyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  const fileName = `category-${Date.now()}.webp`;
  await sharp(req.file.buffer)
    .webp({ quality: 90 })
    .toFile(`uploads/categories/${fileName}`);

  req.body.image = fileName;
  next();
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Accept images only"), false);
  }
};

const uploadImgageCategory = multer({ storage, fileFilter });
module.exports = { uploadImgageCategory, imageProcessor };
