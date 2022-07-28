import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserName({ userInfo, setUserInfo, userRef }) {
  return (
    <>
      <label htmlFor="username">
        Username:
        <FontAwesomeIcon
          icon={faCheck}
          className={userInfo.validUsername ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={
            userInfo.validUsername || !userInfo.username ? "hide" : "invalid"
          }
        />
        <br />
      </label>
      <input
        type="text"
        id="username"
        ref={userRef}
        autoComplete="off"
        onChange={(e) =>
          setUserInfo((previousValue) => ({
            ...previousValue,
            username: e.target.value.toLowerCase(),
          }))
        }
        value={userInfo.username}
        required
        aria-invalid={userInfo.validUsername ? "false" : "true"}
        aria-describedby="uidnote"
        onFocus={() =>
          setUserInfo((previousValue) => ({
            ...previousValue,
            userFocus: true,
          }))
        }
        onBlur={() =>
          setUserInfo((previousValue) => ({
            ...previousValue,
            userFocus: false,
          }))
        }
      />

      <p
        id="uidnote"
        className={
          userInfo.userFocus && userInfo.username && !userInfo.validUsername
            ? "instructions"
            : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        4 to 24 characters. <br />
        Must begin with a letter. <br />
        Letters, numbers, underscores, hyphens are allowed.
      </p>
    </>
  );
}
