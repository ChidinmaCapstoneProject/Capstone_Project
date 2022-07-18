import React from "react";
import { useContext } from "react";
import Sidebar from "../Trainer/Sidebar/Sidebar";
import SidebarC from "../Trainee/SidebarC/SidebarC";
import AuthContext from "../context/AuthProvider";
import "./Home.css";
export default function Home() {
  const { chooseClass } = useContext(AuthContext);
  return (
    <div className="home-div">
      {chooseClass == "Trainer" ? <Sidebar /> : <SidebarC />}
      hi friends
      <br />
      <a href="https://www.fhittingroom.com/in-studio/">
        <img src="https://aktivsolutions.com/wordpress/wp-content/uploads/2020/03/Fhit-Room-Shop-Aktiv.png"></img>
      </a>
    </div>
  );
}
