import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import "./PostTraining.css";
import axios from "../../../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TimeRangeInput } from "@mantine/dates";
import NavBar from "../../NavBar/NavBar";
import Test from "../../Trainee/FindTraining/Test";
const POST_URL = "/training";

export default function PostTraining() {
  const [email, setEmail] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [description, setDecription] = useState("");
  const [price, setPrice] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { userName } = useContext(AuthContext);
  const startTime = new Date();
  const endTime = new Date();
  const [day, setDay] = useState(new Date());
  const [timeRange, setTimeRange] = useState(startTime, endTime);
  console.log("timeRange: ", timeRange);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const startTime = timeRange[0];
      console.log("startTime: ", startTime);

      const endTime = timeRange[1];
      const response = await axios.post(
        POST_URL,
        JSON.stringify({
          userName,
          email,
          trainingType,
          description,
          price,
          startTime,
          endTime,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      alert("submited");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Failed To Post Training");
      }
    }
  };
  return (
    <div>
      <NavBar />
      <form
        className="post-training"
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "20" }}
      >
        <label htmlFor="Email">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="trainingtype">Training Type:</label>
        <input
          type="text"
          value={trainingType}
          required
          onChange={(e) => setTrainingType(e.target.value)}
        />

        <label htmlFor="Description ">Description: </label>
        <textarea
          className="description"
          value={description}
          type="text"
          required
          onChange={(e) => setDecription(e.target.value)}
        />

        <label htmlFor="price">
          Price: $
          <input
            value={price}
            type="Number"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          <FontAwesomeIcon icon={faCalendarDays} /> Select Day{" "}
        </label>
        <DatePicker selected={day} onChange={setDay} dateFormat="dd MMM yyyy" />
        <TimeRangeInput
          format="12"
          value={timeRange}
          onChange={setTimeRange}
          label="Set Time Range"
          isClearable
        />
        <button>Post</button>
      </form>
      <Link to="/Test/">Test</Link>
    </div>
  );
}
