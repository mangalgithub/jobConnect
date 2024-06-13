const { Job } = require('../models/AddJob.js');
const Application = require('../models/Application.js');

// Controller function to fetch jobs that the user has not applied to
const getAllJobs = async (req, res) => {
    const user = req.user;
    try {
        // Find all applications by the user
        const applications = await Application.find({ userId: user._id });
        // Extract jobIds from the applications
        const appliedJobIds = applications.map(application => application.jobId);
        // Find all jobs that the user has not applied to
        const jobs = await Job.find({ _id: { $nin: appliedJobIds } });
        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllJobs
};
