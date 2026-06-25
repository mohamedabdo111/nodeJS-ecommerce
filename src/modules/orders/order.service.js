const expressAsyncHandler = require("express-async-handler");
const CartModel = require("../cart/cart.model");
const ApiError = require("../../utils/apiError");
const OrderModel = require("./order.model");
const ProductModel = require("../product/product.model");
const { getAll } = require("../../services/handlerFactory");

exports.createCashOrder = expressAsyncHandler(async (req, res, next) => {
  // 1-get cart from user
  const cart = await CartModel.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError(404, "No cart found for this user"));
  }

  //   2- create order with items and price

  const order = await OrderModel.create({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalPrice: cart.totalPrice,
    totalPriceAfterDiscount: cart.totalPriceAfterDiscount,
    paymentMethod: "cash",
    isPaid: false,
    paidAt: null,
    status: "pending",
  });

  if (order) {
    const bulkOperations = cart.cartItems.map((item) => ({
      updateOne: {
        filter: {
          _id: item.product,
        },
        update: {
          $inc: {
            quantity: -item.quantity,
            sold: +item.quantity,
          },
        },
      },
    }));

    // 3- decrease product quantity from stock
    await ProductModel.bulkWrite(bulkOperations);
  }

  //   clear cart for this user
  await CartModel.findByIdAndDelete(cart._id);

  res.status(201).json({ message: "Order created successfully", data: order });
});

exports.getSpecificOrder = expressAsyncHandler(async (req, res, next) => {
  console.log(req.user.role);
  const order = await OrderModel.findById(req.params.id);

  if (!order) {
    return next(new ApiError(404, "Order not found"));
  }

  if (req.user.role !== "admin" && order.user !== req.user._id) {
    return next(
      new ApiError(403, "You are not authorized to access this order"),
    );
  }

  res.status(200).json({ message: "Order fetched successfully", data: order });
});

exports.filterOrderForLoggedUser = expressAsyncHandler(
  async (req, res, next) => {
    if (req.user.role !== "admin") {
      req.filterObj = { user: req.user._id };
    }
    next();
  },
);
exports.getAllOrders = getAll(OrderModel, "order");

exports.updateOrderToPaid = expressAsyncHandler(async (req, res, next) => {
  const { isPaid } = req.body;
  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    {
      isPaid: isPaid,
      paidAt: isPaid ? Date.now() : null,
    },
    { new: true },
  );

  if (!order) {
    return next(new ApiError(404, "Order not found"));
  }

  res.status(200).json({ message: "Order updated successfully", data: order });
});

exports.updateOrderStatus = expressAsyncHandler(async (req, res, next) => {
  const { status } = req.body;
  console.log("status", status);
  const order = await OrderModel.findByIdAndUpdate(
    req.params.id,
    {
      status : status,
    },
    { new: true },
  );

  if (!order) {
    return next(new ApiError(404, "Order not found"));
  }

  res.status(200).json({ message: "Order status updated successfully", data: order });
});
