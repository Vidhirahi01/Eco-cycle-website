// routes/userRoutes.js
import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getMyProfile,
  updateProfile,
  deleteAccount,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/me", verifyToken, getMyProfile);

router.put("/update", verifyToken, updateProfile);

router.delete("/delete", verifyToken, deleteAccount);

export default router;
