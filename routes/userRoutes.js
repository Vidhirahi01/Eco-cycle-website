import express from 'express';
import {
  getMyProfile,
  updateProfile,
  deleteAccount,
} from '../controller/userController.js';
import { verifyToken } from '../middleware/authmiddleware.js';

const router = express.Router();

// Protected route
router.get("/me", verifyToken, getMyProfile);
router.put("/me", verifyToken, updateProfile);
router.delete("/me", verifyToken, deleteAccount);

export default router;
