import React from "react";
import { useEffect } from "react";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import "./FindTraining.css";

export default function FindTraining() {
  const [trainings, setTrainings] = useLocalStorage([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("1st Training");

    const allTrainings = async () => {
      const response = await axios.get("/training");
      setTrainings(response.data);
      console.log("1st Training");
    };

    allTrainings();
  });

  const handleClick = (training) => {
    navigate("/ViewDetails", { state: { training: training } });
  };

  return (
    <div>
      <p>Find All Trainings</p>
      {console.log("2nd Training", trainings)}
      {trainings?.map((training, index) => {
        return (
          <div key={index} className="each-training">
            <p>
              <h1 className="training-content">{training.trainingType}</h1> by{" "}
              {training.fullname}
            </p>
            <button className="book" onClick={() => handleClick(training)}>
              View Details
            </button>
          </div>
        );
      })}
    </div>
  );
}
