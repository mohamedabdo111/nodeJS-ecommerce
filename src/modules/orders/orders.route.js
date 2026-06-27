const express = require("express");
const { protectRoutes, allowedTo } = require("../auth/auth.service");
const {
  createCashOrder,
  getSpecificOrder,
  getAllOrders,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderStatus,
  CreatePaymentSession,
} = require("./order.service");
const router = express.Router();
router.use(protectRoutes);
router
  .route("/")
  .get(allowedTo("user", "admin"), filterOrderForLoggedUser, getAllOrders)
  .post(createCashOrder);
router
  .route("/create-checkout-session")
  .post(protectRoutes, allowedTo("user"), CreatePaymentSession);
router
  .route("/:id")
  .get(getSpecificOrder)
  .put(allowedTo("admin"), updateOrderToPaid);
router.route("/status/:id").put(allowedTo("admin"), updateOrderStatus);
module.exports = router;
