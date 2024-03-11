import React from "react";

const handleCreateClass = () => {};

const handleJoinClass = () => {};

const handleNotificationsPopup = () => {};

function TopNavDashboard() {
  return (
    <>
      <div id="top-nav-dashboard">
        <div id="top-nav-welcome">
          <p id="top-nav-page-type">Dashboard</p>
          <p id="top-nav-welcome-msg">Welcome to Brainwaves!</p>
        </div>
        <div id="top-nav-buttons">
          <button onClick={handleCreateClass}>Create Class</button>
          <button onClick={handleJoinClass}>Join Class</button>
        </div>
      </div>
    </>
  );
}

function TopNavCourse() {
  return (
    <>
      <div id="top-nav-course">
        <img src="/Course_Logo.png" />
        <p id="top-nav-course-code">TEST0000</p>
        <p>:</p>
        <p id="top-nav-course-name">Testing Course about Testing</p>
      </div>
    </>
  );
}

function TopNav() {
  return (
    <>
      <div class="top-nav">
        <div class="top-nav-logo">
          <img src="/Logo.jpg" />
        </div>
        {TopNavDashboard()}
        <div id="top-nav-personal">
          <a href="#">
            <img src="/Notifications.png" id="top-nav-notifications" />
          </a>
          <a href="#">
            <img src="/Default_Avatar.jpg" id="top-nav-avatar" />
          </a>
        </div>
      </div>
    </>
  );
}

export default TopNav;
