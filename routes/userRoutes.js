import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import {
  getMyProfile,
  updateProfile,
  deleteAccount,
} from "../controllers/userController.js";

const router = express.Router();

// @route GET /api/user/me
router.get("/me", verifyToken, getMyProfile);

// @route PUT /api/user/update
router.put("/update", verifyToken, updateProfile);

// @route DELETE /api/user/delete
router.delete("/delete", verifyToken, deleteAccount);

export default router;
