const expressAsyncHandler = require("express-async-handler");
const CartModel = require("./cart.model");
const { getOne } = require("../../services/handlerFactory");

exports.CreateCart = expressAsyncHandler(async (req, res, next) => {
  const cart = await CartModel.create(req.body);

  res.status(201).json({ message: "Cart created successfully", data: cart });
});

exports.GetCartById = getOne(CartModel);
