import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getMyProfile:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch profile",
    });
  }
};
export const updateProfile = async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        req.body,
        { new: true, runValidators: true }
      ).select("-password");
  
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to update profile",
      });
    }
  };
  export const deleteAccount = async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      res.status(200).json({
        success: true,
        message: "Account deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Failed to delete account",
      });
    }
  };
    