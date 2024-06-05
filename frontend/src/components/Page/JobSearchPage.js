import React, { useState } from 'react';

function JobSearchPage() {
  const [jobType, setJobType] = useState({
    fullTime: false,
    partTime: false,
    workFromHome: false,
  });

  const [salary, setSalary] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleJobTypeChange = (type) => {
    setJobType({ ...jobType, [type]: !jobType[type] });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4 flex flex-col md:flex-row">
        {/* Left Side: Search and Job Listings */}
        <div className="md:w-3/4 mb-8 md:mb-0 md:pr-8">
          {/* Search Bars */}
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search by skills"
              className="w-full px-4 py-2 pr-10 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <i className="fas fa-search"></i>
            </span>
          </div>
          <div className="mb-4 relative">
            <input
              type="text"
              placeholder="Search by job title"
              className="w-full px-4 py-2 pr-10 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <span className="absolute right-3 top-3 text-gray-400">
              <i className="fas fa-search"></i>
            </span>
          </div>

          {/* Job Listings */}
          <div>
            {[1, 2, 3].map((job) => (
              <div key={job} className="bg-white p-4 mb-4 rounded-md shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h2 className="text-xl font-semibold">Company Name</h2>
                    <p>Job Role</p>
                    <p>Posted by Name</p>
                    <p>Application Deadline: 2023-12-31</p>
                    <p>Duration: 6 months</p>
                    <a
                      href="https://www.linkedin.com"
                      className="text-blue-500"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                  <div className="flex flex-col items-end">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                      Apply
                    </button>
                    <div className="flex mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-6 h-6 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Sorting Options */}
        <div className="md:w-1/4">
          <div className="fixed w-full md:w-1/4 bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Sort Options</h3>

            {/* Job Type */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Job Type</h4>
              <div>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={jobType.fullTime}
                    onChange={() => handleJobTypeChange('fullTime')}
                    className="mr-2"
                  />
                  Full Time
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={jobType.partTime}
                    onChange={() => handleJobTypeChange('partTime')}
                    className="mr-2"
                  />
                  Part Time
                </label>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={jobType.workFromHome}
                    onChange={() => handleJobTypeChange('workFromHome')}
                    className="mr-2"
                  />
                  Work From Home
                </label>
              </div>
            </div>

            {/* Salary Slider */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Salary</h4>
              <input
                type="range"
                min="0"
                max="10000000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full"
              />
              <div className="text-right">{salary} INR</div>
            </div>

            {/* Duration */}
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Duration</h4>
              <input
                type="number"
                min="0"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="text-right">Months</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobSearchPage;
