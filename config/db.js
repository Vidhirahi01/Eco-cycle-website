import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongooseUri = process.env.MONGO_URI;

    if (!mongooseUri) {
      throw new Error("MONGO_URI not found in .env");
    }

    await mongoose.connect(mongooseUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(" MongoDB connected successfully");
    console.log("Connected to DB:", mongoose.connection.name);

  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
