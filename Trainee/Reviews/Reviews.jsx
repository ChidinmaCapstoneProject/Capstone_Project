import React from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "../../../api/axios";
import ViewReviews from "./ViewReviews/ViewReviews";
import { Scrollbars } from "react-custom-scrollbars";
import "./Reviews.css";

const reviewsUrl = "/review";

export default function Review({ training, traineeName }) {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [trainingType, setTrainingType] = useState("");
  const [review, setReview] = useState("");
  const date = new Date().toLocaleString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const starsNo = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };
  const handleMouseOver = (value) => {
    setHoverValue(value);
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const handleReviews = async (e) => {
    e.preventDefault();
    try {
      const trainerName = training.fullname;

      const response = await axios.post(
        reviewsUrl,
        JSON.stringify({
          traineeName,
          trainerName,
          currentValue,
          trainingType,
          review,
          date,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      alert("Submitted!");
    } catch (err) {
      alert("Error!");
    }
  };

  return (
    <div>
      <div className="view-reviews">
        <ViewReviews trainerName={training.fullname} />
      </div>
      <div className="write-review">
        <p>Write A Review for {training.fullname}</p>

        {starsNo.map((_, index) => {
          return (
            <FaStar
              key={index}
              onClick={() => handleClick(index + 1)}
              className={
                (hoverValue || currentValue) > index
                  ? "star-clicked"
                  : "star-notclicked"
              }
              size={24}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
        <br />
        <form onSubmit={handleReviews}>
          <input
            className="type"
            placeholder="Enter Training Type"
            onChange={(e) => setTrainingType(e.target.value)}
            required
          />{" "}
          <br />
          <textarea
            className="review"
            placeholder="Whats your feedback?"
            onChange={(e) => setReview(e.target.value)}
            required
          />
          {console.log("submit")}
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
