import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import "./Home.css";
export default function Home() {
  return (
    <div className="home-div">
      <Sidebar />
      <br />
      <a href="https://www.fhittingroom.com/in-studio/">
        <img src="https://aktivsolutions.com/wordpress/wp-content/uploads/2020/03/Fhit-Room-Shop-Aktiv.png"></img>
      </a>
    </div>
  );
}
