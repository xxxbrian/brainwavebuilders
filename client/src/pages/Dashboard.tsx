import React, { useState } from "react";

import Nav from "/src/components/Navigation/Nav.tsx";
import Stats from "/src/components/Stats.tsx";

export default function Dashboard() {
  return (
    <>
      <Nav
        displayType="dash"
        userName="Ethan"
        courseCode="COMP3900"
        courseName="Computer Science Project"
      />
      <div class="flex mt-24 ml-72 "></div>
    </>
  );
}
