const User = require("./user.model");
const {
  createOne,
  getAll,
  updateOne,
  deleteOne,
  getOne,
} = require("../../services/handlerFactory");
const expressAsyncHandler = require("express-async-handler");
const ApiError = require("../../utils/apiError");
const slugify = require("slugify");
const bcrypt = require("bcrypt");
const saltRounds = 10;
exports.getAllUsers = getAll(User);

exports.addNewUser = createOne(User);

exports.updateUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { profileImg, name, email, role, phone, slug } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { profileImg, name, email, role, phone, slug: slugify(name) },
    { new: true },
  );

  if (!user) {
    return next(new ApiError(404, "user not found"));
  }

  res.status(200).json({ message: "user updated successfully", data: user });
});

exports.updateUserPassword = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { password } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { password: await bcrypt.hash(password, saltRounds) },
    { new: true },
  );

  if (!user) {
    return next(new ApiError(404, "user not found"));
  }

  res
    .status(200)
    .json({ message: "password updated successfully", data: user });
});
exports.getUser = getOne(User);

exports.deleteUser = deleteOne(User);
