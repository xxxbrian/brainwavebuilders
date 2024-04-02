import React from "react";
import Image from "next/image";
import blueLine from "@/assets/blue_line.png";

// Define and export the StatsProps type
export type StatsProps = {
  course_in_progress: number;
  course_completed: number;
  task_finished: number;
};

// Update the component to accept StatsProps
export default function Stats(props: StatsProps) {
  return (
    <>
      <div className="flex flex-col font-bold">
        <h3 className="ml-3 text-2xl">Statistics</h3>
        <div className="flex flex-wrap mt-3 justify-between">
          {/* Course in progress */}
          <div className="flex flex-col m-1 rounded-xl border border-[#004E89] px-1 py-2">
            <p className="ml-2 text-lg text-blue-800 p-4 w-32">
              Courses In Progress
            </p>
            <div className="flex items-center justify-around">
              <Image alt="blueLine" src={blueLine} />
              <h2 className="text-5xl text-orange-400">
                {props.course_in_progress}
              </h2>
            </div>
          </div>
          {/* Course completed */}
          <div className="flex flex-col m-1 rounded-xl border border-[#004E89] px-1 py-2">
            <p className="ml-2 text-lg text-blue-800 p-4 w-32">
              Courses Completed
            </p>
            <div className="flex items-center justify-around">
              <Image alt="blueLine" src={blueLine} />
              <h2 className="text-5xl text-orange-400">
                {props.course_completed}
              </h2>
            </div>
          </div>
          {/* Task finished */}
          <div className="flex flex-col m-1 rounded-xl border border-[#004E89] px-1 py-2">
            <p className="ml-2 text-lg text-blue-800 p-4 w-32">
              Tasks Finished
            </p>
            <div className="flex items-center justify-around">
              <Image alt="blueLine" src={blueLine} />
              <h2 className="text-5xl text-orange-400">
                {props.task_finished}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
