const express = require("express");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const router = express.Router();
const {
  createCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
} = require("./coupon.service");
router.use(protectRoutes, allowedTo("user", "admin"));

router.route("/").post(createCoupon).get(getAllCoupons);
router
  .route("/:id")
  .get(getSingleCoupon)
  .put(updateCoupon)
  .delete(deleteCoupon);

module.exports = router;
