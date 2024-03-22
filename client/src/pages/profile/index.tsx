import React from "react";
import ProfileEditing from "@/components/profile/profile_editing";
import TopNav, { type TopNavProps } from "../../components/dashboard/TopNav";
import SideNav from "../../components/dashboard/SideNav";

export const Profile: React.FC = () => {
  const topNavProps: TopNavProps = {
    displayType: "dash",
    courseCode: "COMP3900",
    courseName: "Computer Science Project",
    userName: "Steve",
  };

  return (
    <div className="flex max-w-[1140px]">
      <div className="lg:block">
        <SideNav displayType={topNavProps.displayType} />
      </div>
      <div className="flex-grow">
        <TopNav {...topNavProps} />
        <ProfileEditing />
      </div>
    </div>
  );
};

export default Profile;
