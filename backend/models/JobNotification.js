const mongoose = require('mongoose');

const jobNotificationSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true
    },
    recruiterId: {
        type: String,
        required: true
    },
    jobSeekerId: {
        type: String,
        required: true
    }
});

const JobNotification = mongoose.model('JobNotification', jobNotificationSchema);

module.exports = JobNotification;