const express = require("express");
const { addProductToCart, getLoggedUserCart, RemoveSpecificCartItem, clearCart, UpdateCartItemQuantity, applyCoupon } = require("./cart.service");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const router = express.Router();
router.use(protectRoutes, allowedTo("user"));
router.route("/").post(addProductToCart).get(getLoggedUserCart).delete(clearCart);

router.route("/:cartItemId").delete(RemoveSpecificCartItem).put(UpdateCartItemQuantity);

router.route("/applyCoupon").post(applyCoupon);

module.exports = router;