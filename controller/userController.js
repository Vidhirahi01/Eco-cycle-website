import User from "../models/User.js";

export const getMyProfile = async (req, res) => {
  try {
    // req.user should already contain the full user object from the middleware
    // Just ensure we don't send the password field back
    const user = await User.findById(req.user._id).select("-password");

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
      message: "Failed to fetch profile",
      error: error.message, // Include more specific error information
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, password } = req.body;
    const updateData = {};

    // Only update fields that were provided
    if (name) updateData.name = name;
    
    // Handle password separately since it needs to be hashed
    if (password) {
      // The password will be hashed by the pre-save hook in the User model
      // But for a direct update, we need a different approach
      
      // Find the user first
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      
      // Set the new password and save to trigger the pre-save hook
      user.password = password;
      await user.save();
      
      // Then update the rest of the fields if needed
      if (name) {
        await User.findByIdAndUpdate(
          req.user._id,
          { name },
          { new: true, runValidators: true }
        );
      }
      
      // Fetch the updated user
      const updatedUser = await User.findById(req.user._id).select("-password");
      
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
    }
    
    // If no password was provided, just update the other fields
    if (Object.keys(updateData).length > 0) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        updateData,
        { new: true, runValidators: true }
      ).select("-password");
      
      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
    }
    
    // No update data was provided
    return res.status(400).json({
      success: false,
      message: "No update data provided",
    });
    
  } catch (error) {
    console.error("Error in updateProfile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteAccount:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete account",
      error: error.message,
    });
  }
};