const express = require('express');
const router = express.Router();
const {getAllJobs} = require('../Controller/GetJobs.js');

// Route to fetch all jobs
router.get('/jobs', (req, res) => {
    // Call getAllJobs function passing req and res
    getAllJobs(req, res);
});

module.exports = router;
