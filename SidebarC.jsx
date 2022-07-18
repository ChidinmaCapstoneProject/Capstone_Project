import React from "react";
import "./SidebarC.css";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

let cnt = 0;
export default function SidebarC() {
  const [btnStatus, setBtnStatus] = useState("");
  const [isActive, setActive] = useState("false");

  //When button is clicked set button status to visible, which makes the sidebar open, also set isActive to true
  //If the  button is already open, close it by reseting setting isActive to false
  function handleOnClick() {
    setBtnStatus("visible");
    setActive("true");
    cnt++;
    if (cnt > 1) {
      cnt = 0;
      setActive("false");
    }
  }
  return (
    <section className={isActive === "true" ? btnStatus : null} id="side-bar">
      <div className="sidebar-btn" id={btnStatus} onClick={handleOnClick}>
        <FaIcons.FaBars />
      </div>
      {/* <div style={{ margin: 60 }}></div> */}
      {isActive === "true" ? (
        <>
          <div className="side-bar-1st">
            <Link to="/FindTraining/">Find Training</Link>
          </div>
          <div className="side-bar-data">
            <Link to="/YourBookings/">Your Bookings</Link>
          </div>
          <div className="side-bar-data">
            <Link to="/FindGym/">Find Gym</Link>
          </div>
          <div className="side-bar-data">
            <Link to="/TraineeConnect/">Connect</Link>
          </div>
        </>
      ) : null}
    </section>
  );
}
