const express = require("express");
const router = express.Router();

const { createOrder, getOrders, updateStatus, updatePayment } = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrders);
router.patch("/:id/status",updateStatus);
router.patch("/:id/payment", updatePayment);

module.exports = router;