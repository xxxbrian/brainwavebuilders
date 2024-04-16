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
import { usePathname, useRouter } from "next/navigation";

interface NavItem {
  key: string;
  href: string;
  Icon: React.FC;
  label: string;
}

const navItems = [
  { key: "home", href: "/dashboard", Icon: IoHome, label: "Dashboard" },
  {
    key: "calendar",
    href: "/calendar",
    Icon: IoCalendarOutline,
    label: "My Calendar",
  },
  { key: "courses", href: "/course", Icon: BiTask, label: "My Courses" },
  { key: "tasks", href: "/tasks", Icon: BsListTask, label: "Tasks" },
  { key: "grades", href: "/grades", Icon: TfiMedallAlt, label: "My Grades" },
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
    href: "/profile",
    Icon: IoSettingsOutline,
    label: "Settings",
  },
];

interface Props {
  className?: string;
  isOpen: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

interface ItemProps {
  item: NavItem;
  isActive?: boolean;
  onClick: (item: NavItem) => void;
  isOpen: boolean;
}

const NavItemComponent: React.FC<ItemProps> = ({
  item,
  isActive,
  onClick,
  isOpen,
}) => {
  const { Icon, label } = item;

  const onClickInner = useCallback(() => {
    onClick(item);
  }, [onClick, item]);

  return (
    <div
      className={`flex w-full px-4 py-3 hover:bg-gray-100 active:bg-gray-200 select-none cursor-pointer items-center space-x-4 rounded-r-2xl h-12 transition-all ${
        isActive ? "bg-blue-100" : ""
      } ${isOpen ? "w-48" : "w-8"} overflow-hidden`}
      onClick={onClickInner}
    >
      <Icon />
      {isOpen && <div className="text-sm">{label}</div>}
    </div>
  );
};

export default function SideNav({
  isOpen,
  className,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const router = useRouter();

  const pathName = usePathname();

  const onClickNavItem = useCallback(
    (item: NavItem) => {
      void router.push(item.href);
    },
    [router],
  );

  const currentPage =
    navItems.find((item) =>
      pathName.toLowerCase().includes(item.href.toLowerCase()),
    )?.key ?? "home";

  return (
    <div
      className={`transition-all flex flex-col py-2 border-r border-gray-200 pr-2 h-full ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {navItems.map((item) => (
        <NavItemComponent
          key={item.key}
          item={item}
          onClick={onClickNavItem}
          isActive={item.key === currentPage}
          isOpen={isOpen}
        />
      ))}
    </div>
  );
}
