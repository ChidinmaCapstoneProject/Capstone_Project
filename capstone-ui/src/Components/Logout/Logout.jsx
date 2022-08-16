import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import "./Logout.css";
export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/logout");

      navigate("/login");
    } catch (error) {
      //fill up
    }
  };

  return (
    <div className="logout-btn">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
