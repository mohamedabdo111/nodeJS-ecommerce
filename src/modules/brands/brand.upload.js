const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const multer = require("multer");
const sharp = require("sharp");
const ApiError = require("../../utils/apiError");
const MulterFileFilter = require("../../utils/multerFileFilter");
const storage = multer.memoryStorage();

const uploadImageBrand = multer({ storage, fileFilter: MulterFileFilter });

const imageProcessor = expressAsyncHandler(async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const fileName = `brand-${Date.now()}.webp`;
  await sharp(req.file.buffer)
    .webp({ quality: 90 })
    .toFile(`uploads/brands/${fileName}`);

  req.body.image = fileName;
  next();
});

module.exports = { uploadImageBrand, imageProcessor };
