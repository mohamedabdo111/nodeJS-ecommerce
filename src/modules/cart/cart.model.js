const mongoose = require("mongoose");
const schema = mongoose.Schema;
const model = mongoose.model;

const cartSchema = new schema({
  cartItems: [
    {
      product: {
        type: schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
      },

      quantity: {
        type: Number,
        required: [true, "Quantity is required"],
      },

      price: {
        type: Number,
        required: [true, "Price is required"],
      },

      color: {
        type: String,
        required: [true, "Color is required"],
      },
    },
  ],

  totalPrice: Number,
  totalPriceAfterDiscount: Number,

  user: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
});

const CartModel = model("Cart", cartSchema);

module.exports = CartModel;
