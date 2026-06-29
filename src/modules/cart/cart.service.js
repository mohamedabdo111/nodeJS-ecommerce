const expressAsyncHandler = require("express-async-handler");
const CartModel = require("./cart.model");
const ProductModel = require("../product/product.model");
const CouponModel = require("../coupon/coupon.model");
const ApiError = require("../../utils/apiError");

exports.addProductToCart = expressAsyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.body.productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const cartItem = {
    product: product._id,
    quantity: 1,
    price: product.price,
    priceAfterDiscount: product.price,
  };

  const cart = await CartModel.findOne({ user: req.user._id });
  if (!cart) {
    const newCart = await CartModel.create({
      user: req.user._id,
      cartItems: [cartItem],
    });

    return res
      .status(201)
      .json({ message: "Cart created successfully", data: newCart });
  } else {
    // if cart item already exists, update the quantity if the same product
    // if not , add the new product to the cart

    const cartItemIndex = cart.cartItems.findIndex(
      (item) => item.product._id.toString() === product._id.toString(),
    );
    if (cartItemIndex > -1) {
      if (cart.cartItems[cartItemIndex].quantity < product.quantity) {
        cart.cartItems[cartItemIndex].quantity += 1;
        await cart.save();
      } else {
        return res
          .status(400)
          .json({ message: "Product quantity is not available" });
      }
    } else {
      cart.cartItems.push(cartItem);

      await cart.save();
    }
  }

  // calc total price
  const totalPrice = cart.cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  cart.totalPrice = totalPrice;
  cart.totalPriceAfterDiscount = totalPrice;
  await cart.save();

  res.status(201).json({ message: "Cart created successfully", data: cart });
});

exports.getLoggedUserCart = expressAsyncHandler(async (req, res) => {
  const cart = await CartModel.findOne({ user: req.user._id });
  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json({ message: "Cart fetched successfully", data: cart });
});

exports.RemoveSpecificCartItem = expressAsyncHandler(async (req, res) => {
  const cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      $pull: {
        cartItems: {
          _id: req.params.cartItemId,
        },
      },
    },
    { new: true },
  );

  console.log(cart, "cart");

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res
    .status(200)
    .json({ message: "Cart item removed successfully", data: cart });
});

exports.clearCart = expressAsyncHandler(async (req, res) => {
  const cart = await CartModel.findOneAndUpdate(
    { user: req.user._id },
    {
      $set: {
        cartItems: [],
      },
    },
    { new: true },
  );

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.status(200).json({ message: "Cart cleared successfully", data: cart });
});

exports.UpdateCartItemQuantity = expressAsyncHandler(async (req, res) => {
  const { cartItemId } = req.params;
  const { quantity } = req.body;

  const cart = await CartModel.findOneAndUpdate(
    {
      user: req.user._id,
      "cartItems._id": cartItemId,
    },
    {
      $set: {
        "cartItems.$.quantity": quantity,
      },
    },
    { new: true },
  );

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res
    .status(200)
    .json({ message: "Cart item quantity updated successfully", data: cart });
});

exports.applyCoupon = expressAsyncHandler(async (req, res, next) => {
  const couponData = await CouponModel.findOne({
    name: req.body.coupon,
    expireDate: { $gt: Date.now() },
  });

  if (!couponData) {
    return next(new ApiError(404, "Coupon not found"));
  }

  const cart = await CartModel.findOne({ user: req.user._id });
  if (!cart) {
    return next(new ApiError(404, "Cart not found"));
  }

  cart.totalPriceAfterDiscount =
    cart.totalPrice - (cart.totalPrice * couponData.discount) / 100;
  await cart.save();

  res.status(200).json({ message: "Coupon applied successfully", data: cart });
});
