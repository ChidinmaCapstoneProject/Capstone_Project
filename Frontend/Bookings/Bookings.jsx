import React from "react";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { getAllTrainings, getAllBookings } from "../../Utils/DataManagement";
import {
  eachDayOfInterval,
  format,
  startOfWeek,
  startOfToday,
  endOfMonth,
  endOfWeek,
  add,
  parse,
} from "date-fns";
import ViewTraineeBookings from "../Trainee/ViewTraineeBookings/ViewTraineeBookings";
import TrainerBookedSessions from "../Trainer/TrainerBookedSessions/TrainerBookedSessions";
import BookingsCalender from "./BookingsCalender";
import NavBar from "../NavBar/NavBar";
import { APPOINTMENTS_HEADER } from "../../Utils/StringLiterals";

import "./Bookings.css";

export default function FindTraining() {
  const { chooseClass, userName } = useContext(AuthContext);
  const [match, setMatch] = useState([]);
  const [found, setFound] = useState([]);

  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
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
  useEffect(() => {
    if (chooseClass === "Trainer") {
      async function Training() {
        setMatch(await getAllTrainings());
        setFound(
          match?.filter((each) => {
            return each.fullname === userName;
          })
        );
      }
      Training();
    }
  }, [match]);

  useEffect(() => {
    if (chooseClass === "Trainee") {
      async function Booking() {
        setMatch(await getAllBookings());
        setFound(
          match.data.filter((each) => {
            return each.traineeName === userName;
          })
        );
      }
      Booking();
    }
  }, [match]);
  return (
    <>
      {chooseClass === "Trainee" ? <NavBar /> : null}
      <div className="pt-16">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <BookingsCalender
              found={found}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              days={days}
              nextMonth={nextMonth}
              previousMonth={previousMonth}
              firstDayCurrentMonth={firstDayCurrentMonth}
            />
            <section className="mt-12 md:mt-0 md:pl-14">
              <h2 className="font-semibold text-gray-900">
                {APPOINTMENTS_HEADER}
                <time dateTime={format(selectedDay, "yyyy-MM-dd")}>
                  {format(selectedDay, "MMMM dd, yyy")}
                </time>
              </h2>
              {chooseClass === "Trainee" ? (
                <ViewTraineeBookings
                  selectedDay={selectedDay}
                ></ViewTraineeBookings>
              ) : (
                <TrainerBookedSessions
                  selectedDay={selectedDay}
                ></TrainerBookedSessions>
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
