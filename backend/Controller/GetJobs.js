const {Job} = require('../models/AddJob.js');

// Controller function to fetch all jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    getAllJobs
};
