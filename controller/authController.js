import User from "../models/User.js";
import jwt from "jsonwebtoken";
const { sign } = jwt;

const JWT_SECRET = process.env.JWT_SECRET; // Store this in .env ideally

// Signup
export async function signup(req, res) {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save(); 
    console.log(' User saved:', newUser);

    res.status(201).json({ message: 'User registered successfully', user: newUser });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Signup failed, please try again." });
  }
}


// Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, role: user.role, userId: user._id });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed, please try again." });
  }
}
