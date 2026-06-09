const multer = require("multer");
const expressAsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const MulterFileFilter = require("../../utils/multerFileFilter");

const storage = multer.memoryStorage();

const imageProcessor = expressAsyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const fileName = `user-${uuidv4()}.webp`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .webp({ quality: 90 })
    .toFile(`uploads/users/${fileName}`);
  req.body.profileImg = fileName;
  next();
});

const uploadUserImage = multer({
  storage,
  fileFilter: MulterFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).single("profileImg");

module.exports = { uploadUserImage, imageProcessor };
