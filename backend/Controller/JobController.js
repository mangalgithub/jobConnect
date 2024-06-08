const asyncHandler = require('express-async-handler');
const {Job} = require('../models/AddJob.js'); // Ensure this path is correct
const { user } = require('../models/User.js');

const addJob = asyncHandler(async (req, res) => {
  const { title, skillsets, jobType, duration, salary, deadline, maxApplicants, maxPositions } = req.body;

  if (!title || !skillsets || !jobType || !salary || !deadline) {
    res.status(400).json({ message: 'All fields are required' });
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

    res.status(201).json(createdJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  addJob
};
