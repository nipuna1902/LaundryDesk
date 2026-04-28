const Order = require("../models/Order");

const priceList = {
  Shirt: 50,
  Pants: 80,
  Saree: 120,
  TShirt: 40
};

exports.createOrder = async (req, res) => {
  try {
    const { customerName, phone, garments } = req.body;
    if (!customerName || !phone || !garments || garments.length === 0) {
      return res.status(400).json({ msg: "Missing fields" });
    }

    let totalAmount = 0;

    garments.forEach(item => {
      const finalPrice = priceList[item.type] || item.price;
      item.price = finalPrice;
      totalAmount += item.quantity * finalPrice;
    });

    const order = new Order({
      orderId: "ORD" + Date.now(),
      customerName,
      phone,
      garments,
      totalAmount
    });

    await order.save();

    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getOrders = async (req, res) => {
  try {
    const { status, phone, customerName } = req.query;

    let filter = {};

    if (status) filter.status = status;
    if (phone) filter.phone = phone;
    if (customerName) {
      filter.customerName = { $regex: customerName, $options: "i" };
    }

    const orders = await Order.find(filter).sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validFlow = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"];

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    const currentIndex = validFlow.indexOf(order.status);
    const newIndex = validFlow.indexOf(status);
    if (newIndex !== currentIndex + 1) {
      return res.status(400).json({
        msg: `Invalid status transition from ${order.status} to ${status}`
      });
    }

    order.status = status;
    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.paymentStatus = status;
    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};