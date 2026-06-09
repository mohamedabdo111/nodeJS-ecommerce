const multer = require("multer");
const expressAsyncHandler = require("express-async-handler");
const storage = multer.memoryStorage();
const sharp = require("sharp");
const MulterFileFilter = require("../../utils/multerFileFilter");
const { v4: uuidv4 } = require("uuid");

const imageProcessor = expressAsyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next();
  }

  if (req.files?.imageCover?.[0]) {
    const fileName = `product-${uuidv4()}-cover.webp`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(1000, 1000)
      .webp({ quality: 90 })
      .toFile(`uploads/products/covers/${fileName}`);
    req.body.imageCover = fileName;
  }

  if (req.files?.images) {
    const images = [];
    await Promise.all(
      req.files.images.map(async (image, index) => {
        const fileName = `product-${uuidv4()}-${index + 1}.webp`;
        await sharp(image.buffer)
          .resize(1000, 1000)
          .webp({ quality: 90 })
          .toFile(`uploads/products/images/${fileName}`);
        images.push(fileName);
      }),
    );
    req.body.images = images;
  }
  next();
});

const uploadImageProduct = multer({
  storage,
  fileFilter: MulterFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
}).fields([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

module.exports = { uploadImageProduct, imageProcessor };
