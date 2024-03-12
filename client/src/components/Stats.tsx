import React from "react";

export default function Stats(props) {
  return (
    <>
      <div class="flex flex-col">
        <h3 class="ml-3 text-2xl text-black">Statistics</h3>
        <div class="flex flex-wrap">
          <div class="flex flex-col m-1 rounded-xl border border-blue-800 w-44 h-44">
            <p class="ml-4 text-lg text-blue-800 w-32 p-5">
              Courses In Progress
            </p>
            <div class="flex items-center">
              <img class="ml-5" src="/blue_line.png" />
              <h2 class="ml-10 text-5xl text-orange-400">05</h2>
            </div>
          </div>
          <div class="flex flex-col m-1 rounded-xl border border-blue-800 w-44 h-44">
            <p class="ml-4 text-lg text-blue-800 w-32 p-5">Courses Completed</p>
            <div class="flex items-center">
              <img class="ml-5" src="/blue_line.png" />
              <h2 class="ml-10 text-5xl text-orange-400">03</h2>
            </div>
          </div>
          <div class="flex flex-col m-1 rounded-xl border border-blue-800 w-44 h-44">
            <p class="ml-4 text-lg text-blue-800 w-32 p-5">Tasks Finished</p>
            <div class="flex items-center">
              <img class="ml-5" src="/blue_line.png" />
              <h2 class="ml-10 text-5xl text-orange-400">14</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
