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
      <div className="flex flex-col font-bold min-w-[616px]">
        <h3 className="ml-3 text-2xl text-black">Statistics</h3>
        <div className="flex flex-wrap mt-3">
          {/* Course in progress */}
          <div className="flex flex-col m-1 rounded-xl border border-[#004E89] w-[192px] h-[203px]">
            <p className="ml-4 text-lg text-blue-800 p-4 w-32">
              Courses In Progress
            </p>
            <div className="flex items-center">
              <Image alt="blueLine" className="ml-5" src={blueLine} />
              <h2 className="ml-10 text-5xl text-orange-400">
                {props.course_in_progress}
              </h2>
            </div>
          </div>
          {/* Course completed */}
          <div className="flex flex-col m-1 rounded-xl border border-[#004E89] w-[192px] h-[203px]">
            <p className="ml-4 text-lg text-blue-800 p-4 w-32">
              Courses Completed
            </p>
            <div className="flex items-center">
              <Image alt="blueLine" className="ml-5" src={blueLine} />
              <h2 className="ml-10 text-5xl text-orange-400">
                {props.course_completed}
              </h2>
            </div>
          </div>
          {/* Task finished */}
          <div className="flex flex-col m-1 rounded-xl border border-[#004E89] w-[192px] h-[203px]">
            <p className="ml-4 text-lg text-blue-800 p-4 w-32">
              Tasks Finished
            </p>
            <div className="flex items-center">
              <Image alt="blueLine" className="ml-5" src={blueLine} />
              <h2 className="ml-10 text-5xl text-orange-400">
                {props.task_finished}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
