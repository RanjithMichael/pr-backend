import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Dynamic allowed origins using environment variable
// ALLOWED_ORIGINS=http://localhost:5173,https://passwordresetflo.netlify.app
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"]; // fallback for local dev

// ✅ CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    console.log("Request Origin:", origin); // debug log

    // allow requests with no origin (like Postman or mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies or auth headers
}));

// ✅ Handle preflight OPTIONS requests for all routes
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));

// Parse JSON
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// Auth routes
app.use("/api/auth", authRoutes);

export default app;
