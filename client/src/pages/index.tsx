import React, { useState } from "react";
import { io as sio, type Socket } from "socket.io-client";

import Nav from "./Navigation/Nav.tsx";

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [messages, setMessages] = useState<string[]>([]);

  const handleButtonClick = () => {
    if (socket && socket.connected) {
      socket.disconnect();
      setConnectionStatus("Disconnected");
    } else {
      const newSocket = sio("", { path: "/api" });
      setSocket(newSocket);
      newSocket.on("connect", () => {
        setConnectionStatus("Connected");
      });
    }
  };

  const onPing = () => {
    if (socket) {
      socket.emit("ping", "Ping");
      socket.on("pong", (data) => {
        setMessages([...messages, `a message from server: ${data}`]);
      });
    }
  };

  return (
    <>
      <Nav
        displayType="dash"
        userName="Ethan"
        courseCode="COMP3900"
        courseName="Computer Science Project"
      />
      <div
        id="main-content"
        className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 mt-24 ml-72"
      >
        <div className="flex-shrink-0">
          <h1 className="text-xl font-medium text-black">
            Socket.IO NextJS Demo
          </h1>
          {connectionStatus === "Connected" ? (
            <p className="mt-2 text-green-500">Connected to server</p>
          ) : (
            <p className="mt-2 text-red-500">Not connected to server</p>
          )}
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {connectionStatus === "Disconnected" ? "Connect" : "Disconnect"}
          </button>
          <button
            onClick={onPing}
            disabled={connectionStatus === "Disconnected"}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
          >
            Ping
          </button>
        </div>
      </div>
      <div className="p-6 max-w-sm mx-auto flex flex-col mt-4">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </>
  );
}
