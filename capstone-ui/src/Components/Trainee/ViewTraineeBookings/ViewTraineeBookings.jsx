import React from "react";
import { useContext, useEffect, useState } from "react";
import { getAllBookings } from "../../../Utils/DataManagement";
import AuthContext from "../../context/AuthProvider";
import { isSameDay, parseISO, format } from "date-fns";
import { NO_APPOINTMENTS } from "../../../Utils/StringLiterals";
import "./ViewTraineeBookings.css";
import { SOCKET_URL } from "../../../Utils/URLConstants";
import { io } from "socket.io-client";
const socket = io(SOCKET_URL);

export default function ViewTraineeBookings({ selectedDay }) {
  const { userName } = useContext(AuthContext);
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    const allBookings = async () => {
      const response = await getAllBookings();

      setMyBookings(
        response.data.filter((each) => {
          return (
            isSameDay(parseISO(each?.day), selectedDay) &&
            each.traineeName === userName
          );
        })
      );
    };
    allBookings();
    socket.on("updateTraining", (update) => {
      allBookings();
    });
    socket.on("deletedTraining", (id) => {
      allBookings();
    });
  }, [selectedDay]);

  return (
    <div>
      <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
        {myBookings.length > 0 ? (
          myBookings.map((each, id) => (
            <li
              key={id}
              className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
            >
              <div className="flex-auto">
                <h1 className="text-gray-900">{each.trainingType}</h1> by{" "}
                {each.trainerName}
              </div>
              <p className="mt-0.2 text-gray-400">
                {format(parseISO(each.startTime), "h:mm a")} -{" "}
                {format(parseISO(each.endTime), "h:mm a")}
              </p>
            </li>
          ))
        ) : (
          <p>{NO_APPOINTMENTS}</p>
        )}
      </ol>
    </div>
  );
}
