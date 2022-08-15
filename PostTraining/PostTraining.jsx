import React from "react";
import { useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import NavBar from "../../NavBar/NavBar";
import { handleTrainingSubmit } from "./SubmitTraining";
import PostTrainingForm from "./PostTrainingForm";
import "./PostTraining.css";

export default function PostTraining() {
  const startTime = new Date();
  const endTime = new Date();
  const [timeRange, setTimeRange] = useState([startTime, endTime]);
  const initialState = {
    email: "",
    trainingType: "",
    description: "",
    price: "",
    day: new Date(),
    slots: null,
  };
  const [trainingInfo, setTrainingInfo] = useState(initialState);

  const [errMsg, setErrMsg] = useState("");
  const { userName, userId } = useContext(AuthContext);

  return (
    <div>
      <NavBar />
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <form
        className="post-training"
        onSubmit={(e) => {
          e.preventDefault(); //!Important, prevents default action when submitting forms
          handleTrainingSubmit(
            trainingInfo,
            timeRange,
            userName,
            userId,
            setErrMsg
          );
        }}
        style={{ display: "grid", gap: "20", boxSizing: "content-box" }}
      >
        <PostTrainingForm
          trainingInfo={trainingInfo}
          setTrainingInfo={setTrainingInfo}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
        <button>Post</button>
      </form>
    </div>
  );
}
