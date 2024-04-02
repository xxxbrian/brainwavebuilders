import React from "react";

import { CalendarBoardProps } from "./CalendarBoard";
import { type Event } from "./CalendarBoard";

export const UpcomingEvents: React.FC<CalendarBoardProps> = ({
  today,
  events,
}) => {
  // filter events that are after yesterday
  const upcomingEvents = Array.from(events).filter(
    ([date]) => new Date(date) >= today,
  );
  return (
    <div className="px-4 py-4 bg-white lg:min-w-[260px] w-full">
      <p className="mb-2 text-sm font-semibold text-gray-800">
        Upcoming Events
      </p>
      <p className="text-xs text-gray-600">Don’t Miss Scheduled Events</p>
      {upcomingEvents.map(([date, events]) =>
        events.map((event, index) => (
          <div
            key={`${date}-${index}`}
            className="px-4 py-4 mt-4 border border-gray-200 rounded-sm"
          >
            <div className="flex justify-between">
              <div className="flex gap-x-2">
                <div className="w-2 h-2 bg-indigo-700 rounded-full mt-[2px]" />
                <p className="text-xs font-medium leading-3 text-gray-800">
                  {new Date(date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="p-1 text-xs font-medium leading-3 text-indigo-700 rounded-sm bg-indigo-50">
                {event.time}
              </p>
            </div>
            <p className="text-xs leading-3 text-gray-600">{event.name}</p>
          </div>
        )),
      )}
    </div>
  );
};
