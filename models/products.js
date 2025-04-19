import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  condition: String,
  type: String,
  status: { type: String, default: "Available" },
  location: String,
  image: {
    data: Buffer,
    contentType: String
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
