import axios from "axios";

const API = axios.create({
  baseURL: "https://job-dashboard-backend-bdi6.onrender.com",
  withCredentials: true, // send cookies with request
});

export default API;
