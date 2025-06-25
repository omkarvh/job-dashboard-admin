import React from "react";

const JobCard = ({ job, onViewApplicants, onDelete }) => {
  // Truncate the job description to 250 characters
  const truncatedDescription =
    job.description && job.description.length > 250
      ? job.description.slice(0, 250) + "..."
      : job.description;

  return (
    <div className="border rounded-lg p-4 shadow mb-4 bg-white">
      <h3 className="text-xl font-semibold text-green-700">{job.title}</h3>
      <p className="text-gray-700 mt-1">{truncatedDescription}</p>
      <p className="text-gray-600 mt-1">
        <strong>Location:</strong> {job.location || "N/A"}
      </p>
      <p className="text-gray-600 mt-1">
        <strong>Salary:</strong> {job.salary_range || "Not specified"}
      </p>
      <p className="text-gray-600 mt-1">
        <strong>Openings:</strong> {job.openings || 1}
      </p>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() => onDelete(job.id)}
          className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
        >
          Delete Job
        </button>
      </div>
    </div>
  );
};

export default JobCard;
