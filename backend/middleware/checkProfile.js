const Profile = require("../models/ProfileJobseeker.js");
const checkProfileComplete = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const profile = await Profile.findOne({ userId });
    console.log("profilecheck",profile);
    if (
      !profile ||
      !profile.name ||
      !profile.email
    ) {
      return res
        .status(400)
        .json({
          message: "Please complete your profile before applying for jobs.",
        });
    }
    next();
  } catch (error) {
    console.error("Error checking profile completeness:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = checkProfileComplete;
