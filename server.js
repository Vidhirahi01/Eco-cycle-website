import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import User from "./models/User.js";
import pickupRoutes from "./routes/pickupRoutes.js";
import adminRoutes from "./routes/admin.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/productRoutes.js"; // Make sure this file exists!
const app = express();

dotenv.config(); // Loads environment variables
import cors from "cors";
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use("/api/user", (req, res) => res.json(User)); // Adjust this if needed
app.use("/api/auth", authRoutes);
app.use("/api/pickup", pickupRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// DB and Server Initialization
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" Server startup failed due to DB connection error", err);
  });
