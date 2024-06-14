const express = require('express');
const router = express.Router();
const SendEmail = require('../Controller/SendEmail.js');

router.post('/send-email', async (req, res) => {
    const { userEmail, jobTitle, jobSalary, jobDuration } = req.body;

    const result = await SendEmail({ userEmail, jobTitle, jobSalary, jobDuration });

    if (result.success) {
        res.status(200).send('Email sent successfully');
    } else {
        res.status(500).send('Error sending email: ' + result.error);
    }
});

module.exports = router;