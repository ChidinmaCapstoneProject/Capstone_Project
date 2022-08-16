import React, { useEffect } from "react";
import { getAllTrainings } from "../../../Utils/DataManagement";
import { useState } from "react";
import useLocalStorage from "../../../Hooks/useLocalStorage";
import { AVAILABLE_TRAINERS_HEADER } from "../../../Utils/StringLiterals";
import {
  eachDayOfInterval,
  format,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  add,
  parse,
  startOfTomorrow,
} from "date-fns";
import ScheduledTraining from "./ScheduledTrainers/ScheduledTraining";
import { io } from "socket.io-client";
import NavBar from "../../NavBar/NavBar";
import "./FindTraining.css";
import { SOCKET_URL } from "../../../Utils/URLConstants";
import FindTrainingCalender from "./FindTrainingCalender";
const socket = io(SOCKET_URL);

export default function FindTraining() {
  let tommorow = startOfTomorrow();
  let [selectedDay, setSelectedDay] = useState(tommorow);
  let [currentMonth, setCurrentMonth] = useState(format(tommorow, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });
  function nextMonth() {
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  function previousMonth() {
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  const [allTrainings, setAllTrainings] = useLocalStorage("allTrainings", []);
  useEffect(() => {
    async function getTrainings() {
      setAllTrainings(await getAllTrainings());
    }
    getTrainings();
    socket.on("newTraining", (Training) => {
      getTrainings();
    });
    socket.on("deletedTraining", (id) => {
      getTrainings();
    });
  }, []);

  return (
    <>
      <NavBar />
      <div className="pt-16">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <FindTrainingCalender
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              days={days}
              nextMonth={nextMonth}
              previousMonth={previousMonth}
              firstDayCurrentMonth={firstDayCurrentMonth}
              allTrainings={allTrainings}
            />
            <section className="mt-12 md:mt-0 md:pl-14">
              <h2 className="font-semibold text-gray-900">
                {AVAILABLE_TRAINERS_HEADER}
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "MMMM dd, yyy")}
                </time>
              </h2>
              <ScheduledTraining selectedDay={selectedDay} />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
