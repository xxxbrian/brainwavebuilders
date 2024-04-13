"use client";

import { Avatar, Button, IconButton, Text, TextField } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  MessageCircleIcon,
  MicOffIcon,
  PanelRightCloseIcon,
} from "lucide-react";

const socket = io("http://localhost:3900");

export const CoursesPage: React.FC = ({}) => {
  const path = usePathname();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messagelist, setMessagelist] = useState<Record<string, string>[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const user = useCurrentUser();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      socket.emit("join", path, user?.email);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onMessage(message: string, sender: string) {
      setMessagelist((prev) => [...prev, { sender, message }]);
      console.log("message", message, sender);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessage);
    };
  }, [path, user]);

  const onClickSend = () => {
    if (!message) return;
    socket.emit("message", path, message, user?.email);
    setMessage("");
  };

  const [sidebar, setSidebar] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messagelist]);

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex flex-row h-full w-full max-h-[calc(100%-160px)]">
        <div className="flex items-center justify-center h-full w-full bg-black">
          <div className="w-full h-4/5 bg-gray-700 mx-8 rounded-3xl items-center justify-center flex">
            <Avatar
              src={user?.avatar}
              fallback={user?.firstName[0] ?? "?"}
              size="9"
              variant="solid"
            />
          </div>
        </div>
        <div
          className="h-full w-2/5 bg-black max-w-md min-w-96 p-3"
          hidden={!sidebar}
        >
          <div className="flex flex-col h-full w-full bg-white rounded-3xl pt-5 px-4">
            <div className="flex flex-row justify-between">
              <Text size="6" weight="bold">
                Message
              </Text>
              <IconButton
                onClick={() => setSidebar(false)}
                variant="soft"
                size="2"
              >
                <PanelRightCloseIcon />
              </IconButton>
            </div>
            <div
              className="flex flex-col space-y-2 h-full pt-4 overflow-y-scroll hide-scrollbar"
              ref={messagesEndRef}
            >
              {messagelist.map((msg, idx) => (
                <div key={idx} className="flex flex-col">
                  <Avatar
                    src={user?.avatar}
                    fallback={user?.firstName[0] ?? "?"}
                    size="3"
                    variant="soft"
                  />
                  <Text size="3" weight="bold">
                    {msg.sender}
                  </Text>
                  <Text size="3">{msg.message}</Text>
                </div>
              ))}
            </div>
            <div className="flex flex-row space-x-4 w-full h-20 pb-10 px-1">
              <TextField.Root
                className="w-full"
                size="3"
                placeholder="Send a Message..."
                value={message}
                onChange={(e) => setMessage(e.currentTarget.value)}
              />
              <Button onClick={onClickSend} size="3" variant="soft">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-32 bg-black">
        <div className="flex flex-row justify-evenly items-center h-full w-full px-16">
          <IconButton radius="full" size="4" variant="soft">
            <MicOffIcon />
          </IconButton>
          <IconButton radius="full" size="4" variant="soft">
            <MicOffIcon />
          </IconButton>
          <IconButton radius="full" size="4" variant="soft">
            <MicOffIcon />
          </IconButton>
          <IconButton radius="full" size="4" variant="soft">
            <MicOffIcon />
          </IconButton>
          <IconButton
            onClick={() => setSidebar(!sidebar)}
            radius="full"
            size="4"
            variant="soft"
          >
            <MessageCircleIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
