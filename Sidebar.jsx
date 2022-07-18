import React from "react";
import "./Sidebar.css";
import PostTraining from "../PostTraining/PostTraining";
import Connect from "../Connect/Connect";
import * as FaIcons from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import ViewBookings from "../ViewBookings/ViewBookings";

let cnt = 0;
export default function Sidebar() {
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
    if (isActive === "false") {
      <div>
        <PostTraining />
      </div>;
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
            <Link to="/PostTraining/">Post Training</Link>
          </div>
          <div className="side-bar-data">
            <Link to="/ViewBookings/">View Bookings</Link>
          </div>
          <div className="side-bar-data">
            <Link to="/Connect/">Connect</Link>
          </div>
        </>
      ) : null}
    </section>
  );
}
