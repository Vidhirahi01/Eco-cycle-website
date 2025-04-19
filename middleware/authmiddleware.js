import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password"); // ✅ fixed this line

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // sets user in req
    next();
  } catch (err) {
    console.error("verifyToken error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  return res.status(403).json({ message: "Admin access only" });
};

export const isRecycler = (req, res, next) => {
  if (req.user?.role === "recycler") return next();
  return res.status(403).json({ message: "Recycler access only" });
};
