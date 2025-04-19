// Assuming you're extending the User model with Recycler-specific fields
import mongoose from "mongoose";
import User from "./User.js"; // Import the User model for inheritance

const recyclerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    default: 0, // The capacity for handling pickup requests
  },
});

const Recycler = mongoose.model("Recycler", recyclerSchema);
export default Recycler;
