import React from "react";

export default function Activity(props) {
  return (
    <>
      <div class="flex flex-col ml-1">
        <h3 class="ml-3 text-2xl text-black">Activity</h3>
        <div class="flex border border-blue-800 rounded-xl mt-1">
          <div class="ml-3 px-3 flex flex-col mx-auto h-40 justify-end mb-4">
            <div class="mx-auto bg-blue-100 rounded-xl w-6 h-12"></div>
            <p class="mx-auto">Mon</p>
          </div>
          <div class="px-3 flex flex-col mx-auto h-40 justify-end mb-4">
            <div class="mx-auto bg-blue-100 rounded-xl w-6 h-16"></div>
            <p class="mx-auto">Tue</p>
          </div>
          <div class="px-3 flex flex-col mx-auto h-40 justify-end mb-4">
            <div class="mx-auto bg-blue-100 rounded-xl w-6 h-8"></div>
            <p class="mx-auto">Wed</p>
          </div>
          <div class="px-3 flex flex-col mx-auto h-40 justify-end mb-4">
            <div class="mx-auto bg-blue-100 rounded-xl w-6 h-20"></div>
            <p class="mx-auto">Thur</p>
          </div>
          <div class="px-3 flex flex-col mx-auto h-40 justify-end mb-4">
            <div class="mx-auto bg-blue-100 rounded-xl w-6 h-4"></div>
            <p class="mx-auto">Fri</p>
          </div>
          <div class="px-3 flex flex-col mx-auto h-40 justify-end mb-4">
            <div class="mx-auto bg-blue-100 rounded-xl w-6 h-24"></div>
            <p class="mx-auto">Sat</p>
          </div>
          <div class="mr-3 px-3 flex flex-col mx-auto h-40 justify-end mb-4">
            <div class="mx-auto bg-blue-100 rounded-xl w-6 h-28"></div>
            <p class="mx-auto">Sun</p>
          </div>
        </div>
      </div>
    </>
  );
}
