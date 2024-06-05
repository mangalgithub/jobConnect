import React from 'react';

function AppliedJobsPage() {
  const appliedJobs = [
    {
      id: 1,
      companyName: 'Tech Company',
      postedBy: 'John Doe',
      role: 'Software Engineer',
      appliedDate: '2024-05-01',
      duration: '6 months',
    },
    {
      id: 2,
      companyName: 'Creative Agency',
      postedBy: 'Jane Smith',
      role: 'UX Designer',
      appliedDate: '2024-04-15',
      duration: '3 months',
    },
    {
      id: 3,
      companyName: 'Global Corp',
      postedBy: 'Robert Brown',
      role: 'Marketing Specialist',
      appliedDate: '2024-06-01',
      duration: '12 months',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-8 flex justify-center">
      <div className="container mx-auto px-4 md:w-2/3 lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-6 text-center">Jobs You've Applied To</h1>
        <div className="bg-white p-6 rounded-md shadow-md">
          {appliedJobs.map((job) => (
            <div key={job.id} className="mb-6 border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{job.companyName}</h2>
                  <p><strong>Posted By:</strong> {job.postedBy}</p>
                  <p><strong>Role:</strong> {job.role}</p>
                  <p><strong>Applied Date:</strong> {job.appliedDate}</p>
                  <p><strong>Duration:</strong> {job.duration}</p>
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
