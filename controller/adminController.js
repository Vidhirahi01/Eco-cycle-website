import User from "../models/User.js";
import PickupRequest from "../models/pickup.js";

// Get all users for admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch users" });
  }
};

// Get all pickup requests (admin view)
export const getAllPickupRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find()
      .populate("userId", "name email")
      .populate("productIds", "title status");
    res.status(200).json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch requests" });
  }
};

// Update a user's role (admin-only functionality)
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role || !["user", "admin", "recycler"].includes(role)) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update role" });
  }
};
export const getAllReports = async (req, res) => {
    try {
      const reports = await Report.find()
        .populate("userId", "name email")
        .populate("productId", "title status");
  
      res.status(200).json({ success: true, reports });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch reports" });
    }
  };
  
  export const updateReportStatus = async (req, res) => {
    try {
      const { reportId } = req.params;
      const { status } = req.body;
  
      if (!["Pending", "Reviewed", "Resolved"].includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status" });
      }
  
      const report = await Report.findByIdAndUpdate(
        reportId,
        { status },
        { new: true }
      )
        .populate("userId", "name email")
        .populate("productId", "title");
  
      if (!report) {
        return res.status(404).json({ success: false, message: "Report not found" });
      }
  
      res.status(200).json({ success: true, message: "Report updated", report });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to update report" });
    }
  };
