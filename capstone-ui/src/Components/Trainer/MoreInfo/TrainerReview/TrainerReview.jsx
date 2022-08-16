import React, { useEffect, useState } from "react";
import { getAllReviews } from "../../../../Utils/DataManagement";
import useLocalStorage from "../../../../Hooks/useLocalStorage";
import Rating from "@material-ui/lab/Rating";
import { format } from "timeago.js";
import "./TrainerReview.css";

export default function ViewReviews({ trainerName }) {
  const [reviews, setReviews] = useState([]);
  const [initailReview, setInitialReview] = useLocalStorage(
    "initialReview",
    []
  );
  useEffect(() => {
    async function getReviews() {
      setInitialReview(await getAllReviews());
      setReviews(
        initailReview.data.filter((review) => {
          return review.trainerName === trainerName;
        })
      );
    }
    getReviews();
  }, []);
  return (
    <div>
      {reviews?.length === 0 ? (
        <div>No Reviews</div>
      ) : (
        <div>
          {reviews.map((review, id) => {
            return (
              <div key={id}>
                <strong>{review.traineeName}</strong> <br />
                <Rating size="medium" value={Number(review?.rating)} readOnly />
                {format(review.date)}
                <br />
                <h3>Training Type: {review.trainingType}</h3>
                <p>Review: {review.review}</p>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
