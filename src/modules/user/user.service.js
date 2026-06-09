const User = require("./user.model");
const {
  createOne,
  getAll,
  updateOne,
  deleteOne,
  getOne,
} = require("../../services/handlerFactory");

exports.getAllUsers = getAll(User);

exports.addNewUser = createOne(User);

exports.updateUser = updateOne(User);

exports.getUser = getOne(User);

exports.deleteUser = deleteOne(User);
