import { createContext, useState } from "react";
import useLocalStorage from "../../Hooks/useLocalStorage";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [userName, setUserName] = useLocalStorage("userName", "");
  const [userId, setUserId] = useLocalStorage("userId", "");
  const [chooseClass, setChooseClass] = useLocalStorage("chooseClass", "");
  const [traineeEmail, setTraineeEmail] = useLocalStorage("traineeEmail", "");

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        userName,
        setUserName,
        chooseClass,
        setChooseClass,
        traineeEmail,
        setTraineeEmail,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
