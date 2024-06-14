import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";

const JobListings = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [jobTypeFilter, setJobTypeFilter] = useState('');
    const [salarySort, setSalarySort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [currentUserId, setCurrentUserId] = useState("");
    const [userEmail, setUserEmail] = useState("");

    // Function to fetch applied jobs
    const handleFetchAppliedJobs = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            const userId = localStorage.getItem("userId");
           // const email = localStorage.getItem("userEmail");
            if (userId) {
                setCurrentUserId(userId);
                setUserEmail(email);
            }
            const response = await axios.get("http://localhost:5000/api/applied_jobs", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = response.data;
            console.log(data);
            const appliedJobs = data.filter(job => Array.isArray(job.matched) && job.matched.includes(userId));
            setAppliedJobs(appliedJobs);
        } catch (error) {
            console.error("Error fetching applied jobs:", error);
        }
    }, []);
    const token = localStorage.getItem('token'); 
    // Fetch job data from backend and applied jobs on initial load
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/alljob/jobs", {
                  headers: {
                    'Authorization': `Bearer ${token}` // Set the token in the headers
                  }
                });
                setJobs(response.data);
                console.log("All jobs", response.data);
                handleFetchAppliedJobs(); // Fetch applied jobs after setting jobs
              } catch (error) {
                console.error('Error fetching job data:', error);
              }
        };

        fetchJobs();
    }, [handleFetchAppliedJobs]);
    
    useEffect(() => {
      const filterJobs = () => {
          let tempJobs = jobs.filter(job =>
              appliedJobs.every(appliedJob => appliedJob._id !== job._id)
          );
  
          if (jobTypeFilter) {
              tempJobs = tempJobs.filter(job => job.jobType === jobTypeFilter);
          }
  
          if (salarySort === 'Low to High') {
              tempJobs.sort((a, b) => parseFloat(a.salary) - parseFloat(b.salary));
          } else if (salarySort === 'High to Low') {
              tempJobs.sort((a, b) => parseFloat(b.salary) - parseFloat(a.salary));
          }
  
          if (searchQuery) {
              tempJobs = tempJobs.filter(job =>
                  job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (job.skills && Array.isArray(job.skills) &&
                      job.skills.some(skill =>
                          skill.toLowerCase().includes(searchQuery.toLowerCase())
                      ))
              );
          }
  
          setFilteredJobs(tempJobs);
      };
  
      filterJobs();
  }, [jobs, appliedJobs, jobTypeFilter, salarySort, searchQuery]);

    // Function to handle job type filter
    const handleJobTypeFilter = (type) => {
        setJobTypeFilter(type);
    };

    // Function to handle salary sort
    const handleSalarySort = (sort) => {
        setSalarySort(sort);
    };

    // Function to handle search query
    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to handle applying for a job
    const handleApplyJob = async (job) => {
        try {
            const token = localStorage.getItem("token");
            const emailId=localStorage.getItem("emailId");
           
            await axios.post(
                `http://localhost:5000/api/apply/${job._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Send email
            await axios.post(
                "http://localhost:5000/email/send-email",
                {
                    userEmail: emailId,
                    jobTitle: job.title,
                    jobSalary: job.salary,
                    jobDuration: job.duration // Or any other duration field if available
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        
            toast.success("Applied and Email sent Successfully");
            // Update the appliedJobs state
            setAppliedJobs([...appliedJobs, job]);
        } catch (error) {
            toast.error(`Error applying job: ${error.message}`);
        }
    };

    return (
        <div className="flex">
            <Toaster />
            <div className="w-3/4 p-4">
                <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
                <input
                    type="text"
                    placeholder="Search by title or skills..."
                    value={searchQuery}
                    onChange={handleSearchQuery}
                    className="mb-6 p-2 border border-gray-300 rounded w-full"
                />
                <div className="space-y-6">
                <h2>Job's that you have not applied</h2>
                    {filteredJobs.map((job) => (
                        <div
                            key={job._id}
                            className="bg-white border border-gray-200 rounded-lg shadow-md p-6 relative"
                        >
                            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                            <div className="job-details mb-4">
                                <p className="text-gray-700 mb-1">
                                    <strong>Job Type:</strong> {job.jobType}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <strong>Salary:</strong> {job.salary}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <strong>Max Applicants:</strong> {job.maxApplicants}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <strong>Max Positions:</strong> {job.maxPositions}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <strong>Deadline:</strong>{" "}
                                    {new Date(job.deadline).toLocaleDateString()}
                                </p>
                                <p className="text-gray-700 mb-1">
                                    <strong>Skill Sets:</strong>{" "}
                                    {job.skillsets ? job.skillsets.join(", ") : "N/A"}
                                </p>
                            </div>

                            {/* Conditional rendering of apply button */}
                            {appliedJobs.some(appliedJob => appliedJob._id === job._id) ? (
                                <button
                                    className="absolute bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
                                    disabled
                                >
                                    Applied
                                </button>
                            ) : (
                                <button
                                    className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
                                    onClick={() => handleApplyJob(job)}
                                >
                                    Apply
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-1/4 p-4 sticky top-0 h-screen">
                <h2 className="text-xl font-bold mb-4">Sort Options</h2>
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Job Type</h3>
                        <button
                            onClick={() => handleJobTypeFilter("Full Time")}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mb-2 w-full"
                        >
                            Full Time
                        </button>
                        <button
                            onClick={() => handleJobTypeFilter("Part Time")}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mb-2 w-full"
                        >
                            Part Time
                        </button>
                        <button
                            onClick={() => handleJobTypeFilter("Work From Home")}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mb-2 w-full"
                        >
                            Work From Home
                        </button>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Salary</h3>
                        <button
                            onClick={() => handleSalarySort("Low to High")}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mb-2 w-full"
                        >
                            Low to High
                        </button>
                        <button
                            onClick={() => handleSalarySort("High to Low")}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded mb-2 w-full"
                        >
                            High to Low
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListings;
