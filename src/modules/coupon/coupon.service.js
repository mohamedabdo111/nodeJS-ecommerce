const CouponModel = require("./coupon.model");

const {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
} = require("../../services/handlerFactory");

exports.createCoupon = createOne(CouponModel);

exports.getAllCoupons = getAll(CouponModel);

exports.getSingleCoupon = getOne(CouponModel);

exports.updateCoupon = updateOne(CouponModel);

exports.deleteCoupon = deleteOne(CouponModel);
