import mongoose from "mongoose";

const pickupRequestSchema = new mongoose.Schema({
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
  recyclerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: false, 
  },
  status: {
    type: String,
    enum: ["Pending", "Assigned", "In Process", "Completed"],
    default: "Pending",
  },
  location: {
    type: String,
    required: true,
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PickupRequest = mongoose.model("PickupRequest", pickupRequestSchema);
export default PickupRequest;
