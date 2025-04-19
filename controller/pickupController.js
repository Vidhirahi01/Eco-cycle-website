import PickupRequest from "../models/pickup.js";

export const createPickupRequest = async (req, res) => {
  try {
    const { productIds, location, pickupDate } = req.body; 

    if (!productIds || productIds.length === 0) {
      return res.status(400).json({ success: false, message: "At least one product is required" });
    }

    const existing = await PickupRequest.findOne({
      userId: req.user.id,
      productIds: { $in: productIds },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Pickup request already exists for one or more of these products",
      });
    }

    // Create the pickup request with multiple products
    const pickupRequest = await PickupRequest.create({
      userId: req.user.id,
      productIds,  // Multiple products in an array
      location,
      pickupDate,
    });

    res.status(201).json({ success: true, message: "Pickup request created", pickupRequest });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ success: false, error: "Failed to create pickup request" });
  }
};
export const getAllPickupRequests = async (req, res) => {
    try {
      const requests = await PickupRequest.find()
        .populate("userId", "name email")
        .populate("productIds", "title status");  // Populating multiple product IDs
  
      res.status(200).json({ success: true, requests });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch requests" });
    }
  };
  export const getMyPickupRequests = async (req, res) => {
    try {
      const requests = await PickupRequest.find({ userId: req.user.id })
        .populate("productIds", "title status");  // Populating multiple product IDs
  
      res.status(200).json({ success: true, requests });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch your requests" });
    }
  };
  export const updatePickupStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      const validStatus = ["Accepted", "Rejected", "Picked Up"];
      if (!validStatus.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid status" });
      }
  
      const request = await PickupRequest.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      ).populate("userId", "name").populate("productIds", "title");
  
      if (!request) return res.status(404).json({ success: false, message: "Request not found" });
  
      res.status(200).json({ success: true, message: "Status updated", request });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to update status" });
    }
  };
      
  export const deletePickupRequest = async (req, res) => {
    try {
      const { id } = req.params;
  
      const request = await PickupRequest.findOne({ _id: id, userId: req.user.id });
  
      if (!request) {
        return res.status(404).json({ success: false, message: "Pickup request not found" });
      }
  
      if (request.status !== "Pending") {
        return res.status(400).json({ success: false, message: "Cannot delete once processed" });
      }
  
      await PickupRequest.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Pickup request deleted" });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to delete pickup request" });
    }
  };
  export const getPickupRequestById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const request = await PickupRequest.findById(id)
        .populate("userId", "name email")
        .populate("productIds", "title status");
  
      if (!request) {
        return res.status(404).json({ success: false, message: "Pickup request not found" });
      }
  
      res.status(200).json({ success: true, request });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch request" });
    }
  };
  export const updatePickupDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const { pickupDate, location } = req.body;
  
      const request = await PickupRequest.findOne({ _id: id, userId: req.user.id });
  
      if (!request) {
        return res.status(404).json({ success: false, message: "Pickup request not found" });
      }
  
      if (request.status !== "Pending") {
        return res.status(400).json({ success: false, message: "Cannot update after processing" });
      }
  
      if (pickupDate) request.pickupDate = pickupDate;
      if (location) request.location = location;
  
      await request.save();
  
      res.status(200).json({ success: true, message: "Pickup details updated", request });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to update pickup" });
    }
  };
  export const filterPickupRequests = async (req, res) => {
    try {
      const { status, startDate, endDate } = req.query;
      const query = {};
  
      if (status) query.status = status;
      if (startDate && endDate) {
        query.requestedAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        };
      }
  
      const filtered = await PickupRequest.find(query)
        .populate("userId", "name email")
        .populate("productIds", "title status");
  
      res.status(200).json({ success: true, filtered });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to filter requests" });
    }
  };
  export const assignRecycler = async (req, res) => {
    try {
      const { id } = req.params; // pickup request id
      const { recyclerId } = req.body;
  
      const updated = await PickupRequest.findByIdAndUpdate(
        id,
        { recyclerId },
        { new: true }
      ).populate("recyclerId", "name email");
  
      if (!updated) {
        return res.status(404).json({ success: false, message: "Pickup request not found" });
      }
  
      res.status(200).json({ success: true, message: "Recycler assigned", updated });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to assign recycler" });
    }
  };