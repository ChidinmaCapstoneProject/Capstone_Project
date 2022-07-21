import React, { useEffect, useState } from "react";
import axios from "../../../../api/axios";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import "./TrainerReview.css";

export default function ViewReviews({ trainerName }) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function getReviews() {
      const response = await axios.get("/review");
      console.log("response: ", response);
      setReviews(
        response.data.filter((review) => {
          return review.trainerName === trainerName;
        })
      );
    }
    getReviews();
  }, []);
  function handleRatings(rating) {
    while (rating > 0) {
      return <FontAwesomeIcon icon={faStar} size="lg" color="blue" />;
    }
    // const starsNo = Array(rating).fill(1);
    // console.log("starsNo: ", starsNo);

    // {
    //   starsNo.map((_, index) => {
    //     console.log("hi");
    //     return <FontAwesomeIcon icon={faStar} size="sm" color="blue" />;
    //   });
    // }
  }
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
                <h2>{review.traineeName}</h2>
                <h3>{review.trainingType}</h3>
                {review.date}
                {handleRatings(review.rating)}
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
