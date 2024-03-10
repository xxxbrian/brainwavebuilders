import React from "react";

const handleCreateClass = () => {};

const handleJoinClass = () => {};

function TopNav() {
  return (
    <>
      <div class="top-nav">
        <div class="top-nav-logo">
          <img src="/Logo.jpg" />
        </div>
        <div id="top-nav-welcome">
          <p id="top-nav-page-type">Default</p>
          <p id="top-nav-welcome-msg">
            Please Log in for your unique welcome message!
          </p>
        </div>
        <div id="top-nav-buttons">
          <button onClick={handleCreateClass}>Create Class</button>
          <button onClick={handleJoinClass}>Join Class</button>
        </div>
      </div>
    </>
  );
}

export default TopNav;
