"use client";

import { useColyseus } from "@/hooks/use-colyseus";
import type { PublicRoomState } from "@colyseus/rooms/schema/PublicRoomState";
import { Room } from "colyseus.js";
import { FC, useEffect, useState } from "react";

interface Props {}

const ChatColyseus: FC<Props> = ({}) => {
  const client = useColyseus();
  const [message, setMessage] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    client
      ?.joinOrCreate<PublicRoomState>("public")
      .then((room) => {
        console.log(room.sessionId, "joined", room.name);
        setRoomName(room.name);
        setRoom(room);

        room.onStateChange((state) => {
          console.log(room.name, "has new state:", state);
          setWelcomeMessage(state.welcomeMessage);
          setMessages(state.messages);
        });

        room.onMessage("messages", (messages) => {
          console.log(client.id, "messages received on", room.name, messages);
          //   setMessages(messages);
        });

        room.onMessage("message", (message) => {
          console.log(client.id, "received on", room.name, message);
          setMessages((prev) => [...prev, message]);
        });

        room.onError((code, message) => {
          console.log(client.id, "couldn't join", room.name, "code: ", code);
        });

        room.onLeave((code) => {
          console.log(client.id, "left", room.name, "code: ", code);
        });
      })
      .catch((e) => {
        console.log("JOIN ERROR", e);
      });

    return () => {
      console.log("cleanup");
      room?.leave();
    };
  }, [client]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && room) {
      room.send("message", message);
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

export default ChatColyseus;
