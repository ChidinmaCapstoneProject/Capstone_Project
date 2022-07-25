import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserName({ userPwd, setUserPwd }) {
  return (
    <>
      <label htmlFor="confirm_pwd">
        Confirm Password:
        <FontAwesomeIcon
          icon={faCheck}
          className={userPwd.validMatch && userPwd.matchPwd ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={
            userPwd.validMatch || !userPwd.matchPwd ? "hide" : "invalid"
          }
        />
        <br />
      </label>
      <input
        type="password"
        id="confirm_pwd"
        onChange={(e) =>
          setUserPwd((previousValue) => ({
            ...previousValue,
            matchPwd: e.target.value,
          }))
        }
        required
        aria-invalid={userPwd.validMatch ? "false" : "true"}
        aria-describedby="confirmnote"
        onFocus={() =>
          setUserPwd((previousValue) => ({
            ...previousValue,
            matchFocus: true,
          }))
        }
        onBlur={() =>
          setUserPwd((previousValue) => ({
            ...previousValue,
            matchFocus: false,
          }))
        }
      />
      <p
        id="confirmnote"
        className={
          userPwd.matchFocus && !userPwd.validMatch
            ? "instructions"
            : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        Must match the password input field.
      </p>
    </>
  );
}
