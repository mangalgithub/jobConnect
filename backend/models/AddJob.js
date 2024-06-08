const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  skillsets: {
    type: [String],
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  maxApplicants: {
    type: Number,
    required: true,
  },
  maxPositions: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = {Job};
