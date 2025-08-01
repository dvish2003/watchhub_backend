import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/watchhub', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }as any);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
