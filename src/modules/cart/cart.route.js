const express = require("express");
const { addProductToCart, getLoggedUserCart, RemoveSpecificCartItem, clearCart, UpdateCartItemQuantity } = require("./cart.service");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const router = express.Router();
router.use(protectRoutes, allowedTo("user"));
router.route("/").post(addProductToCart).get(getLoggedUserCart).delete(clearCart);

router.route("/:cartItemId").delete(RemoveSpecificCartItem).put(UpdateCartItemQuantity);

module.exports = router;