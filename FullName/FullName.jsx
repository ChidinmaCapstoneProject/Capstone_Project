import React from "react";

export default function FullName({ userInfo, setUserInfo }) {
  return (
    <>
      <label htmlFor="fullname">Full Name:</label>
      <input
        type="text"
        id="fullname"
        autoComplete="off"
        onChange={(e) =>
          setUserInfo((previousValue) => ({
            ...previousValue,
            fName: e.target.value.toLowerCase(),
          }))
        }
        value={userInfo.fName}
        required
      />
    </>
  );
}
