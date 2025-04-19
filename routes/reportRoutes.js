import express from "express";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import { createReport, getReports, updateReportStatus } from "../controllers/ReportController.js";

const router = express.Router();

// User route to report a product
router.post("/report/:productId", verifyToken, createReport);

// Admin routes for report management
router.get("/reports", verifyToken, isAdmin, getReports); // Admin to view all reports
router.put("/report/:reportId/status", verifyToken, isAdmin, updateReportStatus); // Admin to update report status

export default router;
