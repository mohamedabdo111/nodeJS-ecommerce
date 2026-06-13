const expressAsyncHandler = require("express-async-handler");
const slugify = require("slugify");
const bcrypt = require("bcrypt");
const UserModel = require("../user/user.model");
var jwt = require("jsonwebtoken");
const ApiError = require("../../utils/apiError");
const crypto = require("crypto");
const SendEmail = require("../../utils/sendEmail");

exports.Signup = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.create({
    name,
    email,
    password,
    slug: slugify(name),
  });

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  res.status(201).json({ user, token });
});

exports.Signin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  res.status(200).json({ user, token });
});

exports.protectRoutes = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new ApiError(401, "Unauthorized, you are not logged in"));
  }

  token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const user = await UserModel.findById(decoded.id);
  if (!user) {
    return next(new ApiError(401, "Unauthorized, user not found"));
  }

  req.user = user;
  next();
});

exports.allowedTo = (...roles) =>
  expressAsyncHandler(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(403, "You are not authorized to access this resource"),
      );
    }
    next();
  });

exports.forgetPassword = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new ApiError(404, "Email not found"));
  }

  const resetCode = crypto.randomInt(1000, 10000).toString();
  const resetCodeHash = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex")
    .toString();

  const resetCodeExpiredTime = new Date(Date.now() + 10 * 60 * 1000);
  const resetCodeIsVerified = false;

  user.resetCode = resetCodeHash;
  user.resetCodeExpiredTime = resetCodeExpiredTime;
  user.resetCodeIsVerified = resetCodeIsVerified;
  await user.save();

  await SendEmail(
    email,
    "Reset Password Code",
    `Your reset password code is ${resetCode}`,
  );

  res.status(200).json({ message: "Code sent to email" });
});

exports.verifyResetCode = expressAsyncHandler(async (req, res, next) => {
  const { resetCode } = req.body;

  const resetCodeHash = crypto
    .createHash("sha256")
    .update(resetCode)
    .digest("hex")
    .toString();
  const user = await UserModel.findOne({
    resetCode: resetCodeHash,
    resetCodeExpiredTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError(404, "Reset code is incorrect"));
  }

  user.resetCodeIsVerified = true;
  await user.save();

  res.status(200).json({ message: "Reset code is correct" });
});

exports.resetPassword = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user?.resetCodeIsVerified) {
    return next(new ApiError(400, "Reset code is not verified"));
  }

  console.log(await bcrypt.hash(password, 10), "password");

  user.password = password;
  user.resetCode = null;
  user.resetCodeExpiredTime = null;
  user.resetCodeIsVerified = false;
  await user.save();

  token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(200).json({ message: "Password reset successfully", token });
});
