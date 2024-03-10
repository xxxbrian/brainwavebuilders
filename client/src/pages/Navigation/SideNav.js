import React from "react";
//import Home from "../Images/Home.png";

const handleChangeNav = () => {
  if (document.getElementById("sidebar").style.width == "100px") {
    document.getElementById("sidebar").style.width = "350px";
    document.getElementById("sidebar-button").innerHTML = "<";
    document.getElementById("sidebar-logo").src = "/Logo.jpg";
  } else {
    document.getElementById("sidebar").style.width = "100px";
    document.getElementById("sidebar-button").innerHTML = ">";
    document.getElementById("sidebar-logo").src = "/Logo_Small.jpg";
  }
};

function SideNav() {
  return (
    <>
      <div class="side-nav" id="sidebar">
        <img src="/Logo_Small.jpg" id="sidebar-logo" class="side-nav-logo" />
        <button onClick={handleChangeNav} id="sidebar-button">
          <b>&gt;</b>
        </button>
        <div class="side-nav-item">
          <a href="#">
            <img src="/Home.png" />
          </a>
          <a href="#" class="side-nav-link">
            Home
          </a>
        </div>
        <div class="side-nav-item">
          <a href="#">
            <img src="/Announcements.png" />
          </a>
          <a href="#" class="side-nav-link">
            Announcements
          </a>
        </div>
        <div class="side-nav-item">
          <a href="#">
            <img src="/Calendar.png" />
          </a>
          <a href="#" class="side-nav-link">
            Calendar
          </a>
        </div>
        <div class="side-nav-item">
          <a href="#">
            <img src="/Tasks.png" />
          </a>
          <a href="#" class="side-nav-link">
            Tasks
          </a>
        </div>
        <div class="side-nav-item">
          <a href="#">
            <img src="/My_Grades.png" />
          </a>
          <a href="#" class="side-nav-link">
            My Grades
          </a>
        </div>
        <div class="side-nav-item">
          <a href="#">
            <img src="/Course_Outlines.png" />
          </a>
          <a href="#" class="side-nav-link">
            Course Outline
          </a>
        </div>
        <div class="side-nav-item">
          <a href="#">
            <img src="/Class_Recordings.png" />
          </a>
          <a href="#" class="side-nav-link">
            Class/Recordings
          </a>
        </div>
        <div class="side-nav-item">
          <a href="#">
            <img src="/Settings.png" />
          </a>
          <a href="#" class="side-nav-link">
            Settings
          </a>
        </div>
      </div>
    </>
  );
}

export default SideNav;
