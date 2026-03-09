import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoutes.js";

// App configuration
const app = express();
const PORT = process.env.PORT || 4000;

// Core middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://food-orders-web.netlify.app"],
  credentials: true,
  allowedOrgins: ["http://localhost:5173", "https://food-orders-web.netlify.app"],
}));

// Connect to MongoDB once on startup
connectDB();

// API routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);

// Health check route
app.get("/", (_req, res) => {
  res.json({ message: "Tomato API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
