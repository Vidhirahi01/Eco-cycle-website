import Report from "../models/Report.js";
import Product from "../models/products.js"; 

// Create a report for a specific product
export const createReport = async (req, res) => {
  try {
    const { productId } = req.params;
    const { reason, description } = req.body;
    const userId = req.user.id; // Logged-in user who is reporting the product

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Create a new report
    const report = new Report({
      productId,
      userId,
      reason,
      description,
    });

    await report.save();

    res.status(201).json({ success: true, message: "Report submitted successfully", report });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create report" });
  }
};

// Get all reports (for Admin review)
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("productId", "name description") // Populate product details
      .populate("userId", "name email"); // Populate user details

    res.status(200).json({ success: true, reports });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch reports" });
  }
};

// Update the status of a report (for Admin to mark as Reviewed or Dismissed)
export const updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;

    // Check for valid status value
    if (!["Reviewed", "Dismissed"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value" });
    }

    // Update the report status
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    report.status = status;
    report.updatedAt = Date.now();
    await report.save();

    res.status(200).json({ success: true, message: "Report status updated", report });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update report status" });
  }
};

// controller/reportController.js
export const reviewReport = async (req, res) => {
  try {
    // Placeholder logic
    const reportId = req.params.reportId;
    res.status(200).json({ message: `Report ${reportId} reviewed.` });
  } catch (err) {
    res.status(500).json({ message: "Failed to review report", error: err.message });
  }
};

