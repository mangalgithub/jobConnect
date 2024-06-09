const express=require('express');
const mongoose=require('mongoose');
const jwtAuth=require('../lib/jwtAuth');
const {protect}=require('../middleware/auth');
const JobApplicant=require('../models/JobApplicant');
const Recruiter=require('../models/Recruiter');
const Rating=require('../models/Rating');
const Application=require('../models/Application');
const Job=require('../models/Job');
const User=require('../models/User');
const Profile=require('../models/ProfileJobseeker');
const router=express.Router();

//Need to add jwtAuth middleware in /user route***

router.put("/profile_update",protect, async(req, res) => {
  const user = req.user;
  // console.log(user);
  const data = req.body;
  console.log("data ",data);
  // console.log(user);
  if (user.type == "recruiter") {
    // User.findOne({ userId: user._id })
      User.findById(user._id)
      .then((recruiter) => {
        if (recruiter == null) {
          res.status(404).json({
            message: "User does not exist",
          });
          return;
        }
        if (data.name) {
          recruiter.name = data.name;
        }
        if (data.contactNumber) {
          recruiter.contactNumber = data.contactNumber;
        }
        if (data.bio) {
          recruiter.bio = data.bio;
        }
        recruiter
          .save()
          .then(() => {
            res.json({
              message: "User information updated successfully",
            });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    JobApplicant.findOne({userId:user._id})
      .then((jobApplicant) => {
        if (jobApplicant == null) {
          res.status(404).json({
            message: "User does not exist",
          });
          return;
        }
        if (data.name) {
          jobApplicant.name = data.name;
        }
        if (data.education) {
            const formattedEducation = data.education.map((institution) => ({
              institutionName: institution.name.trim(), // Use institutionName and trim whitespace
              startYear: institution.startYear,
              endYear: institution.endYear,
            }));
            jobApplicant.education = formattedEducation;
        }
        if (data.skills) {
          jobApplicant.skills = data.skills;
        }
        if (data.resume) {
          jobApplicant.resume = data.resume;
        }
        if (data.profilePhoto) {
          jobApplicant.profile = data.profile;
        }
        // console.log(jobApplicant);
        jobApplicant
          .save()
          .then(() => {
            res.json({
              message: "User information updated successfully",
            });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

// to add or update a rating [todo:testing]
router.put("/rating", (req, res) => {
//   const user = req.user;
    const user = {
        _id: "665c003b4db04a48ac2532c2",
        type: "jobseeker",
        }
  const data = req.body;
  if (user.type === "recruiter") {
    // can rate applicant
    Rating.findOne({
      senderId: user._id,
      receiverId: data.applicantId,
      category: "applicant",
    })
      .then((rating) => {
        if (rating === null) {
          // console.log("new rating");
          Application.countDocuments({
            userId: data.applicantId,
            recruiterId: user._id,
            status: {
              $in: ["accepted", "finished"],
            },
          })
            .then((acceptedApplicant) => {
              if (acceptedApplicant > 0) {
                // add a new rating

                rating = new Rating({
                  category: "applicant",
                  receiverId: data.applicantId,
                  senderId: user._id,
                  rating: data.rating,
                });

                rating
                  .save()
                  .then(() => {
                    // get the average of ratings
                    Rating.aggregate([
                      {
                        $match: {
                          receiverId: mongoose.Types.ObjectId(data.applicantId),
                          category: "applicant",
                        },
                      },
                      {
                        $group: {
                          _id: {},
                          average: { $avg: "$rating" },
                        },
                      },
                    ])
                      .then((result) => {
                        // update the user's rating
                        if (result === null) {
                          res.status(400).json({
                            message: "Error while calculating rating",
                          });
                          return;
                        }
                        const avg = result[0].average;

                        JobApplicant.findOneAndUpdate(
                          {
                            userId: data.applicantId,
                          },
                          {
                            $set: {
                              rating: avg,
                            },
                          }
                        )
                          .then((applicant) => {
                            if (applicant === null) {
                              res.status(400).json({
                                message:
                                  "Error while updating applicant's average rating",
                              });
                              return;
                            }
                            res.json({
                              message: "Rating added successfully",
                            });
                          })
                          .catch((err) => {
                            res.status(400).json(err);
                          });
                      })
                      .catch((err) => {
                        res.status(400).json(err);
                      });
                  })
                  .catch((err) => {
                    res.status(400).json(err);
                  });
              } else {
                // you cannot rate
                res.status(400).json({
                  message:
                    "Applicant didn't worked under you. Hence you cannot give a rating.",
                });
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          rating.rating = data.rating;
          rating
            .save()
            .then(() => {
              // get the average of ratings
              Rating.aggregate([
                {
                  $match: {
                    receiverId: mongoose.Types.ObjectId(data.applicantId),
                    category: "applicant",
                  },
                },
                {
                  $group: {
                    _id: {},
                    average: { $avg: "$rating" },
                  },
                },
              ])
                .then((result) => {
                  // update the user's rating
                  if (result === null) {
                    res.status(400).json({
                      message: "Error while calculating rating",
                    });
                    return;
                  }
                  const avg = result[0].average;
                  JobApplicant.findOneAndUpdate(
                    {
                      userId: data.applicantId,
                    },
                    {
                      $set: {
                        rating: avg,
                      },
                    }
                  )
                    .then((applicant) => {
                      if (applicant === null) {
                        res.status(400).json({
                          message:
                            "Error while updating applicant's average rating",
                        });
                        return;
                      }
                      res.json({
                        message: "Rating updated successfully",
                      });
                    })
                    .catch((err) => {
                      res.status(400).json(err);
                    });
                })
                .catch((err) => {
                  res.status(400).json(err);
                });
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } else {
    // applicant can rate job
    Rating.findOne({
      senderId: user._id,
      receiverId: data.jobId,
      category: "job",
    })
      .then((rating) => {
        // console.log(user._id);
        // console.log(data.jobId);
        // console.log(rating);
        if (rating === null) {
          // console.log(rating);
          Application.countDocuments({
            userId: user._id,
            jobId: data.jobId,
            status: {
              $in: ["accepted", "finished"],
            },
          })
            .then((acceptedApplicant) => {
              if (acceptedApplicant > 0) {
                // add a new rating

                rating = new Rating({
                  category: "job",
                  receiverId: data.jobId,
                  senderId: user._id,
                  rating: data.rating,
                });

                rating
                  .save()
                  .then(() => {
                    // get the average of ratings
                    Rating.aggregate([
                      {
                        $match: {
                          receiverId: mongoose.Types.ObjectId(data.jobId),
                          category: "job",
                        },
                      },
                      {
                        $group: {
                          _id: {},
                          average: { $avg: "$rating" },
                        },
                      },
                    ])
                      .then((result) => {
                        if (result === null) {
                          res.status(400).json({
                            message: "Error while calculating rating",
                          });
                          return;
                        }
                        const avg = result[0].average;
                        Job.findOneAndUpdate(
                          {
                            _id: data.jobId,
                          },
                          {
                            $set: {
                              rating: avg,
                            },
                          }
                        )
                          .then((foundJob) => {
                            if (foundJob === null) {
                              res.status(400).json({
                                message:
                                  "Error while updating job's average rating",
                              });
                              return;
                            }
                            res.json({
                              message: "Rating added successfully",
                            });
                          })
                          .catch((err) => {
                            res.status(400).json(err);
                          });
                      })
                      .catch((err) => {
                        res.status(400).json(err);
                      });
                  })
                  .catch((err) => {
                    res.status(400).json(err);
                  });
              } else {
                // you cannot rate
                res.status(400).json({
                  message:
                    "You haven't worked for this job. Hence you cannot give a rating.",
                });
              }
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        } else {
          // update the rating
          rating.rating = data.rating;
          rating
            .save()
            .then(() => {
              // get the average of ratings
              Rating.aggregate([
                {
                  $match: {
                    receiverId: mongoose.Types.ObjectId(data.jobId),
                    category: "job",
                  },
                },
                {
                  $group: {
                    _id: {},
                    average: { $avg: "$rating" },
                  },
                },
              ])
                .then((result) => {
                  if (result === null) {
                    res.status(400).json({
                      message: "Error while calculating rating",
                    });
                    return;
                  }
                  const avg = result[0].average;
                  // console.log(avg);

                  Job.findOneAndUpdate(
                    {
                      _id: data.jobId,
                    },
                    {
                      $set: {
                        rating: avg,
                      },
                    }
                  )
                    .then((foundJob) => {
                      if (foundJob === null) {
                        res.status(400).json({
                          message: "Error while updating job's average rating",
                        });
                        return;
                      }
                      res.json({
                        message: "Rating added successfully",
                      });
                    })
                    .catch((err) => {
                      res.status(400).json(err);
                    });
                })
                .catch((err) => {
                  res.status(400).json(err);
                });
            })
            .catch((err) => {
              res.status(400).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
});

// to get all the users on the recruiter page
router.get("/users",protect, async (req, res) => {
  // console.log("req",req);
  const user = req.user;
 try{
    const applications = await Application.find({ recruiterId: user._id });
    // console.log(applications);
  
    const userIds=applications.map((application)=>application.userId);
    // console.log(userIds);
    const jobApplicants = await Profile.find({
         userId: { $in: userIds },
       });
    console.log("jobapplicants",jobApplicants);
    res.json(jobApplicants);
  } catch (error) {
    console.error(error);
  }
 });

//to get all the jobs created by recruiter
router.get("/jobs",protect, async (req, res) => {
  const user = req.user;
  try{
    const jobs = await Job.find({ userId: user._id });
    res.json(jobs);
    console.log(jobs);
  } catch (error) {
    console.error(error);
  }
});

//to update the details of jobs created by recruiter
router.put("/jobs/:id",protect,async(req,res)=>{
  const user=req.user;
  const {id}=req.params;
  try{
       const job = await Job.findOne({ _id: id, userId: user._id });
        if (!job) {
      return res.status(404).json({ message: "Job not found or user not authorized to update this job" });
    }

    if (req.body.deadline) job.deadline = req.body.deadline;
    if (req.body.maxApplicants) job.maxApplicants = req.body.maxApplicants;
    if(req.body.maxPositions)job.maxPositions=req.body.maxPositions;
     const updatedJob = await job.save();
    res.json(updatedJob);
  }
  catch(error){
    console.error(error);
  }
})


//to delete the job created by recruiter

router.delete("/jobs/:id",protect,async(req,res)=>{
  const user=req.user;
  const {id}=req.params;
  try{
    const job = await Job.findByIdAndDelete({ _id: id, userId: user._id });
    if (!job) {
      return res.status(404).json({ message: "Job not found or user not authorized to delete this job" });
    }
    // await job.remove();
    res.json({ message: "Job removed" });
  }
  catch(error){
    console.error(error);
  }
})

//to get all the applications
router.get("/user_applications",protect, (req, res) => {
  const user = req.user;
      Application.find({userId:user.userId}).then((applications)=>{
          res.json(applications);
      }).catch((err)=>{
            res.status(400).json(err);
        });
});

//to get all the users who signed up as jobseeker
router.get("/jobseekers",(req,res)=>{
    JobApplicant.find().then((jobseekers)=>{
        res.json(jobseekers);
    }).catch((err)=>{
        res.status(400).json(err);
    });
})

//apply for a job
router.post("/apply/:id",protect, async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  console.log("id",id);
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const application = new Application({
      userId: user._id,
      jobId: job._id,
      recruiterId: job.userId,
    });
    await application.save();
    res.json(application);
  } catch (error) {
    console.error(error);
  }
}
);



module.exports=router;