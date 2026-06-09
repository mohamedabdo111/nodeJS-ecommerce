const expressAsyncHandler = require("express-async-handler");
const slugify = require("slugify");
const bcrypt = require("bcrypt");
const UserModel = require("../user/user.model");
exports.Signup = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModel.create({
    name,
    email,
    password,
    slug: slugify(name),
  });
  res.status(201).json({ user });
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
  res.status(200).json({ user });
});
