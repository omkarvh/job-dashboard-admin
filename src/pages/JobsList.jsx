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
   
  <>
    <div className="p-8">
      {/* Admin Login Button */}
      <div className="flex justify-end mb-4">
        <a
          href="/admin-login"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Admin Login
        </a>
      </div>

      <h2 className="text-3xl font-bold text-center mb-6">Jobs Openings</h2>
      
      {/* Job cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-amber-200 shadow-md rounded-lg p-6">
            {/* ... your job details */}
          </div>
        ))}
      </div>

      {showApplyForm && (
        <ApplyForm jobId={selectedJobId} onClose={() => setShowApplyForm(false)} />
      )}
    </div>
  </>
);


};

export default JobsList;
