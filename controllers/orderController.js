import orderModel from "../models/orderModel.js";

// Place order — called from frontend
export const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
      payment: req.body.paymentMethod === "cod" ? false : true,
    });
    await newOrder.save();
    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// List all orders — admin only
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Update order status — admin only
export const updateOrderStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// User's own orders
export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get orders for delivery partner
export const getDeliveryOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ status: "Out for Delivery" }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Mark order as delivered
export const markDelivered = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, { status: "Delivered" });
    res.json({ success: true, message: "Order delivered" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};