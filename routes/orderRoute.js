import express from "express";
import { placeOrder, listOrders, updateOrderStatus, userOrders, getDeliveryOrders, markDelivered } from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import userAuth from "../middleware/userAuth.js";
import deliveryAuth from "../middleware/deliveryAuth.js";

const orderRouter = express.Router();

orderRouter.post("/place", placeOrder);
orderRouter.get("/list", adminAuth, listOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);
orderRouter.post("/userorders", userAuth, userOrders);
orderRouter.get("/delivery", deliveryAuth, getDeliveryOrders);
orderRouter.post("/deliver", deliveryAuth, markDelivered);

export default orderRouter;