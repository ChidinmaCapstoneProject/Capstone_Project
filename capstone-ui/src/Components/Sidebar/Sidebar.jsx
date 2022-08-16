import React from "react";
import "./Sidebar.css";
import * as FaIcons from "react-icons/fa";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

let cnt = 0;
export default function Sidebar() {
  const [btnStatus, setBtnStatus] = useState();
  const [isActive, setActive] = useState(false);
  const { chooseClass } = useContext(AuthContext);

  //When button is clicked set button status to visible, which makes the sidebar open, also set isActive to true
  //If the  button is already open, close it by reseting setting isActive to false
  function handleOnClick() {
    setBtnStatus("visible");
    setActive(true);
    cnt++;
    if (cnt > 1) {
      cnt = 0;
      setActive(false);
    }
  }
  return (
    <section className={isActive === true ? btnStatus : null} id="side-bar">
      <div className="sidebar-btn" id={btnStatus} onClick={handleOnClick}>
        <FaIcons.FaBars size={25} />
      </div>
      {isActive === true && chooseClass === "Trainer" ? (
        <div>
          <div className="side-bar-1st">
            <Link to="/PostTraining/">Post Training</Link>
          </div>
          <div className="side-bar-data">
            <Link to="/ViewTrainerBookings/">View Bookings</Link>
          </div>
          <div className="side-bar-data">
            <Link to="/Chat/">Connect</Link>
          </div>
        </div>
      ) : isActive === true && chooseClass === "Trainee" ? (
        <div>
          <div className="side-bar-1st">
            <Link to="/FindTraining/">Find Training</Link>
          </div>
          <div className="side-bar-data">
            <Link to="/Bookings/">My Bookings</Link>
          </div>
          <div className="side-bar-data">
            <Link to="/FindGym/">Find Gym</Link>
          </div>
          <div className="side-bar-data">
            <Link to="/Chat/">Connect</Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
