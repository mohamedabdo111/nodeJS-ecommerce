const express = require("express");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const { createCashOrder, getSpecificOrder, getAllOrders, filterOrderForLoggedUser, updateOrderToPaid, updateOrderStatus } = require("./order.service");
const router = express.Router();
router.use(protectRoutes);
router.route("/").get(allowedTo("user", "admin") , filterOrderForLoggedUser, getAllOrders).post(createCashOrder)
router.route("/:id").get(getSpecificOrder).put(allowedTo("admin"), updateOrderToPaid)
router.route("/status/:id").put(allowedTo("admin"), updateOrderStatus)
module.exports = router;
