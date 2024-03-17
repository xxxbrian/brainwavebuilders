import React from "react";
import Stats from "../components/Stats";
import Activity, { type ActivityProps } from "../components/Activity";
import StarredBoard from "../components/StarredBoard";
import RecentBoard from "../components/RecentBoard";
import type { CourseCardProps } from "@/components/CourseCard";
import TopNav, { type TopNavProps } from "../components/TopNav";
import SideNav from "../components/SideNav";
import orgLogo from "@/assets/Blue Star 90.png";
import headerImg from "@/assets/unsw.png";

export default function MainDashboard() {
  // Example data representing the hours worked each day
  const activityData: ActivityProps = {
    Mon: 12,
    Tues: 6,
    Wed: 3,
    Thurs: 8,
    Fri: 7,
    Sat: 0,
    Sun: 0,
    currentDay: "Fri", // Assuming today is Friday
  };

  // Example data for stats
  const statsData = {
    course_in_progress: 5,
    course_completed: 12,
    task_finished: 34,
  };

  const course: CourseCardProps = {
    headerImgSrc: headerImg,
    organizationLogoSrc: orgLogo,
    organizationName: "UNSW",
    courseName: "Introduction to React",
    description:
      "Learn the basics of React, including JSX, components, and state.",
    courseCode: "REACT101",
  };

  const courses: CourseCardProps[] = [course, course, course, course, course];

  const topNavProps: TopNavProps = {
    displayType: "dash",
    courseCode: "COMP3900",
    courseName: "Computer Science Project",
    userName: "Steve",
  };

  return (
    <>
      <div className="flex">
        <div className="min-w-[256px]">
          <SideNav displayType={topNavProps.displayType} />
        </div>
        <div className="flex flex-col">
          <TopNav {...topNavProps} />
          <div className="flex flex-wrap mt-2 ml-2 space-y-2">
            <Stats {...statsData} />
            <Activity {...activityData} />
            <StarredBoard courses={courses} />
            <RecentBoard courses={courses} />
          </div>
        </div>
      </div>
    </>
  );
}