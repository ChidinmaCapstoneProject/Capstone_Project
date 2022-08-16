import React, { useContext, useState } from "react";
import NavBar from "../../../NavBar/NavBar";
import AuthContext from "../../../context/AuthProvider";
import SocketContext from "../../../context/SocketTraining";
import Review from "../../Reviews/Reviews";
import { useLocation } from "react-router-dom";
import TrainingList from "../TrainingList/TrainingList";
import "./TrainerInfo.css";

export default function TrainerInfo() {
  const { userName } = useContext(AuthContext);
  const [toggleState, setToggleState] = useState(1);
  const { socketTrainings } = useContext(SocketContext);

  const location = useLocation();
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
            Find All Training
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
          <TrainingList
            trainings={socketTrainings}
            trainerName={location?.state?.trainerName}
          />
        </div>
        <div
          className={toggleState === 2 ? "content active-content" : "content"}
        >
          <Review
            trainings={socketTrainings}
            traineeName={userName}
            trainerName={location?.state?.trainerName}
          />
        </div>
      </div>
    </>
  );
}
