import { connect } from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

// Use MONGO_URI from the environment
const mongooseUri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await connect(mongooseUri, {
      
    });
    console.log("Mongoose: MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default connectDB;
