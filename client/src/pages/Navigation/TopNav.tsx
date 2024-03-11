import React from "react";

const handleCreateClass = () => {};

const handleJoinClass = () => {};

function TopNavDashboard(name = "") {
  return (
    <>
      <div class="flex items-center">
        <div class="flex flex-col">
          <h3 class="pl-10 text-blue-800">Dashboard</h3>
          <h2 class="text-2xl pl-10 text-blue-800">
            {name == ""
              ? "Welcome to Brainwaves!"
              : "Let's Get Learning " + name + "!"}
          </h2>
        </div>
        <div class="flex absolute top-auto right-60 items-center">
          <button
            onClick={handleCreateClass}
            class="bg-gray-300 text-grey-800 hover:text-white rounded hover:bg-gray-600 ml-3 w-32 h-8 text-lg"
          >
            Create Class
          </button>
          <button
            onClick={handleJoinClass}
            class="bg-blue-500 text-white rounded hover:bg-blue-800 ml-3 w-32 h-8 text-lg"
          >
            Join Class
          </button>
        </div>
      </div>
    </>
  );
}

function TopNavCourse(courseCode = "", courseName) {
  return (
    <>
      <div class="flex items-center">
        <div class="flex items-center">
          <img src="/Course_Logo.png" class="m-3 ml-5 w-8 h-8" />
          <h2 class="text-2xl text-black">
            {courseCode == "" ? "Error" : courseCode}
          </h2>
          <h2 class="text-2xl px-3 text-black"> : </h2>
          <h2 class="text-2xl text-black">
            {courseCode == "" ? "Course Details Not Found" : courseName}
          </h2>
        </div>
      </div>
    </>
  );
}

export default function TopNav({
  displayType = "dash",
  courseCode = "",
  courseName,
  userName,
  userImg = "",
}) {
  return (
    <>
      <nav class="fixed top-0 border-b border-gray-200 bg-white-0 w-full h-20 flex items-center">
        <div>
          <img class="w-64 p-5" src="/Logo.jpg" />
        </div>
        {displayType == "dash"
          ? TopNavDashboard(userName)
          : TopNavCourse(courseCode, courseName)}
        <div class="flex items-center absolute right-10">
          <a href="#" class="hover:opacity-50">
            <img src="/Notifications.png" class="w-12 mx-5" />
          </a>
          <a href="#" class="hover:opacity-50">
            <img
              id="top-nav-profile-image"
              src={userImg == "" ? "/Default_Avatar.jpg" : userImg}
              class="w-12 mx-5 rounded-full"
            />
          </a>
        </div>
      </nav>
    </>
  );
}
