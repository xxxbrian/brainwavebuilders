import React from "react";

export type Event = {
  name: string;
  time: string;
};

export interface CalendarBoardProps {
  today: Date;
  events: Map<number, Event[]>;
}

export const CalendarBoard: React.FC<CalendarBoardProps> = ({
  today,
  events,
}) => {
  function getMonthDetails(year: number, month: number): [number, number] {
    const firstDay = new Date(year, month - 1, 1);
    const dayOfWeek = firstDay.getDay();

    const totalDays = new Date(year, month, 0).getDate();

    return [dayOfWeek, totalDays];
  }

  function eventsInDay(day: number) {
    const todayEvents = events.get(day) ?? [];
    console.log(todayEvents);
    return (
      <>
        {todayEvents.map((event, index) => (
          <div
            className={`absolute flex items-center gap-x-1 2xl:w-[20%] md:w-40 py-3 px-2 ml-[10px] ${
              index == 0 ? "lg:mt-[-115px]" : "lg:mt-[-60px] mt-[-50px]"
            } rounded bg-blue-50 xl:w-[20%] lg:w-[20%]`}
            key={`${day}-${index}`}
          >
            <div className="lg:w-2 lg:h-2 min-w-[8px] min-h-[8px] bg-blue-700 rounded-full lg:mt-[1px] mt-[-16px]" />
            <div tabIndex={0} className="ml-1">
              <p className="text-xs font-medium leading-normal text-blue-700">
                {event.name} <span className="ml-1">({event.time})</span>
              </p>
            </div>
          </div>
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
            <tr className="border-b border-gray-300" key={weekIndex}>
              {/* Create cells for each day */}
              {Array.from({ length: 7 }).map((_, dayIndex) => {
                const day =
                  daysArray[weekIndex * 7 + dayIndex - (startDay - 1)];
                return (
                  <td className="border-r border-gray-300" key={dayIndex}>
                    {day && (
                      <p className="pt-2 pb-32 pl-2 text-xs font-medium text-gray-600">
                        {day}
                      </p>
                    )}
                    {day && eventsInDay(day)}
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
    <div className="hidden w-full xl:overflow-x-hidden md:block">
      <table className="min-w-full bg-white">
        <thead className="items-center">
          <tr className="h-12 border border-gray-200 rounded-lg bg-gray-50">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <th className="px-10" key={day}>
                <p className="text-sm font-medium text-center text-gray-800 cursor-pointer">
                  {day}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        {calendarMonth(today.getFullYear(), today.getMonth() + 1)}
      </table>
    </div>
  );
};
