import React ,{useState,useEffect} from 'react';

function AppliedJobsPage() {
 
  const [jobs,setJobs]=useState([]);
  const handleFetchAppliedJobs=async()=>{
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
               console.log("applied jobs", data);
               setJobs(data);
             } catch (error) {
               console.error("Error fetching job data:", error);
             }
  }
  useEffect(()=>{
    handleFetchAppliedJobs();
  },[]);
  return (
    <div className="bg-gray-100 min-h-screen py-8 flex justify-center">
      <div className="container mx-auto px-4 md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Jobs You've Applied To
        </h1>
        <div className="bg-white p-6 rounded-md shadow-md">
          {jobs &&
            jobs.map((job) => (
              <div
                key={job._id}
                className="mb-6 border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <p>
                      <strong>Job Type:</strong> {job.jobType}
                    </p>
                    <p>
                      <strong>Salary:</strong> {job.salary}
                    </p>
                    <p>
                      <strong>Job Posted:</strong>{" "}
                      {new Date(job.dateOfPosting).toLocaleDateString("en-US")}
                    </p>
                    <p>
                      <strong>Duration:</strong> {job.duration}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-500">
                      <i className="fas fa-check-circle"></i> Applied
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AppliedJobsPage;
