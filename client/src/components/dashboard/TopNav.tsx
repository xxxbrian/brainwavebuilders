import React from "react";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";
import CreateClassPopup from "./CreateCoursePopup";
import JoinCoursePopup from "./JoinCoursePopup";
import { IoMdNotificationsOutline } from "react-icons/io";
import courseLogo from "@/assets/Course_Logo.png";
import SideNav from "./SideNav";
import { SlHome } from "react-icons/sl";

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
            {courseCode === "" ? "Error" : courseCode}
          </h2>
          <h2 className="text-2xl px-3 text-black"> : </h2>
          <h2 className="text-2xl text-black">
            {courseCode === "" ? "Course Details Not Found" : courseName}
          </h2>
        </div>
      </div>
    </>
  );
}

export default function TopNav(props: TopNavProps) {
  return (
    <div className="border-b bg-white w-full align-middle flex justify-between h-[75px]">
      {/* Menu Button for small screens */}
      <div className="lg:hidden">
        <SideNav displayType={props.displayType} />
      </div>
      <div className="hidden lg:flex items-center">
        {props.displayType === "dash"
          ? TopNavDashboard(props.userName)
          : TopNavCourse(props.courseCode, props.courseName)}
      </div>
      <div className="flex items-center">
        {/* Buttons */}
        {props.displayType !== "course" && (
          <div className="flex">
            <CreateClassPopup />
            <JoinCoursePopup />
          </div>
        )}
        {/* Home */}
        {props.displayType === "course" && (
          <a href="/dashboard" className="hover:opacity-50">
            <SlHome className="text-orange-400 text-3xl ml-4" />
          </a>
        )}
        {/* Notifications and avatar */}
        <a href="#" className="hover:opacity-50">
          <IoMdNotificationsOutline className="text-red-500 text-4xl ml-4" />
        </a>
        <a href="/profile" className="hover:opacity-50">
          {props.userImg ? (
            <img src={props.userImg} alt="Avatar" className="object-cover" />
          ) : (
            <RxAvatar className="h-12 w-12 text-zinc-500 ml-2 mr-2" />
          )}
        </a>
      </div>
    </div>
  );
}
