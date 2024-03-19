import React from "react";

// Define and export the ActivityProps type
export type ActivityProps = {
  Mon: number;
  Tues: number;
  Wed: number;
  Thurs: number;
  Fri: number;
  Sat: number;
  Sun: number;
  currentDay: string; // Should be one of the weekdays
};

// The Activity component now takes ActivityProps as props
export default function Activity(props: ActivityProps) {
  // Calculate the height for the bars based on the hours
  const maxHeight = 8; // Maximum height of a bar
  const barHeights = {
    Mon: (props.Mon / 12) * maxHeight,
    Tues: (props.Tues / 12) * maxHeight,
    Wed: (props.Wed / 12) * maxHeight,
    Thurs: (props.Thurs / 12) * maxHeight,
    Fri: (props.Fri / 12) * maxHeight,
    Sat: (props.Sat / 12) * maxHeight,
    Sun: (props.Sun / 12) * maxHeight,
  };

  // Function to determine the bar color
  const barColor = (day: string) => {
    return props.currentDay === day ? "bg-[#004E89]" : "bg-blue-200";
  };

  return (
    <div className="flex flex-col ml-1 font-bold">
      <h3 className="ml-3 text-2xl">Activity</h3>
      <div className="flex border border-[#004E89] rounded-lg mt-2 px-5">
        {Object.entries(barHeights).map(([day, height]) => (
          <div
            key={day}
            className="px-3 py-1.5 flex flex-col mx-auto justify-end"
          >
            <div
              style={{ height: `${height}rem` }}
              className={`${barColor(day)} w-8 rounded-xl`}
            ></div>
            <p className="mx-auto mt-1">{day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
