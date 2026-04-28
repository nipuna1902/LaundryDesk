const Order = require("../models/Order");

exports.getDashboard = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const statusData = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const formattedStatus = {};
    statusData.forEach(item => {
      formattedStatus[item._id] = item.count;
    });

    res.json({
      totalOrders,
      totalRevenue: revenueData[0]?.total || 0,
      statusBreakdown: formattedStatus
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};