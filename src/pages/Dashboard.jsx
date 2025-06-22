import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import API from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/JobForm";
import useAutoLogout from "../hooks/useAutoLogout";
import ApplicantTable from "../components/ApplicantTable";
import JobCard from "../components/JobCard";

const Dashboard = () => {
  const navigate = useNavigate();
  useAutoLogout(); // auto-logout

  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout");
      navigate("/");
    } catch (err) {
      console.log("Logout error", err);
    }
  };

  // Fetch all applicants
  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await API.get("/jobs/all-applicants");
        setApplicants(res.data.applicants);
      } catch (err) {
        console.error("Failed to load applicants", err);
      }
    };

    fetchAllApplicants();
  }, []);

  // Fetch all posted jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/jobs");
        setJobs(res.data.jobs);
      } catch (err) {
        console.error("Failed to load jobs", err);
      }
    };

    fetchJobs();
  }, []);

  // Delete job handler
  const handleDeleteJob = async (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this job?");
    if (!confirm) return;

    try {
      await API.delete(`/jobs/delete/${jobId}`);
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (err) {
      console.error("Failed to delete job", err);
    }
  };

  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          Welcome to Admin Dashboard 🚀
        </h1>

        {/* Job Posting Section */}
        <div className="mt-10">
          <JobForm />
        </div>

        {/* Job List */}
        <div className="mt-10 p-4 rounded shadow max-w-fit ">
          <h2 className="text-2xl font-semibold mb-4">Posted Jobs</h2>
          <div className="flex gap-2">
          
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard key={job.id} job={job} onDelete={handleDeleteJob} />
            ))
          ) : (
            <p className="text-gray-600">No jobs posted yet.</p>
          )}
          </div>
        </div>

        {/* Applicant Table */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">All Applicants</h2>
          <ApplicantTable
            applicants={applicants}
            onDelete={(id) =>
              setApplicants((prev) => prev.filter((a) => a.id !== id))
            }
          />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
