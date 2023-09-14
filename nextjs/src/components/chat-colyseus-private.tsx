"use client";

import { useColyseus } from "@/hooks/use-colyseus";
import type { PrivateMessageState } from "@colyseus/rooms/schema/PrivateMessageState";
import type { PrivateRoomState } from "@colyseus/rooms/schema/PrivateRoomState";
import { Room } from "colyseus.js";
import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PlayerState } from "@colyseus/rooms/schema/PlayerState";
import { useCurrentUser } from "@/hooks/use-current-user";

interface Props {
  accessToken: string;
}

const ChatColyseusPrivate: FC<Props> = ({ accessToken }) => {
  const client = useColyseus();
  const user = useCurrentUser();

  const [message, setMessage] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [messages, setMessages] = useState<PrivateMessageState[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [roomName, setRoomName] = useState<string | null>(null);
  const [theRoom, setTheRoom] = useState<Room | null>(null);

  const onJoin = async () => {
    const room = await client?.joinOrCreate<PrivateRoomState>("private", {
      accessToken,
    });

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
      setPlayers(state.players);
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

      <div className="flex gap-4">
        <div>
          <h3 className="text-xl">{welcomeMessage}</h3>
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                <div className="text-sm">{msg.message}</div>
                <div className="text-gray-500 text-xs">~ {msg.username}</div>
              </div>
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
        <div>
          <h2>Players</h2>
          <ol className="shadow-md p-4">
            {[...players.values()].map((k, i) => (
              <li key={i} className="list-decimal ml-4">
                <span title={k.id} className="text-xs">
                  {k.username}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ChatColyseusPrivate;
