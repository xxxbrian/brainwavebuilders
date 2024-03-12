import React from "react";
//import Home from "../Images/Home.png";

export default function SideNav(props) {
  return (
    <>
      <aside class="fixed top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-200">
        <div class="h-full px-3 py-4 overflow-y-auto bg-white">
          <ul class="space-y-2 font-medium">
            <li>
              <a
                href="/src/pages/Dashboard"
                class="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400"
              >
                <img src="/Home.png" class="w-10 h-10" />
                <span class="ms-3 text-lg">Home</span>
              </a>
            </li>
            {props.displayType == "dash" && (
              <li>
                <a class="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400">
                  <img src="/Calendar.png" class="w-10 h-10" />
                  <span class="ms-3 text-lg">Calendar</span>
                </a>
              </li>
            )}
            {props.displayType == "dash" && (
              <li>
                <a class="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400">
                  <img src="/Tasks.png" class="w-10 h-10" />
                  <span class="ms-3 text-lg">Courses</span>
                </a>
              </li>
            )}
            {props.displayType == "course" && (
              <li>
                <a class="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400">
                  <img src="/Announcements.png" class="w-10 h-10" />
                  <span class="ms-3 text-lg">Announcements</span>
                </a>
              </li>
            )}
            {props.displayType == "course" && (
              <li>
                <a class="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400">
                  <img src="/Tasks.png" class="w-10 h-10" />
                  <span class="ms-3 text-lg">Tasks</span>
                </a>
              </li>
            )}
            {props.displayType == "course" && (
              <li>
                <a class="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400">
                  <img src="/My_Grades.png" class="w-10 h-10" />
                  <span class="ms-3 text-lg">My Grades</span>
                </a>
              </li>
            )}
            {props.displayType == "course" && (
              <li>
                <a class="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400">
                  <img src="/Course_Outlines.png" class="w-10 h-10" />
                  <span class="ms-3 text-lg">Course Outline</span>
                </a>
              </li>
            )}
            {props.displayType == "course" && (
              <li>
                <a class="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400">
                  <img src="/Class_Recordings.png" class="w-10 h-10" />
                  <span class="ms-3 text-lg">Class/Recordings</span>
                </a>
              </li>
            )}
            <li>
              <a class="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400">
                <img src="/Settings.png" class="w-10 h-10" />
                <span class="ms-3 text-lg">Settings</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
