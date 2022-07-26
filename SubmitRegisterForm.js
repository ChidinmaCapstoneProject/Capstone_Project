import axios from "../../api/axios";
const REGISTER_URL = "/register";

export async function handleSubmit ( userInfo, userPwd, setSuccess, setErrMsg,errRef) {
    const fName = userInfo.fName;
    const email = userInfo.email;
    const user = userInfo.username;
    const pwd = userPwd.pwd;
    const classification = userInfo.classification;
    try {
      const response = await axios.post(
        REGISTER_URL,

        JSON.stringify({ fName, email, user, pwd, classification }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username or Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };
