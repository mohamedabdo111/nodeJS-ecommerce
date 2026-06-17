const express = require("express");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const { AddProductToWishlist, RemoveProductFromWishlist, GetWishlistForLoggedUser } = require("./wishlist.service");
const router = express.Router();


router.route("/").post(protectRoutes, allowedTo("user"), AddProductToWishlist).get(protectRoutes, allowedTo("user"), GetWishlistForLoggedUser);
router.route("/:productId").delete(protectRoutes, allowedTo("user"), RemoveProductFromWishlist);

module.exports = router;