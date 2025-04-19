import express from "express";
import {
  createPickupRequest,
  getAllPickupRequests,
  getMyPickupRequests,
  getPickupRequestById,
  updatePickupStatus,
  deletePickupRequest,
  updatePickupDetails,
  filterPickupRequests,
  assignRecycler, 
} from "../controller/pickupController.js";


import { verifyToken, isAdmin, isRecycler } from "../middleware/authmiddleware.js";

const router = express.Router();

// User Routes
router.post("/", verifyToken, createPickupRequest);                       
router.get("/my", verifyToken, getMyPickupRequests);                      
router.get("/:id", verifyToken, getPickupRequestById);                    
router.put("/:id", verifyToken, updatePickupDetails);                     
router.delete("/:id", verifyToken, deletePickupRequest);                  

// Admin & Recycler Routes
router.get("/", verifyToken, isAdmin, getAllPickupRequests);            
router.get("/:id", verifyToken, getPickupRequestById);
router.get("/filter/data", verifyToken, isAdmin, filterPickupRequests);
router.put("/:id/status", verifyToken, isAdmin, updatePickupStatus);    
router.put("/:id/assign", verifyToken, isAdmin, assignRecycler);       

export default router;
