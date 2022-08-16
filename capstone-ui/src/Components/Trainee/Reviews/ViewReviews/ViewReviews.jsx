import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import Rating from "@material-ui/lab/Rating";
import { format } from "timeago.js";
import { SOCKET_URL } from "../../../../Utils/URLConstants";
import { io } from "socket.io-client";
import "./ViewReviews.css";
const socket = io(SOCKET_URL);

export default function ViewReviews({ trainerName }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const response = await axios.get("/review");

      setReviews(
        response.data.filter((review) => {
          return review.trainerName === trainerName;
        })
      );
    }
    getReviews();
    socket.on("newReview", (review) => {
      getReviews();
    });
  }, [trainerName]);
  return (
    <div>
      Reviews
      {reviews?.length === 0 ? (
        <div>No Results</div>
      ) : (
        <div>
          {reviews.map((review, id) => {
            return (
              <div key={id}>
                <strong>{review.traineeName}</strong> <br />
                <Rating size="medium" value={Number(review?.rating)} readOnly />
                {format(review.date)}
                <h3>{review.trainingType}</h3>
                <p>{review.review}</p>
                <hr />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
