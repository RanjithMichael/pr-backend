import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Allowed origins for dev + prod
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "https://passwordresetflo.netlify.app/" 
];

// ✅ CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies or auth headers
}));

// Parse JSON body
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});

// Auth routes
app.use("/api/auth", authRoutes);

export default app;
