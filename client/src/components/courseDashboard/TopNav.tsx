import React from "react";
import Image from "next/image";
import defaultAvatar from "@/assets/Default_Avatar.jpg";
import CreateClassPopup from "./CreateCoursePopup";
import JoinCoursePopup from "./JoinCoursePopup";
import notifications from "@/assets/Notifications.png";
import courseLogo from "@/assets/Course_Logo.png";

// Declare and export the TopNavProps type
export type TopNavProps = {
  displayType: string;
  courseCode?: string;
  courseName?: string;
  userName: string;
  userImg?: string;
};

function TopNavDashboard(name?: string) {
  return (
    <div className="p-2 flex justify-between">
      {/* Left section - Dashboard Title and Personalized Greeting */}
      <div className="flex flex-col">
        <h3 className="font-bold text-black">Dashboard</h3>
        <h2 className="text-2xl text-blue-800">
          {name ? `Let's start learning, ${name}` : "Welcome to Brainwaves!"}
        </h2>
      </div>
    </div>
  );
}

function TopNavCourse(courseCode?: string, courseName?: string) {
  return (
    <>
      <div className="flex items-center">
        <div className="flex items-center">
          <Image
            src={courseLogo}
            alt="courseLogo"
            className="m-3 ml-5 w-8 h-8"
          />
          <h2 className="text-2xl text-black">
            {courseCode == "" ? "Error" : courseCode}
          </h2>
          <h2 className="text-2xl px-3 text-black"> : </h2>
          <h2 className="text-2xl text-black">
            {courseCode == "" ? "Course Details Not Found" : courseName}
          </h2>
        </div>
      </div>
    </>
  );
}

export default function TopNav(props: TopNavProps) {
  return (
    <>
      <nav className="border-b bg-white-0 w-full flex justify-between max-w-[1195px] max-h-[75px]">
        <div className="flex">
          <div>
            {props.displayType == "dash"
              ? TopNavDashboard(props.userName)
              : TopNavCourse(props.courseCode, props.courseName)}
          </div>
        </div>
        <div className="flex items-center">
          {/* Buttons */}
          <div className="flex">
            <CreateClassPopup />
            <JoinCoursePopup />
          </div>
          {/* Notifications and avatar */}
          <a href="#" className="hover:opacity-50">
            <Image
              src={notifications}
              alt="notifications"
              className="w-12 mx-5"
            />
          </a>
          <a href="#" className="hover:opacity-50">
            <Image
              src={props.userImg ?? defaultAvatar}
              alt="Avatar"
              className="w-12 mx-5 rounded-full"
            />
          </a>
        </div>
      </nav>
    </>
  );
}
