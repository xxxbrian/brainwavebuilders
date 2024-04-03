import {
  type Event,
  Calendar as CalendarComponent,
} from "@/components/calendar/Calendar";
import { PageFrame } from "@/components/structural/PageFrame";

import React from "react";

export const Calendar: React.FC = () => {
  const mockTime = new Date("2024-03-01");
  const mockEvents = () => {
    const events = new Map<string, Event[]>();
    for (let i = 1; i <= 31; i++) {
      const key = `${mockTime.getFullYear()}-${mockTime.getMonth() + 1}-${i}`;
      if (i % 9 === 0) {
        events.set(key, [
          {
            name: "CS3900 Meeting",
            time: "3 PM - 5 PM",
            // random in ["lecture", "tutorial", "assignment", "exam"]
            type:
              ["lecture", "tutorial", "assignment", "exam"].sort(
                () => Math.random() - 0.5,
              )[0] ?? "assignment",
          },
          {
            name: "Assignment 1 Due",
            time: "10 AM - 11 AM",
            type:
              ["lecture", "tutorial", "assignment", "exam"].sort(
                () => Math.random() - 0.5,
              )[0] ?? "exam",
          },
        ]);
      } else {
        events.set(key, []);
      }
    }
    return events;
  };

  return (
    <PageFrame title="Calendar" standardWidth={false}>
      <div className="flex flex-col gap-4">
        <CalendarComponent today={mockTime} events={mockEvents()} />
      </div>
    </PageFrame>
  );
};

export default Calendar;
