const express = require("express");
const { CreateCart, GetCartById } = require("./cart.service");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const router = express.Router();

router.use(protectRoutes, allowedTo("user", "admin"));
router.route("/").post(CreateCart);

router.route("/:id").get(GetCartById);

module.exports = router;
