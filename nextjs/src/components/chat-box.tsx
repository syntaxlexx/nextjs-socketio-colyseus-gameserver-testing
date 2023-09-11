"use client";

import { SocketioContext } from "@/context/socket";
import { FC, useContext, useEffect, useState } from "react";

interface Props {}

const ChatBox: FC<Props> = ({}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useContext(SocketioContext);

  const handleInitialMessages = (initialMessages: string[]) => {
    console.log("Received initialMessages:", initialMessages);
    setMessages(initialMessages);
  };

  const handleMessage = (newMessage: string) => {
    console.log("Received message:", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    console.log("listening...");

    // fetch messages on mount
    socket?.emit("get-messages");

    socket?.on("messages", handleInitialMessages);
    socket?.on("message", handleMessage);

    // unsubscribe from event for preventing memory leaks
    return () => {
      socket?.off("messages", handleInitialMessages);
      socket?.off("message", handleMessage);
    };
  }, [socket]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatBox;
