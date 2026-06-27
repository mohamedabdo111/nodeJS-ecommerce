const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;
const model = mongoose.model;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

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
        },
        price: {
          type: Number,
          required: true,
        },

      },
    ],

    totalPrice: Number,
    totalPriceAfterDiscount: Number,

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "card"],
      default: "cash",
    },

    isPaid: Boolean,
    paidAt: Date,
  },
  { timestamps: true },
);


orderSchema.pre("find", function(next) {
  this.populate({
    path: "user",
    select: "name profileImg",
  });
  this.populate({
    path: "cartItems.product",
    select: "title price imageCover",
  });
  next();
});
const OrderModel = model("Order", orderSchema);
module.exports = OrderModel;
