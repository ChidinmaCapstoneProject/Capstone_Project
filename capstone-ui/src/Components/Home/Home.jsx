import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Logout from "../Logout/Logout";
import "./Home.css";
export default function Home() {
  return (
    <div className="home-div">
      <Sidebar />

      <Logout />
    </div>
  );
}
