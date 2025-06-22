import React, { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import ApplyForm from "../components/ApplyForm";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data.jobs); // ✅ assuming API returns { jobs: [...] }
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  const [showApplyForm, setShowApplyForm] = useState(false);
const [selectedJobId, setSelectedJobId] = useState(null);

const handleApplyClick = (id) => {
  setSelectedJobId(id);
  setShowApplyForm(true);
};


  return (
  <div className="p-8">
    <h2 className="text-3xl font-bold text-center mb-6">Jobs Openings</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <div key={job.id} className="bg-amber-200 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
          <p className="text-gray-700 mb-1"><strong>Company:</strong> {job.company}</p>
          <p className="text-gray-700 mb-1"><strong>Location:</strong> {job.location}</p>
          <p className="text-gray-700 mb-1"><strong>Salary:</strong> {job.salary_range}</p>
          <p className="text-gray-700 mb-2"><strong>Skills:</strong> {job.skills}</p>
          <button
            onClick={() => handleApplyClick(job.id)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Apply Now
          </button>
        </div>
      ))}
    </div>

    {/* ✅ Show Apply Form overlay here (outside the loop) */}
    {showApplyForm && (
      <ApplyForm jobId={selectedJobId} onClose={() => setShowApplyForm(false)} />
    )}
  </div>
);
};

export default JobsList;
