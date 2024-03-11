import React from "react";

import TopNav from "./TopNav.tsx";
import SideNav from "./SideNav.tsx";

export default function Nav({
  displayType = "dash",
  courseCode = "",
  courseName = "",
  userName = "",
  userImg = "",
}) {
  return (
    <>
      <TopNav
        displayType={displayType}
        courseName={courseName}
        courseCode={courseCode}
        userImg={userImg}
        userName={userName}
      />
      <SideNav displayType={displayType} />
    </>
  );
}
