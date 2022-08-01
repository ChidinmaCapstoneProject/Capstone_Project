import React from "react";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import AuthContext from "../../context/AuthProvider";
import { getAllBookings } from "../../../Utils/DataManagement";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import NavBar from "../../NavBar/NavBar";
import { parseISO, isSameDay, format } from "date-fns";
import { NO_BOOKINGS, PEOPLE_WHO_BOOKED } from "../../../Utils/StringLiterals";
import "./MoreInfo.css";

export default function MoreInfo({ booking }) {
  const location = useLocation();
  const [selectedDay, setSelectedDay] = useState(location?.state?.selectedDay);
  const [training, setTraining] = useState(location?.state?.training);
  const { userName } = useContext(AuthContext);
  const [whoBooked, setWhoBooked] = useLocalStorage("whoBooked", []);

  useEffect(() => {
    async function fetchedAllBookings() {
      const response = await getAllBookings();
      setWhoBooked(
        response.data.filter((each) => {
          return (
            each.trainerName === userName &&
            each.trainingType === training.trainingType &&
            each.startTime === training.startTime &&
            isSameDay(parseISO(each?.day), selectedDay)
          );
        })
      );
    }

    fetchedAllBookings();
  }, []);
  return (
    <>
      <NavBar />
      <div>
        <h1>{training.trainingType}</h1>
        <p>Description: {training.description}</p>
        <p>
          Time: {format(parseISO(training.startTime), "h:mm a")} -{" "}
          {format(parseISO(training.endTime), "h:mm a")}
        </p>
        <p>{PEOPLE_WHO_BOOKED}</p>
        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
          {whoBooked.length > 0 ? (
            whoBooked.map((each, id) => (
              <li
                key={id}
                className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100"
              >
                <div>
                  <p className="text-gray-900"> {each.traineeName}</p>
                  <p>{each.traineeEmail}</p>
                  <hr />
                </div>
              </li>
            ))
          ) : (
            <p>{NO_BOOKINGS}</p>
          )}
        </ol>
      </div>
    </>
  );
}
