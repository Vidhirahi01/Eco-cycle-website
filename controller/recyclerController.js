import PickupRequest from "../models/pickup.js";
import User from "../models/User.js"; 

// Get all assigned pickup requests for the recycler
export const getAssignedPickupRequests = async (req, res) => {
  try {
    const recyclerId = req.user.id; // Get the recycler's ID from the authenticated user
    const requests = await PickupRequest.find({ recyclerId, status: "Assigned" }).populate("productId", "name description");
    
    if (!requests || requests.length === 0) {
      return res.status(404).json({ success: false, message: "No assigned pickup requests found" });
    }

    res.status(200).json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch assigned pickup requests" });
  }
};

// Update the status of a pickup request (Recycler updates when they start or complete a pickup)
export const updatePickupStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!["In Process", "Completed"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    // Find the request and check if it’s assigned to this recycler
    const request = await PickupRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Pickup request not found" });
    }

    if (request.recyclerId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "You are not assigned to this pickup request" });
    }

    // Update the pickup request status
    request.status = status;
    request.updatedAt = Date.now();
    await request.save();

    res.status(200).json({ success: true, message: "Pickup request status updated", request });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update pickup request status" });
  }
};
