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
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
exports.getAllUsers = getAll(User);

exports.addNewUser = createOne(User);

exports.updateUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { profileImg, name, email, role, phone, slug } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { profileImg, name, email, role, phone, slug },
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


exports.getLoggedUser = (req , res , next) => {
  req.params.id = req.user._id;
  next();
}

exports.updateLoggedUserPassword = expressAsyncHandler(async (req , res , next) => {

  const { password }  = req.body;

  const user = await User.findByIdAndUpdate(req.user._id , password , { new: true });

  if(!user) {
    return next(new ApiError(404, "user not found"));
  }

  const token = jwt.sign({id: user._id} , process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN });

  res.status(200).json({ message: "password updated successfully", data: user, token });
})


// update logged user data without password

exports.updateLoggedUserData = expressAsyncHandler( async (req , res , next) => {

  const {name , email , phone , profileImg} = req.body;

  const slug = slugify(name);

  const user = await User.findByIdAndUpdate(req.user._id , { name , email , phone , profileImg , slug } , { new: true });

  if(!user) {
    return next(new ApiError(404, "user not found"));
  }

  res.status(200).json({ message: "user updated successfully", data: user });
})