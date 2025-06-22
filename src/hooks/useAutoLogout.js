import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";

const useAutoLogout = (timeout = 15 * 60 * 1000) => {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  const logout = async () => {
    try {
      await API.post("/auth/logout"); // optional, if backend clears cookie
    } catch (err) {
      console.error("Logout failed");
    }
    localStorage.clear();
    navigate("/login");
  };

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      logout(); // logout after timeout
    }, timeout);
  };

  useEffect(() => {
    resetTimer(); // start on mount

    const events = ["mousemove", "keydown", "click", "scroll"];

    for (let event of events) {
      window.addEventListener(event, resetTimer);
    }

    return () => {
      for (let event of events) {
        window.removeEventListener(event, resetTimer);
      }
      clearTimeout(timerRef.current);
    };
  }, []);
};

export default useAutoLogout;
