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

    useEffect(() => {
        // Fetch job data from backend
        axios.get("http://localhost:5000/alljob/jobs")
            .then(response => {
                setJobs(response.data);
                setFilteredJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching job data:', error);
            });
    }, []);

     const handleFetchAppliedJobs = async () => {
       try {
         const token = localStorage.getItem("token");
         const response = await fetch(
           "http://localhost:5000/api/applied_jobs",
           {
             method: "GET",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${token}`,
             },
           }
         );
         const data = await response.json();
        //  console.log("applied jobs", data);
         setAppliedJobs(data);
       } catch (error) {
         console.error("Error fetching job data:", error);
       }
     };
     useEffect(() => {
       handleFetchAppliedJobs();
     }, []);
    const filterJobs = useCallback(() => {
        let tempJobs = [...jobs];

        if (jobTypeFilter) {
            tempJobs = tempJobs.filter(job => job.jobType === jobTypeFilter);
        }

        if (salarySort === 'Low to High') {
            tempJobs.sort((a, b) => {
                const salaryA = parseFloat(a.salary.toString().replace(/[^0-9.-]+/g, ""));
                const salaryB = parseFloat(b.salary.toString().replace(/[^0-9.-]+/g, ""));
                return salaryA - salaryB;
            });
        } else if (salarySort === 'High to Low') {
            tempJobs.sort((a, b) => {
                const salaryA = parseFloat(a.salary.toString().replace(/[^0-9.-]+/g, ""));
                const salaryB = parseFloat(b.salary.toString().replace(/[^0-9.-]+/g, ""));
                return salaryB - salaryA;
            });
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
    }, [jobs, jobTypeFilter, salarySort, searchQuery]);

    useEffect(() => {
        filterJobs();
    }, [jobTypeFilter, salarySort, searchQuery, filterJobs]);

    const handleJobTypeFilter = (type) => {
        setJobTypeFilter(type);
    };

    const handleSalarySort = (sort) => {
        setSalarySort(sort);
    };

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value);
    };
  
    const handleApplyJob = async (job) => {
        console.log("Applying job:", job);
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `http://localhost:5000/api/apply/${job._id}`,
            {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("Applied Successfully");
        toast.success("Applied Successfully"); 
      } catch (error) {
        // console.error("Error applying job:", error);
        toast.error(`Error applying job: ${error.message}`);
      }
    };
    return (
      <div className="flex">
         <Toaster/>
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

                {/* todo disable the apply button once applied */}
                <button
                  className={`absolute bottom-4 right-4 ${
                    appliedJobs.includes(job._id) ? "bg-red-500" : "bg-blue-500"
                  } text-white px-4 py-2 rounded ${
                    appliedJobs.includes(job._id)
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => handleApplyJob(job)}
                  disabled={appliedJobs.includes(job._id)}
                >
                  Apply
                </button>
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
