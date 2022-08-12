import React, { useState, useContext } from "react";
import useLocalStorage from "../../../../Hooks/useLocalStorage";
import { getAllTrainings } from "../../../../Utils/DataManagement";
import { SOCKET_URL } from "../../../../Utils/URLConstants";
import { useEffect } from "react";
import { parseISO, isSameDay } from "date-fns";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { NO_TRAINERS } from "../../../../Utils/StringLiterals";
import SocketContext from "../../../context/SocketTraining";
const socket = io(SOCKET_URL);

export default function ScheduledTraining({ selectedDay }) {
  const [initialTrainings, setInitialTrainings] = useLocalStorage(
    "initialTrainings",
    []
  );
  const { setSocketTrainings } = useContext(SocketContext);
  const [selectedDayTrainings, setSelectedDayTrainings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTrainings = async () => {
      setInitialTrainings(await getAllTrainings());
    };
    socket.on("newTraining", (Training) => {
      getTrainings();
    });
    socket.on("deletedTraining", (id) => {
      getTrainings();
    });
    socket.on("updateTraining", () => {
      getTrainings();
    });
    getTrainings();
  }, []);

  useEffect(() => {
    const allTrainings = () => {
      const filtered = initialTrainings.filter((each) => {
        return isSameDay(parseISO(each?.day), selectedDay);
      });
      setSocketTrainings(filtered);
      setSelectedDayTrainings(
        filtered.filter(
          (ele, ind) => ind === filtered.findIndex((elem) => elem.Id === ele.Id)
        )
      );
    };
    allTrainings();
  }, [selectedDay, initialTrainings]);

  const handleClick = (trainerName, Id) => {
    navigate("/TrainerInfo", {
      state: { trainerName: trainerName, trainerId: Id },
    });
  };
  return (
    <div>
      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {selectedDayTrainings?.length > 0 ? (
          selectedDayTrainings.map((each, id) => (
            <li
              key={id}
              className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
              onClick={() => handleClick(each.fullname, each.Id)}
            >
              <div className="flex-auto">
                <p className="text-gray-900"> {each.fullname}</p>
              </div>
              <p className="mt-0.2 text-gray-400">Click For More Info</p>
            </li>
          ))
        ) : (
          <p>{NO_TRAINERS}</p>
        )}
      </ol>
    </div>
  );
}
