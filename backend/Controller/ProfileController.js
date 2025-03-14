const Profile = require('../models/ProfileJobseeker.js');

const saveUserProfile = async (req, res) => {
  const { name, email, resume, profilePhoto, institutions, skills } = req.body;
  const userId=req.user.id;
  try {
    // Create a new profile
    const profile = new Profile({
      name,
      email,
      userId,
      resume,
      profilePhoto,
      institutions,
      skills
    });

    // Save the new profile
    await profile.save();

    res.status(201).json({ message: 'Profile saved successfully', profile });
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { saveUserProfile };