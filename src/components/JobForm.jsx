import React, { useState } from "react";
import API from "../api/axiosConfig";

const JobForm = () => {
  const [jobData, setJobData] = useState({
    company: "",
    title: "",
    description: "",
    salary_range: "",
    location: "",
    skills: "",
    openings: "",
    experience: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isVisible, setIsVisible] = useState("none");
 

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/jobs/post-job", jobData); // ✅ corrected
      setMessage("Job posted successfully!");
      setIsError(false);
      setJobData({
        title: "",
        company: "",
        description: "",
        salary_range: "",
        location: "",
        skills: "",
        openings: "",
        experience: "",
      });
    } catch (err) {
      setMessage("Failed to post job");
      setIsError(true);
    }
  };
  
  const show = () => {
    setIsVisible("block");
  };

  const close = ()=>{
    setIsVisible("none")
  }




  return (

  <>

    <button className=" p-2 rounded-tr-2xl bg-green-400 hover:bg-green-600 " onClick={show} >Post a Job</button>



    <div style={{ display: isVisible}} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md border-2">
      <button onClick={close} className="bg-red-400 hover:bg-red-600 p-2 rounded-2xl">Close</button>
      <h2 className="text-2xl font-bold mb-4 text-center">Post a New Job</h2>
      {message && (
        <p className={`mb-4 text-center font-medium ${isError ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: "company", label: "Company Name" },
          { name: "title", label: "Job Title" },
          { name: "description", label: "Job Description", textarea: true },
          { name: "salary", label: "Salary Range" },
          { name: "location", label: "Location" },
          { name: "skills", label: "Skills Required" },
          { name: "openings", label: "Number of Openings" },
          { name: "experience", label: "Work Experience (years)" },
        ].map(({ name, label, textarea }) => (
          <div key={name}>
            <label className="block font-semibold">{label}</label>
            {textarea ? (
              <textarea
                name={name}
                value={jobData[name]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
              />
            ) : (
              <input
                type="text"
                name={name}
                value={jobData[name]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Post Job
        </button>
      </form>
    </div>
    </>
  );
};

export default JobForm;
