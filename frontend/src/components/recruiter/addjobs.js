import React from "react";
import TagsInput from "./taginput";
const AddJobs=()=>{
    const [jobDetails, setJobDetails] = React.useState({
        title: "",
        skillsets: [],
        jobType: "Full Time",
        duration: 0,
        salary: 0,
        deadline: "",
        maxApplicants: 1,
        maxPositions: 1,
      });
      const handleInput = (key, value) => {
        setJobDetails({
          ...jobDetails,
          [key]: value,
        });
      };
      const handleUpdate = () => {
        console.log(jobDetails);
      };

    return (
      <div className="flex flex-col items-center min-h-screen p-8">
        <h1 className="border-b-2 border-black font-bold text-2xl mb-8">
          Add Job
        </h1>
        <div className="w-full max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-tl-2xl rounded-br-2xl border border-gray-300 shadow">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700">Title</label>
                <input
                  type="text"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  value={jobDetails.title}
                  onChange={(e) => handleInput("title", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Skills</label>
                <TagsInput
                  tags={jobDetails.skillsets}
                  setTags={(newTags) => handleInput("skillsets", newTags)}
                />
              </div>
              <div>
                <label className="block text-gray-700">Job Type</label>
                <select
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  value={jobDetails.jobType}
                  onChange={(e) => handleInput("jobType", e.target.value)}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Work From Home">Work From Home</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Duration</label>
                <select
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  value={jobDetails.duration}
                  onChange={(e) => handleInput("duration", e.target.value)}
                >
                  <option value={0}>Flexible</option>
                  <option value={1}>1 Month</option>
                  <option value={2}>2 Months</option>
                  <option value={3}>3 Months</option>
                  <option value={4}>4 Months</option>
                  <option value={5}>5 Months</option>
                  <option value={6}>6 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700">Salary</label>
                <input
                  type="number"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  value={jobDetails.salary}
                  onChange={(e) => handleInput("salary", e.target.value)}
                  min={0}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Application Deadline
                </label>
                <input
                  type="datetime-local"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  value={jobDetails.deadline}
                  onChange={(e) => handleInput("deadline", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Maximum Number Of Applicants
                </label>
                <input
                  type="number"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  value={jobDetails.maxApplicants}
                  onChange={(e) => handleInput("maxApplicants", e.target.value)}
                  min={1}
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Positions Available
                </label>
                <input
                  type="number"
                  className="w-full mt-2 p-2 border border-gray-300 rounded"
                  value={jobDetails.maxPositions}
                  onChange={(e) => handleInput("maxPositions", e.target.value)}
                  min={1}
                />
              </div>
            </div>
            <button
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={handleUpdate}
            >
              Create Job
            </button>
          </div>
        </div>
      </div>
    );
}
export default AddJobs;