const mongoose = require("mongoose");

const garmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true
  },
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  garments: [garmentSchema],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["RECEIVED", "PROCESSING", "READY", "DELIVERED", "CANCELLED"], // ✅ FIXED
    default: "RECEIVED"
  },

  deliveryDate: {
    type: Date,
    default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PENDING"
  },

  paymentMethod: {
    type: String,
    enum: ["CASH", "UPI"],
    default: "CASH"
  }
});

module.exports = mongoose.model("Order", orderSchema);