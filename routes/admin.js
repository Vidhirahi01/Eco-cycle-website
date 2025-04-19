import express from "express";
import {
  getAllUsers,
  getAllPickupRequests,
  getAllReports,
  updateUserRole,
} from "../controller/adminController.js"; 
import { verifyToken, isAdmin } from "../middleware/authmiddleware.js";
import { assignRecycler } from "../controller/pickupController.js";
import { reviewReport } from "../controller/reportController.js"; 

const router = express.Router();


router.get("/users", verifyToken, isAdmin, getAllUsers);

router.get("/pickup-requests", verifyToken, isAdmin, getAllPickupRequests);

router.put("/assign-recycler/:requestId/:recyclerId", verifyToken, isAdmin, assignRecycler);

router.get("/reports", verifyToken, isAdmin, getAllReports);

router.put("/review-report/:reportId", verifyToken, isAdmin, reviewReport);

router.put("/update-user-role/:id", verifyToken, isAdmin, updateUserRole); 
export default router;
