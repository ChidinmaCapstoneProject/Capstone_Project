import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import {
  format,
  isEqual,
  isSameMonth,
  isTomorrow,
  isSameDay,
  parseISO,
  isAfter,
  isToday,
} from "date-fns";

export default function FindTrainingCalender({
  selectedDay,
  setSelectedDay,
  days,
  nextMonth,
  previousMonth,
  firstDayCurrentMonth,
  allTrainings,
}) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
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
              disabled={isAfter(day, new Date()) === false}
              onClick={() => setSelectedDay(day)}
              className={classNames(
                isEqual(day, selectedDay) && "text-white",
                !isEqual(day, selectedDay) && isTomorrow(day) && "text-red-400",
                !isEqual(day, selectedDay) &&
                  !isTomorrow(day) &&
                  isSameMonth(day, firstDayCurrentMonth) &&
                  "text-gray-900",
                !isEqual(day, selectedDay) &&
                  !isTomorrow(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  "text-gray-500",
                isToday(day) && "bg-red-300",
                isEqual(day, selectedDay) && isTomorrow(day) && "bg-blue-500",
                isEqual(day, selectedDay) && !isTomorrow(day) && "bg-gray-900",
                !isEqual(day, selectedDay) && "hover:bg-gray-200",
                !isAfter(day, new Date()) && "text-gray-400",
                (isEqual(day, selectedDay) || isTomorrow(day)) &&
                  "font-semibold",
                "mx-auto flex h-8 w-8 items-center justify-center rounded-full"
              )}
            >
              <time dateTime={format(day, "yyyy-MM-dd")}>
                {format(day, "d")}
              </time>
            </button>

            <div className="w-1 h-1 mx-auto mt-1">
              {allTrainings?.some(
                (training) =>
                  isSameDay(parseISO(training.day), day) &&
                  !isSameDay(parseISO(training.day), new Date()) &&
                  isAfter(parseISO(training.day), new Date())
              ) && <div className="w-1 h-1 rounded-full bg-green-500"></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
