const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    cartItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "cartItems.product",
    select: "title price",
  });
  next();
});

const CartModel = model("Cart", cartSchema);
module.exports = CartModel;
