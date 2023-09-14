"use client";

import { useColyseus } from "@/hooks/use-colyseus";
import type { PublicRoomState } from "@colyseus/rooms/schema/PublicRoomState";
import { Room } from "colyseus.js";
import { FC, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Props {}

const ChatColyseus: FC<Props> = ({}) => {
  const client = useColyseus();
  const [message, setMessage] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [theRoom, setTheRoom] = useState<Room | null>(null);

  const onJoin = async () => {
    const room = await client?.joinOrCreate<PublicRoomState>("public", {});

    if (!room) {
      console.log("Could not join the room!");
      return;
    }

    console.log(room.sessionId, "joined", room.name);
    setRoomName(room?.name);
    setTheRoom(room);

    room.onStateChange((state) => {
      console.log(room.name, "has new state:", state);
      setWelcomeMessage(state.welcomeMessage);
      setMessages(state.messages);
    });

    room.onMessage("messages", (messages) => {
      console.log("messages received on", room.name, messages);
      //   setMessages(messages);
    });

    room.onMessage("message", (message) => {
      console.log("received on", room.name, message);
      setMessages((prev) => [...prev, message]);
    });

    room.onError((code, message) => {
      console.log("couldn't join", room.name, "code: ", code);
    });

    room.onLeave((code) => {
      console.log("left", room.name, "code: ", code);
    });

    return room;
  };

  useEffect(() => {
    const conn = onJoin();

    return () => {
      console.log("cleanup");
      conn.then((room) => room?.leave());
    };
  }, [client]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && theRoom) {
      theRoom.send("message", message);
      setMessage("");
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Colyseus Chat App: {roomName}</h1>
      <h3 className="text-xl">{welcomeMessage}</h3>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="space-y-2">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex justify-end">
          <Button type="submit">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default ChatColyseus;
