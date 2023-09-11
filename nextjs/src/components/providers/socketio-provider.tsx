"use client";

import { SocketioContext } from "@/context/socket";
import { FC, ReactNode, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface Props {
  children: ReactNode;
}

const SocketioProvider: FC<Props> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketio = io(String(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL), {
      transports: ["websocket"],
    });

    console.log("Connecting to WebSocket server...");

    socketio?.on("connect", () => {
      console.log(`Connected to WebSocket server: ${socketio.id}`);
    });

    setSocket(socketio);

    // Clean up the socket connection on unmount
    return () => {
      console.log("Disconnecting from WebSocket server...");
      socketio.disconnect();
    };
  }, []);

  return (
    <SocketioContext.Provider value={socket}>
      {children}
    </SocketioContext.Provider>
  );
};

export default SocketioProvider;
