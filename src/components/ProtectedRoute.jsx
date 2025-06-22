import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/axiosConfig";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await API.get("/auth/check");
        if (res.data.loggedIn) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (err) {
        console.error("Auth check failed", err);
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">🔄 Checking login...</div>;
  }

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
