import React from "react";

import { CalendarProps } from "./Calendar";

export const CalendarBoardMini: React.FC<CalendarProps> = ({
  today,
  events,
}) => {
  function getMonthDetails(year: number, month: number): [number, number] {
    const firstDay = new Date(year, month - 1, 1);
    const dayOfWeek = firstDay.getDay();

    const totalDays = new Date(year, month, 0).getDate();

    return [dayOfWeek, totalDays];
  }

  function eventsInDay(day: Date) {
    const todayEvents =
      events.get(
        `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`,
      ) ?? [];
    return (
      <>
        {todayEvents.map((event, index) => (
          <div
            className={`absolute flex items-center w-12 py-[2px] ml-[40px] ${
              index == 0 ? "mt-8" : "mt-4"
            } border-l-4 border-indigo-700 rounded-full bg-indigo-50`}
            key={`${day.getDay()}-${index}`}
          />
        ))}
      </>
    );
  }

  function calendarMonth(year: number, month: number) {
    const [startDay, totalDays] = getMonthDetails(year, month);
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    return (
      <tbody>
        {/* Create rows */}
        {Array.from({ length: Math.ceil((totalDays + startDay - 1) / 7) }).map(
          (_, weekIndex) => (
            <tr key={weekIndex}>
              {/* Create cells for each day */}
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const day =
                  daysArray[weekIndex * 7 + dayIndex - (startDay - 1)];
                return (
                  // td has class name pt-6 if weekIndex is 0
                  <td
                    className={`pt-6 ${weekIndex == 0 ? "pt-6" : ""}`}
                    key={dayIndex}
                  >
                    <div className="flex justify-center w-full px-2 py-2 cursor-pointer">
                      <p className="text-xs text-gray-600">{day}</p>
                      {day && eventsInDay(new Date(year, month - 1, day))}
                    </div>
                  </td>
                );
              })}
            </tr>
          ),
        )}
      </tbody>
    );
  }

  return (
    <div className="block mt-6 md:hidden">
      <div className="flex items-center justify-between w-full px-1 py-8 overflow-x-auto bg-white">
        <table className="w-full">
          <thead>
            <tr>
              {["Mn", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <th key={day}>
                  <div className="flex justify-center w-full">
                    <p className="text-sm font-medium text-center text-gray-600">
                      {day}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {calendarMonth(today.getFullYear(), today.getMonth() + 1)}
        </table>
      </div>
    </div>
  );
};
