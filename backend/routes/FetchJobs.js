const express = require('express');
const router = express.Router();
const {getAllJobs} = require('../Controller/GetJobs.js');
const { protect } = require('../middleware/auth.js');

// Route to fetch all jobs
router.get('/jobs',protect, (req, res) => {
    // Call getAllJobs function passing req and res
    getAllJobs(req, res);
});

module.exports = router;
