import React from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Password({ userPwd, setUserPwd }) {
  return (
    <>
      <label htmlFor="password">
        Password:
        <FontAwesomeIcon
          icon={faCheck}
          className={userPwd.validPwd ? "valid" : "hide"}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className={userPwd.validPwd || !userPwd.pwd ? "hide" : "invalid"}
        />
        <br />
      </label>
      <input
        type="password"
        id="password"
        onChange={(e) =>
          setUserPwd((previousValue) => ({
            ...previousValue,
            pwd: e.target.value,
          }))
        }
        required
        aria-invalid={userPwd.validPwd ? "false" : "true"}
        aria-describedby="pwdnote"
        onFocus={() =>
          setUserPwd((previousValue) => ({
            ...previousValue,
            pwdFocus: true,
          }))
        }
        onBlur={() =>
          setUserPwd((previousValue) => ({
            ...previousValue,
            pwdFocus: false,
          }))
        }
      />
      <p
        id="pwdnote"
        className={
          userPwd.pwdFocus && userPwd.pwd && !userPwd.validPwd
            ? "instructions"
            : "offscreen"
        }
      >
        <FontAwesomeIcon icon={faInfoCircle} />
        8 to 24 characters.
        <br />
        Must include uppercase and lowercase letters, a number and a special
        character
        <br />
        Allowed special characters:
        <span aria-label="exclamation mark">!</span>
        <span aria-label="at symbol">@</span>
        <span aria-label="Hashtag">#</span>
        <span aria-label="dollar sign">$</span>
        <span aria-label="percent sign">%</span>
      </p>
    </>
  );
}
