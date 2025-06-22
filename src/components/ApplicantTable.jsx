import React from "react";

const ApplicantList = ({ applicants, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this applicant?");
      if (!confirmed) return;

      const res = await fetch(`http://localhost:5000/api/jobs/applications/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(id); // Inform parent to update UI
      } else {
        console.error("Failed to delete");
      }
    } catch (err) {
      console.error("Error deleting applicant:", err);
    }
  };

  if (!applicants || applicants.length === 0) {
    return <p className="text-center">No applicants yet.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="table-auto w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Position</th>
            <th className="px-4 py-2 border">Applied Date</th>
            <th className="px-4 py-2 border">Resume</th>
            <th className="px-4 py-2 border">Delete Data</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map((a) => (
            <tr key={a.id} className="text-center">
              <td className="px-4 py-2 border">{a.name}</td>
              <td className="px-4 py-2 border">{a.job_title || "—"}</td>
              <td className="px-4 py-2 border">
                {new Date(a.applied_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 border">
                {a.resume_filename ? (
                  <a
                    href={`http://localhost:5000/uploads/${a.resume_filename}`}
                    download
                    className="text-blue-600 underline"
                  >
                    Download
                  </a>
                ) : (
                  "No file"
                )}
              </td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleDelete(a.id)}
                  className="bg-red-400 p-2 rounded-2xl border-2 hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantList;
