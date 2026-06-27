const expressAsyncHandler = require("express-async-handler");
const CartModel = require("../cart/cart.model");
const ApiError = require("../../utils/apiError");
const OrderModel = require("./order.model");
const ProductModel = require("../product/product.model");
const { getAll } = require("../../services/handlerFactory");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
      status: status,
    },
    { new: true },
  );

  if (!order) {
    return next(new ApiError(404, "Order not found"));
  }

  res
    .status(200)
    .json({ message: "Order status updated successfully", data: order });
});

exports.CreatePaymentSession = expressAsyncHandler(async (req, res, next) => {
  const cart = await CartModel.findOne({ user: req.user._id });

  const lineItems = cart.cartItems.map((item) => {
    return {
      quantity: item.quantity,
      price_data: {
        currency: "egp",
        product_data: {
          name: item.product.title,
        },
        unit_amount: item.price * 100,
      },
    };
  });
  const createSession = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.BASE_URL}/checkout/success`,
    cancel_url: `${process.env.BASE_URL}/checkout/cancel`,
    // metadata: {
    //   userId: req.user._id,
    //   cartId: cart._id,
    // },
  });

  res.status(200).json({
    message: "Payment session created successfully",
    data: createSession.url,
  });
});

exports.webHookHandler = expressAsyncHandler(async (req, res, next) => {
  console.log("testtss");
  (express.raw({ type: "application/json" }),
    (request, response) => {
      let event = request.body;
      // Only verify the event if you have an endpoint secret defined.
      // Otherwise use the basic event deserialized with JSON.parse
      if (process.env.STRIPE_SIGNING_SECRET) {
        // Get the signature sent by Stripe
        const signature = request.headers["stripe-signature"];
        try {
          event = stripe.webhooks.constructEvent(
            request.body,
            signature,
            process.env.STRIPE_SIGNING_SECRET,
          );
        } catch (err) {
          console.log(
            `⚠️  Webhook signature verification failed.`,
            err.message,
          );
          return response.sendStatus(400);
        }
      }

      console.log("event", event);
    });
});
