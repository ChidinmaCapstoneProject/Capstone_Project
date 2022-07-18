import React from "react";
import { useRef, useEffect, useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import "./PostTraining.css";
import axios from "../../../api/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import { format } from "date-fns";
const POST_URL = "/training";

export default function PostTraining({ fName, setFName }) {
  const [email, setEmail] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [description, setDecription] = useState("");
  const [price, setPrice] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { userName } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(
    format(new Date(), "MM/dd/yyyy")
  );
  console.log("currentDate: ", typeof currentDate);
  const [start, setStart] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  console.log("full Name", userName);
  // console.log("timerange", timeRange);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        POST_URL,
        JSON.stringify({
          fName,
          email,
          trainingType,
          description,
          price,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response.data));
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
      <p>{userName}</p>
      <form className="post-training" onSubmit={handleSubmit}>
        <label htmlFor="Name">FullName:</label>
        <input
          type="text"
          onChange={(e) => setFName(e.target.value)}
          required
        />
        <label htmlFor="Email">Email:</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="trainingtype">Training Type:</label>
        <input
          type="text"
          required
          onChange={(e) => setTrainingType(e.target.value)}
        />
        <label htmlFor="Description ">Description:</label>
        <input
          className="description"
          type="text"
          required
          onChange={(e) => setDecription(e.target.value)}
        />
        <label htmlFor="price">Price: $</label>
        <input
          type="Number"
          required
          onChange={(e) => setPrice(e.target.value)}
        />
        <FontAwesomeIcon icon={faCalendarDays} />
        Select Start Day and Time:
        <DatePicker dateFormat="LLL" onChange={setStart} isRequired="true" />
        <TimeRangePicker
          placeholder="Enter Preffered Time"
          dateFormat="hh:mm"
        />
        <button>Post</button>
      </form>
      {console.log("training name", fName)}
    </div>
  );
}
