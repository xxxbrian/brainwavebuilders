import React, { useCallback } from "react";
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
import logoImg from "@/assets/logo-big.svg";
import { useRouter } from "next/router";

interface NavItem {
  key: string;
  href: string;
  Icon: React.FC;
  label: string;
}

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
  className?: string;
  isOpen: boolean;
}

interface ItemProps {
  item: NavItem;
  isActive?: boolean;
  onClick: (item: NavItem) => void;
}

const NavItemComponent: React.FC<ItemProps> = ({ item, isActive, onClick }) => {
  const { Icon, label } = item;

  const onClickInner = useCallback(() => {
    onClick(item);
  }, [onClick, item]);

  return (
    <div
      className={`flex w-full px-4 py-3 hover:bg-gray-100 active:bg-gray-200 select-none cursor-pointer items-center space-x-4 rounded-r-md ${isActive ? "bg-blue-100" : ""}`}
      onClick={onClickInner}
    >
      <Icon />
      <div className="text-lg">{label}</div>
    </div>
  );
};

export default function SideNav({ displayType, className, isOpen }: Props) {
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

  const router = useRouter();

  const onClickNavItem = useCallback(
    (item: NavItem) => {
      void router.push(item.href);
    },
    [router],
  );

  const currentPage =
    navItems.find((item) =>
      router.pathname.toLowerCase().includes(item.href.toLowerCase()),
    )?.key ?? "home";

  if (!isOpen) return null;

  return (
    <div
      className={`transition-all flex flex-col items-center py-2 border-r border-gray-200`}
    >
      {navItems.map((item) => (
        <NavItemComponent
          key={item.key}
          item={item}
          onClick={onClickNavItem}
          isActive={item.key === currentPage}
        />
      ))}
    </div>
  );
}
