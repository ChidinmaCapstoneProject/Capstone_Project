import React, { useRef, useState, useEffect } from "react";
import { USER_REGEX, EMAIL_REGEX, PWD_REGEX } from "./RegExConstants";
import "./UserRegistration.css";
import { Link, Navigate } from "react-router-dom";
import { handleSubmit } from "./SubmitRegisterForm";
import FullName from "./FullName/FullName";
import UserEmail from "./UserEmail/UserEmail";
import Username from "./Username/Username";
import Password from "./Password/Password";
import ConfirmPwd from "./ConfirmPwd/ConfirmPwd";
import Classification from "./Classification/Classification";

export default function UserRegistration() {
  const userRef = useRef();
  const errRef = useRef();
  const initialState = {
    fName: "",
    fNameFocus: false,
    email: "",
    validEmail: false,
    emailFocus: false,
    username: "",
    validUsername: false,
    userFocus: false,
    classification: "",
  };
  const [userInfo, setUserInfo] = useState(initialState);

  const initialPwd = {
    pwd: "",
    validPwd: false,
    pwdFocus: false,
    matchPwd: "",
    validMatch: false,
    matchFocus: false,
  };
  const [userPwd, setUserPwd] = useState(initialPwd);

  //error or success states
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    userRef.current.focus();
  }, []);

  //validating the username and email
  useEffect(() => {
    setUserInfo((previousValue) => ({
      ...previousValue,
      validUsername: USER_REGEX.test(userInfo.username),
    }));

    setUserInfo((previousValue) => ({
      ...previousValue,
      validEmail: EMAIL_REGEX.test(userInfo.email),
    }));
  }, [userInfo.username, userInfo.email]);
  //validate password
  useEffect(() => {
    setUserPwd((previousValue) => ({
      ...previousValue,
      validPwd: PWD_REGEX.test(userPwd.pwd),
    }));

    setUserPwd((previousValue) => ({
      ...previousValue,
      validMatch: userPwd.pwd === userPwd.matchPwd,
    }));
  }, [userPwd.pwd, userPwd.matchPwd]);
  //clear error message when any of the states in the bracket changes
  useEffect(() => {
    setErrMsg("");
  }, [
    userInfo.username,
    userInfo.email,
    userPwd.pwd,
    userInfo.classification,
    userPwd.matchPwd,
  ]);
  if (success === true) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <div className="register-div">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Register</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault(); //!Important, prevents default action when submitting forms
            handleSubmit(userInfo, userPwd, setSuccess, setErrMsg, errRef);
          }}
        >
          <FullName userInfo={userInfo} setUserInfo={setUserInfo} />
          <UserEmail userInfo={userInfo} setUserInfo={setUserInfo} />
          <Username
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            userRef={userRef}
          />
          <Password userPwd={userPwd} setUserPwd={setUserPwd} />
          <ConfirmPwd userPwd={userPwd} setUserPwd={setUserPwd} />
          <Classification setUserInfo={setUserInfo} />

          <button
            disabled={
              !userInfo.validUsername ||
              !userPwd.validPwd ||
              !userPwd.validMatch
                ? true
                : false
            }
          >
            Sign Up
          </button>
        </form>
        <p>
          Already Registered?
          <br />
          <Link to="/login/">
            {" "}
            <button>Sign In</button>
          </Link>
        </p>
      </div>
    </>
  );
}
