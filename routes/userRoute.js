import express from "express";
import { registerUser, loginUser, createDeliveryPartner } from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/create-delivery", adminAuth, createDeliveryPartner);

export default userRouter;