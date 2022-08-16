import { useRef, useState, useEffect, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import axios from "../../api/axios";
import useLocalStorage from "../../Hooks/useLocalStorage";
import "./Login.css";

const LOGIN_URL = "/auth";
export default function Login() {
  const { setAuth, setUserName, setUserId, setChooseClass, setTraineeEmail } =
    useContext(AuthContext);

  const userRef = useRef();

  const errRef = useRef();
  const navigate = useNavigate();

  //fields
  const [user, setUser] = useLocalStorage("user", "");
  const [pwd, setPwd] = useLocalStorage("pwd", "");
  const [classification, setClassification] = useLocalStorage(
    "classification",
    ""
  );
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, classification]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd, classification }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const username = user;
      const ALL_USERS = await axios.get("/register");
      let userObj = ALL_USERS?.data.filter((userlist) => {
        return (
          userlist.username === username &&
          userlist.classification === classification
        );
      });
      userObj.map((eachuser) => {
        setUserName(eachuser.fullname);
        setChooseClass(eachuser.classification);
        setTraineeEmail(eachuser.email);
        setUserId(eachuser._id);
      });

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, classification, roles, accessToken });

      navigate("/Home");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password or Classification");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className="login-div">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <p>Which account would you like to login to ? </p>
          <input
            type="radio"
            name="classification"
            onChange={(e) => setClassification("Trainer")}
            required
          />
          <label htmlFor="trainer">Trainer</label>
          <input
            type="radio"
            name="classification"
            onChange={(e) => setClassification("Trainee")}
            required
          />
          <label htmlFor="trainee">Trainee</label>
          <button>Sign In</button>
        </form>
        <p>
          Need an Account?
          <Link to="/">Sign Up</Link>
        </p>
      </div>
    </>
  );
}
