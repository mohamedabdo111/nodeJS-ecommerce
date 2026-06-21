const mongoose = require("mongoose");

const schema = mongoose.Schema;
const model = mongoose.model;

const couponSchema = new schema(
  {
    name: {
      type: String,
      required: [true, "Coupon name is required"],
      unique: [true, "Coupon name must be unique"],
    },

    expireDate: {
      type: Date,
      required: [true, "Coupon expire date is required"],
    },

    discount: {
      type: Number,
      required: [true, "Coupon discount is required"],
    },
  },
  { timestamps: true },
);

const CouponModel = model("Coupon", couponSchema);
module.exports = CouponModel;
