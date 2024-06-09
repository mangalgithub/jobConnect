import { useState, useEffect } from "react";
import { FilterIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/solid";
import axios from "axios";
const JobTile = (props) => {
  const { job } = props;
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [jobDetails, setJobDetails] = useState(job);
  const [isLoading, setLoading] = useState(false);
  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleClick = (location) => {
    // history.push(location);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/jobs/${job._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(jobDetails),
      });
      const data = await res.json();
      // setJobDetails(data);
      console.log(data);
      setOpenUpdate(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  };


  const handleDeleteJob=async()=>{
    try{
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/jobs/${job._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      setOpen(false);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }

  const postedOn = new Date(job.dateOfPosting);
  const deadline = new Date(job.deadline);

  return (
    <div className="w-3/4 mx-auto p-4">
      <h1 className="text-center font-bold text-2xl mb-4">My Jobs</h1>
      <div className="p-6 flex flex-col justify-center items-center rounded-lg border border-gray-200 shadow-md">
        <div className="flex flex-col items-center w-full">
          <h3 className="font-bold text-xl">{job.title}</h3>
          <div className="flex">
            {Array.from({ length: job.rating }).map((_, i) => (
              <StarIcon className="w-5 h-5 text-yellow-500" />
            ))}
          </div>
          <div className="flex flex-col items-start w-full mt-4">
            <div className="mb-2">Role: {job.jobType}</div>
            <div className="mb-2">Salary: ₹{job.salary} per month</div>
            <div className="mb-2">
              Duration:{" "}
              {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
            </div>
            <div className="mb-2">
              Date Of Posting: {postedOn.toLocaleDateString()}
            </div>
            <div className="mb-2">
              Deadline: {deadline.toLocaleDateString()}
            </div>
            <div className="mb-2">
              Remaining Number of Positions:{" "}
              {job.maxApplicants - job.acceptedCandidates}
            </div>
            <div className="mb-4">
              Skills:{" "}
              {job.skillsets.map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex justify-between w-full">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleClick(`/job/applications/${job._id}`)}
              >
                View Applications
              </button>
              <button
                className="bg-orange-500 text-white px-4 py-2 rounded"
                onClick={() => setOpenUpdate(true)}
              >
                Update Details
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setOpen(true)}
              >
                Delete Job
              </button>
            </div>
          </div>
        </div>
        <div
          className={`fixed inset-0 overflow-y-auto ${
            open ? "block" : "hidden"
          } z-50`}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="text-xl mb-4">Are you sure?</h4>
                <div className="flex justify-between">
                  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteJob}>
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 overflow-y-auto ${
            openUpdate ? "block" : "hidden"
          } z-50`}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              {/* <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="text-xl mb-4">Update Details</h4>
                <div className="flex flex-col space-y-4">
                  <input
                    type="datetime-local"
                    // value={jobDetails.deadline.substr(0, 16)}
                    onChange={(e) => handleInput("deadline", e.target.value)}
                    className="px-4 py-2 border rounded"
                  />
                  <input
                    type="number"
                    value={jobDetails.maxApplicants}
                    onChange={(e) =>
                      handleInput("maxApplicants", e.target.value)
                    }
                    min="1"
                    className="px-4 py-2 border rounded"
                  />
                  <input
                    type="number"
                    value={jobDetails.maxPositions}
                    onChange={(e) =>
                      handleInput("maxPositions", e.target.value)
                    }
                    min="1"
                    className="px-4 py-2 border rounded"
                  />
                  <div className="flex justify-between">
                    <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>
                      Update
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handleCloseUpdate}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div> */}

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="text-xl mb-4">Update Details</h4>
                <div className="flex flex-col space-y-4">
                  <input
                    type="datetime-local"
                    // Uncomment and use the value when not loading
                    // value={!isLoading ? jobDetails.deadline.substr(0, 16) : ''}
                    onChange={(e) => handleInput("deadline", e.target.value)}
                    className="px-4 py-2 border rounded"
                    disabled={isLoading} // Disable input when loading
                  />
                  <input
                    type="number"
                    value={jobDetails.maxApplicants}
                    onChange={(e) =>
                      handleInput("maxApplicants", e.target.value)
                    }
                    min="1"
                    className="px-4 py-2 border rounded"
                    disabled={isLoading} // Disable input when loading
                  />
                  <input
                    type="number"
                    value={jobDetails.maxPositions}
                    onChange={(e) =>
                      handleInput("maxPositions", e.target.value)
                    }
                    min="1"
                    className="px-4 py-2 border rounded"
                    disabled={isLoading} // Disable input when loading
                  />
                  <div className="flex justify-between">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded"
                      onClick={handleUpdate}
                      disabled={isLoading} // Disable button when loading
                    >
                      {isLoading ? "Updating..." : "Update"}{" "}
                      {/* Change button text based on loading state */}
                    </button>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={handleCloseUpdate}
                      disabled={isLoading} // Optionally disable cancel button when loading
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterPopup = (props) => {
  const { open, handleClose, searchOptions, setSearchOptions } = props;
  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${
        open ? "block" : "hidden"
      } z-50`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white p-12 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <span className="w-1/4">Job Type</span>
                <div className="flex w-3/4 justify-around">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={searchOptions.jobType.fullTime}
                      onChange={(e) =>
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            fullTime: e.target.checked,
                          },
                        })
                      }
                      className="form-checkbox h-5 w-5 text-blue-500 checked:bg-blue-500"
                    />
                    <span>Full Time</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={searchOptions.jobType.partTime}
                      onChange={(e) =>
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            partTime: e.target.checked,
                          },
                        })
                      }
                      className="form-checkbox h-5 w-5 text-blue-500 checked:bg-blue-500"
                    />
                    <span>Part Time</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={searchOptions.jobType.wfh}
                      onChange={(e) =>
                        setSearchOptions({
                          ...searchOptions,
                          jobType: {
                            ...searchOptions.jobType,
                            wfh: e.target.checked,
                          },
                        })
                      }
                      className="form-checkbox h-5 w-5 text-green-500 checked:bg-green-500"
                    />
                    <span>Work From Home</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center">
                <span className="w-1/4">Salary</span>
                {/* <Slider
              value={searchOptions.salary}
              onChange={(value) =>
                setSearchOptions({ ...searchOptions, salary: value })
              }
              className="w-3/4"
            /> */}
              </div>
              <div className="flex items-center">
                <span className="w-1/4">Duration</span>
                <select
                  value={searchOptions.duration}
                  onChange={(e) =>
                    setSearchOptions({
                      ...searchOptions,
                      duration: e.target.value,
                    })
                  }
                  className="w-3/4 px-4 py-2 border rounded"
                >
                  <option value="0">All</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleClose}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    jobType: { fullTime: false, partTime: false, wfh: false },
    salary: [0, 100],
    duration: 0,
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  
//   const setPopup = useContext(SetPopupContext);

useEffect(()=>{
 try{
  const fetchJobs=async()=>{
             const token = localStorage.getItem("token");
             const res = await fetch("http://localhost:5000/api/jobs", {
               method: "GET",
               headers: {
                 "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`,
               },
             });
             const jobs=await res.json();
             console.log("jobs ",jobs);
             setJobs(jobs);
    // console.log("res",res);
 }
  fetchJobs();
}catch(err){
  console.log(err);
}
  setLoading(false);
},[])

  return (
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-end p-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          onClick={() => setOpen(true)}
        >
          <FilterIcon className="w-5 h-5 mr-2" />
          Filter
        </button>
      </div>
      <FilterPopup
        open={open}
        handleClose={() => setOpen(false)}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full grid grid-cols-1 gap-4 p-4">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => <JobTile key={job._id} job={job} />)
          ) : (
            <div className="text-center text-gray-500">No jobs found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;
