import React from "react";

export default function Classification({ setUserInfo }) {
  return (
    <>
      <p>What type of account would you like to create</p>
      <label htmlFor="trainer">Trainer</label>
      <input
        type="radio"
        name="classification"
        onChange={() =>
          setUserInfo((previousValue) => ({
            ...previousValue,
            classification: "Trainer",
          }))
        }
        required
      />
      <label htmlFor="trainee">Trainee</label>
      <input
        type="radio"
        name="classification"
        onChange={(e) =>
          setUserInfo((previousValue) => ({
            ...previousValue,
            classification: "Trainee",
          }))
        }
        required
      />
    </>
  );
}
