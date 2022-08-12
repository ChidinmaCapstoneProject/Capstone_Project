import { createContext, useState } from "react";
import useLocalStorage from "../../Hooks/useLocalStorage";

const SocketContext = createContext({});

export const SocketTraining = ({ children }) => {
  const [socketTrainings, setSocketTrainings] = useLocalStorage('socketTrainings', []);


  return (
    <SocketContext.Provider
      value={{
       socketTrainings,
       setSocketTrainings
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
