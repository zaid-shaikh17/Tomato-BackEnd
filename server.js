import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoutes.js";
import orderRouter from "./routes/orderRoute.js";

// App configuration
const app = express();
const PORT = process.env.PORT || 4000;

// Core middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://food-orders-web.netlify.app",
      "https://tomato-admin-sand.vercel.app",
      "https://tomato-delivery-pink.vercel.app"
    ],
    credentials: true,
  }),
);
app.use(
  "/images",
  express.static("uploads", {
    maxAge: "7d", // Cache images for 7 days
  }),
); // Serve images from the 'images' directory

// Connect to MongoDB once on startup
connectDB();

// API routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/order", orderRouter);

// Health check route
app.get("/", (_req, res) => {
  res.json({ message: "Tomato API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
