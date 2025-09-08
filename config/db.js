import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI); 
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("Error connecting MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;


