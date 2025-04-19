import express from "express";
import { verifyToken, isRecycler } from "../middlewares/authMiddleware.js";
import { getAssignedPickupRequests, updatePickupStatus } from "../controllers/RecyclerController.js";

const router = express.Router();

// Get all pickup requests assigned to this recycler
router.get("/recycler/assigned-pickups", verifyToken, isRecycler, getAssignedPickupRequests);

// Update the status of a pickup request (start or complete)
router.put("/recycler/pickup/:requestId/status", verifyToken, isRecycler, updatePickupStatus);

export default router;
