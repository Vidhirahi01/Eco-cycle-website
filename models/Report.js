import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: {
    type: String,
    required: true,
    enum: ["Spam", "Inappropriate Content", "Fake", "Other"], // Possible reasons for reporting
  },
  description: {
    type: String,
    required: true, // Description of why the product is being reported
  },
  status: {
    type: String,
    default: "Pending", // Status could be Pending, Reviewed, or Dismissed
    enum: ["Pending", "Reviewed", "Dismissed"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", reportSchema);
export default Report;
