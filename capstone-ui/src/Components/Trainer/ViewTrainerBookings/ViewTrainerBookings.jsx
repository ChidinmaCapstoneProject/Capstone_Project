import React, { useState, useContext } from "react";
import NavBar from "../../NavBar/NavBar";
import AuthContext from "../../context/AuthProvider";
import TrainerReview from "../MoreInfo/TrainerReview/TrainerReview";
import "./ViewTrainerBookings.css";
import Bookings from "../../Bookings/Bookings";

export default function ViewTrainerBookings({ selectedDay }) {
  const [toggleState, setToggleState] = useState(1);
  const { userName } = useContext(AuthContext);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="bloc-tabs">
          <div
            className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(1)}
          >
            Bookings
          </div>
          <div
            className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
            onClick={() => toggleTab(2)}
          >
            Reviews
          </div>
        </div>
        <div
          className={toggleState === 1 ? "content active-content" : "content"}
        >
          <Bookings></Bookings>
        </div>
        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <TrainerReview trainerName={userName} />
        </div>
      </div>
    </>
  );
}
