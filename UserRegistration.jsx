import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { emailRegex } from "./RegExConstants";
import "./UserRegistration.css";
import { Link } from "react-router-dom";

export default function UserRegistration() {
  //user registration.
  const userRef = useRef();
  const errRef = useRef();
  const [userInfo, setUserInfo] = useState({
    email: "",
    validEmail: false,
    emailFocus: false,
  });
  useEffect(() => {
    userRef.current.focus();
  }, []);
  //validating the email
  useEffect(() => {
    setUserInfo({ validEmail: emailRegex.test(userInfo.email) });
  }, [userInfo.email]);

  //clear error message when any of the states in the bracket changes
  useEffect(() => {
    setErrMsg("");
  }, [userInfo.email]);
  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <Link to="/login/">
            <button>Sign In</button>
          </Link>
        </section>
      ) : (
        <div className="register-div">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form>
            {/* Email */}
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
                setUserInfo({ email: e.target.value.toLowerCase() })
              }
              value={userInfo.email}
              required
              aria-invalid={userInfo.validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserInfo({ emailFocus: true })}
              onBlur={() => setUserInfo({ emailFocus: false })}
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
            <button>Sign Up</button>
            <p>
              Already Registered?
              <br />
              <button>Sign In</button>
            </p>
          </form>
        </div>
      )}
    </>
  );
}
