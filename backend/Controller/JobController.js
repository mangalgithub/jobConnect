const asyncHandler = require("express-async-handler");
const { Job } = require("../models/AddJob.js");
const User = require("../models/User.js");
const JobNotification = require("../models/JobNotification.js");
// console.log("User detail ",User);
const addJob = asyncHandler(async (req, res) => {
  const {
    title,
    skillsets,
    jobType,
    duration,
    salary,
    deadline,
    maxApplicants,
    maxPositions,
    userId,
  } = req.body;

  if (!title || !skillsets || !jobType || !salary || !deadline) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  try {
    const createdJob = await Job.create({
      title,
      skillsets,
      jobType,
      duration,
      salary,
      deadline,
      maxApplicants,
      maxPositions,
      userId: req.user._id,
    });
    const jobSeekers = await User.find({type:'jobseeker'}); // Retrieve all job seekers from the users model
    const notifications = jobSeekers.map(jobSeeker => ({
      jobId: createdJob._id,
      recruiterId: req.user._id,
      jobSeekerId: jobSeeker._id, 
      isRead: false,
    }));
    await JobNotification.insertMany(notifications);

    res.status(201).json(createdJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  addJob,
};