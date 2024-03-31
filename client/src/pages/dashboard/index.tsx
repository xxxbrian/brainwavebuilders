import React from "react";
import Stats from "../../components/dashboard/Stats";
import Activity, {
  type ActivityProps,
} from "../../components/dashboard/Activity";
import StarredBoard from "../../components/dashboard/StarredBoard";
import RecentBoard from "../../components/dashboard/RecentBoard";
import type { CourseCardProps } from "@/components/dashboard/CourseCard";
import TopNav, { type TopNavProps } from "../../components/dashboard/TopNav";
import SideNav from "../../components/dashboard/SideNav";
import orgLogo from "@/assets/unsw.png";
import headerImg from "@/assets/unsw.png";
import { PageFrame } from "@/components/structural/PageFrame";

export const Dashboard: React.FC = () => {
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
    <PageFrame title="Dashboard">
      <div className="flex">
        <div className="flex-1">
          <TopNav {...topNavProps} />
          <div className="flex flex-col flex-wrap pt-4 m-auto">
            <div className="flex">
              <Stats {...statsData} />
              <Activity {...activityData} />
            </div>
            <StarredBoard courses={courses} />
            <RecentBoard courses={courses} />
          </div>
        </div>
      </div>
    </PageFrame>
  );
};

export default Dashboard;
