import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserEmail({ userInfo, setUserInfo }) {
  return (
    <>
      <label htmlFor="email">
        Email:
        <FontAwesomeIcon
          icon={faCheck}
          className={userInfo.validEmail ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={
            userInfo.validEmail || !userInfo.email ? "hide" : "invalid"
          }
        />
      </label>
      <input
        type="text"
        id="email"
        autoComplete="off"
        onChange={(e) =>
          setUserInfo((previousValue) => ({
            ...previousValue,
            email: e.target.value.toLowerCase(),
          }))
        }
        value={userInfo.email}
        required
        aria-invalid={userInfo.email ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() =>
          setUserInfo((previousValue) => ({
            ...previousValue,
            emailFocus: true,
          }))
        }
        onBlur={() =>
          setUserInfo((previousValue) => ({
            ...previousValue,
            emailFocus: false,
          }))
        }
      />

      <p
        id="uidnote"
        className={
          userInfo.emailFocus && userInfo.email && !userInfo.validEmail
            ? "instructions"
            : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        e.g John@doe.com
      </p>
    </>
  );
}
