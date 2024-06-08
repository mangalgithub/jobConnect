const express=require('express')
const { addJob } = require('../Controller/JobController.js');
const {protect}=require('../middleware/auth.js');
const router=express.Router();
// Addjob.js
router.route('/jobs').post(protect,addJob);
module.exports = router;