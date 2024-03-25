import React from "react";
import logoImg from "@/assets/Logo.jpg";
import Image from "next/image";
import homeIcon from "@/assets/Home.png";
import calendarIcon from "@/assets/Calendar.png";
import tasksIcon from "@/assets/Tasks.png";
import announcementsIcon from "@/assets/Announcements.png";
import gradesIcon from "@/assets/My_Grades.png";
import outlineIcon from "@/assets/Course_Outlines.png";
import recordingsIcon from "@/assets/Class_Recordings.png";
import settingsIcon from "@/assets/Settings.png";

const navItems = [
  { key: "home", href: "/Dashboard", imgSrc: homeIcon, label: "Home" },
  {
    key: "calendar",
    href: "/Calendar",
    imgSrc: calendarIcon,
    label: "Calendar",
  },
  { key: "courses", href: "/Courses", imgSrc: tasksIcon, label: "Courses" },
  {
    key: "announcements",
    href: "/Announcements",
    imgSrc: announcementsIcon,
    label: "Announcements",
  },
  { key: "tasks", href: "/Tasks", imgSrc: tasksIcon, label: "Tasks" },
  { key: "grades", href: "/My_Grades", imgSrc: gradesIcon, label: "My Grades" },
  {
    key: "outline",
    href: "/Course_Outlines",
    imgSrc: outlineIcon,
    label: "Course Outline",
  },
  {
    key: "recordings",
    href: "/Class_Recordings",
    imgSrc: recordingsIcon,
    label: "Class/Recordings",
  },
  {
    key: "settings",
    href: "/Settings",
    imgSrc: settingsIcon,
    label: "Settings",
  },
];
interface Props {
  displayType: string;
}
export default function SideNav(props: Props) {
  // Filter items based on displayType
  const filteredNavItems = navItems.filter((item) => {
    if (props.displayType === "course") {
      return !["home", "calendar", "courses"].includes(item.key);
    }
    return (
      item.key === "home" ||
      item.key === "calendar" ||
      item.key === "courses" ||
      item.key === "settings"
    ); // Default items
  });

  return (
    <aside className="w-64 transition-transform -translate-x-full sm:translate-x-0 border-r border-gray-200">
      <Image
        className="p-2.5 min-w-[256px] border-r border-b"
        src={logoImg}
        alt="logo"
        style={{ width: "255px" }}
      />
      <div className="h-full p-4 overflow-y-auto bg-white">
        <ul className="space-y-2 font-medium">
          {filteredNavItems.map(({ key, href, imgSrc, label }) => (
            <li key={key}>
              <a
                href={href}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400"
              >
                <Image src={imgSrc} alt={label} className="w-10 h-10" />
                <span className="ms-3 text-lg">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
