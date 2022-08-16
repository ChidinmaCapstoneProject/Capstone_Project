import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Logout from "../Logout/Logout";
import "./Home.css";
export default function Home() {
  return (
    <div className="home-div">
      <Sidebar />
      <Logout />
      <img src="https://cdn4.vectorstock.com/i/1000x1000/61/98/fitness-background-in-flat-style-vector-3876198.jpg" />
    </div>
  );
}
