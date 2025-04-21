import { Router } from "express";
const router = Router();
import { signup, login } from "../controller/authController.js";
import { verifyToken } from "../middleware/authmiddleware.js";
router.post("/signup", signup);
router.post("/login", login);
router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "You are authenticated!" });
});

export default router;  // Default export
