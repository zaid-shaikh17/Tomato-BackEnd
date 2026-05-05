import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const deliveryAuth = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user || user.role !== "delivery") {
      return res.json({ success: false, message: "Not authorized" });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid token" });
  }
};

export default deliveryAuth;