import React, { useState } from "react";
import API from "../api/axiosConfig";

const ApplyForm = ({ jobId, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    currentSalary: "",
    expectedSalary: "",
    resume: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "resume") {
      setFormData({ ...formData, resume: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }
      form.append("job_id", jobId); // Link to the job

      const res = await API.post("/jobs/apply", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(res.data.message || "Applied successfully");
      setTimeout(onClose, 2000); // close form after 2 seconds
    } catch (err) {
      setMessage("Application failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-600">✖</button>
        <h2 className="text-xl font-bold mb-4">Apply for Job</h2>
        {message && <p className="text-green-600">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="experience" placeholder="Years of Experience" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="currentSalary" placeholder="Current Salary" onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="expectedSalary" placeholder="Expected Salary" onChange={handleChange} className="w-full p-2 border rounded" />
          <p>Click below to upload resume</p>
          <input type="file" name="resume" accept=".pdf,.jpg,.png" required onChange={handleChange} className="w-full" />
          <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
