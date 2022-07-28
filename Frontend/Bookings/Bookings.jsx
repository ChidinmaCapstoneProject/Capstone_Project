import React from "react";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { getAllTrainings, getAllBookings } from "../../Utils/DataManagement";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  eachDayOfInterval,
  format,
  startOfWeek,
  startOfToday,
  endOfMonth,
  endOfWeek,
  add,
  parse,
  isEqual,
  isSameMonth,
  isToday,
  isSameDay,
  parseISO,
} from "date-fns";
import ViewTraineeBookings from "../Trainee/ViewTraineeBookings/ViewTraineeBookings";
import TrainerBookedSessions from "../Trainer/TrainerBookedSessions/TrainerBookedSessions";
import NavBar from "../NavBar/NavBar";

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

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      {chooseClass === "Trainee" ? <NavBar /> : null}
      <div className="pt-16">
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                  {format(firstDayCurrentMonth, "MMMM yyyy")}
                </h2>
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx > 6 && "border-t border-gray-200",
                      dayIdx === 0,
                      "py-1.5"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && "text-white",
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "text-red-500",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-900",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400",
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-red-500",
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          "bg-gray-900",
                        !isEqual(day, selectedDay) && "hover:bg-gray-200",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          "font-semibold",
                        "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d")}
                      </time>
                    </button>
                    <div className="w-1 h-1 mx-auto mt-1">
                      {found?.some((each) =>
                        isSameDay(parseISO(each.day), day)
                      ) && (
                        <div className="w-1 h-1 rounded-full bg-green-500"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <section className="mt-12 md:mt-0 md:pl-14">
              <h2 className="font-semibold text-gray-900">
                My Appointments for{" "}
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
