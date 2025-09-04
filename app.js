import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Test route for debugging
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// ✅ auth routes
app.use("/api/auth", authRoutes);

export default app;

