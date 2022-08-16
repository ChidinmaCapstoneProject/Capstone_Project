import React, { useEffect } from "react";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "../../../api/axios";
import ViewReviews from "./ViewReviews/ViewReviews";
import { Grid } from "@material-ui/core";
import "./Reviews.css";

const reviewsUrl = "/review";

export default function Review({ trainings, traineeName, trainerName }) {
  const [training, setTraining] = useState(null);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [trainingType, setTrainingType] = useState("");
  const [review, setReview] = useState("");
  const date = new Date().toLocaleString("en-us", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  useEffect(() => {
    setTraining(
      trainings.find((train) => {
        return train.fullname === trainerName;
      })
    );
  });
  const handleClick = (value) => {
    setCurrentValue(value);
  };
  const handleMouseOver = (value) => {
    setHoverValue(value);
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const starsNo = Array(5).fill(0);
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
      <Grid container spacing={3} style={{ width: "100%", display: "flex" }}>
        <Grid item xs={12} md={8}>
          <div className="view-reviews">
            <ViewReviews trainerName={training?.fullname} />
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div>
            <p>Write A Review for {training?.fullname}</p>

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
                  style={{ display: "inline" }}
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
              <button>Submit</button>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
