import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@radix-ui/react-dialog";
import { BsList, BsListTask } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { IoHome, IoCalendarOutline, IoSettingsOutline } from "react-icons/io5";
import { BiTask, BiVideoRecording } from "react-icons/bi";
import { TfiAnnouncement, TfiMedallAlt } from "react-icons/tfi";
import Image from "next/image";
import logoImg from "@/assets/Logo.jpg";

const navItems = [
  { key: "home", href: "/dashboard", Icon: IoHome, label: "Home" },
  {
    key: "calendar",
    href: "/Calendar",
    Icon: IoCalendarOutline,
    label: "Calendar",
  },
  { key: "courses", href: "/Courses", Icon: BiTask, label: "Courses" },
  {
    key: "announcements",
    href: "/Announcements",
    Icon: TfiAnnouncement,
    label: "Announcements",
  },
  { key: "tasks", href: "/Tasks", Icon: BsListTask, label: "Tasks" },
  { key: "grades", href: "/My_Grades", Icon: TfiMedallAlt, label: "My Grades" },
  {
    key: "outline",
    href: "/Course_Outlines",
    Icon: BiTask,
    label: "Course Outline",
  },
  {
    key: "recordings",
    href: "/Class_Recordings",
    Icon: BiVideoRecording,
    label: "Class/Recordings",
  },
  {
    key: "settings",
    href: "/Settings",
    Icon: IoSettingsOutline,
    label: "Settings",
  },
];

interface Props {
  displayType: string;
}

export default function SideNav({ displayType }: Props) {
  const filteredNavItems = navItems.filter((item) => {
    if (displayType === "course") {
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
    <Dialog>
      <DialogTrigger asChild>
        <button className="fixed top-5 left-5  lg:hidden">
          <BsList size={30} />
        </button>
      </DialogTrigger>
      <DialogContent className="fixed bg-white z-50 h-full p-4 w-64 shadow-xl rounded-xl">
        <DialogClose asChild>
          <button className="absolute top-1/2 right-0 p-2 rounded-md border-l-2 border-t-2 border-b-2">
            <FaAngleLeft />
          </button>
        </DialogClose>
        <Image src={logoImg} alt="logo" width={255} height={60} />
        <ul className="space-y-4 mt-4">
          {filteredNavItems.map(({ key, href, Icon, label }) => (
            <li key={key}>
              <a
                href={href}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400"
              >
                <Icon className="w-10 h-10" />
                <span className="ml-3 text-lg">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </DialogContent>
      <aside className="hidden lg:block w-64 h-full border-r overflow-y-auto">
        <Image src={logoImg} alt="logo" width={255} height={60} />
        <ul className="space-y-4 mt-4">
          {filteredNavItems.map(({ key, href, Icon, label }) => (
            <li key={key}>
              <a
                href={href}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 group text-orange-400"
              >
                <Icon className="w-10 h-10" />
                <span className="ml-3 text-lg">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </Dialog>
  );
}
