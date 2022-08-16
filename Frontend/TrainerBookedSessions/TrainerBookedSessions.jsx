import React, { useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { getAllTrainings } from "../../../Utils/DataManagement";
import { useEffect, useContext } from "react";
import { parseISO, isSameDay, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { NO_APPOINTMENTS } from "../../../Utils/StringLiterals";

export default function TrainerBookedSessions({ selectedDay }) {
  const [trainings, setTrainings] = useState([]);
  const { userName } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const allTrainings = async () => {
      const response = await getAllTrainings();

      setTrainings(
        response.filter((each) => {
          return (
            isSameDay(parseISO(each?.day), selectedDay) &&
            each.fullname === userName
          );
        })
      );
    };
    allTrainings();
  }, [selectedDay]);
  const handleClick = (training) => {
    navigate("/MoreInfo", {
      state: { selectedDay: selectedDay, training: training },
    });
  };
  return (
    <div>
      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {trainings.length > 0 ? (
          trainings.map((training, id) => (
            <li
              key={id}
              className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
              onClick={() => handleClick(training)}
            >
              <div className="flex-auto">
                <p className="text-gray-900"> {training.trainingType}</p>
                <p className="mt-0.5">
                  {format(parseISO(training.startTime), "h:mm a")} -{" "}
                  {format(parseISO(training.endTime), "h:mm a")}
                </p>
              </div>
              <p className="mt-0.2 text-gray-400">Click For More Info</p>
            </li>
          ))
        ) : (
          <p>{NO_APPOINTMENTS}</p>
        )}
      </ol>
    </div>
  );
}
