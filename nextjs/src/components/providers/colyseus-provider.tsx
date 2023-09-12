"use client";

import { ColyseusContext } from "@/context/colyseus";
import { Client } from "colyseus.js";
import { FC, ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

const ColyseusProvider: FC<Props> = ({ children }) => {
  const [colyseus, setColyseus] = useState<Client | null>(null);

  useEffect(() => {
    const colyseusClient = new Client(
      String(process.env.NEXT_PUBLIC_COLYSEUS_SERVER_URL)
    );

    console.log("Connecting to colyseus server...");

    setColyseus(colyseusClient);

    // Clean up the socket connection on unmount
    return () => {
      console.log("Disconnecting from colyseus server...");
    };
  }, []);

  return (
    <ColyseusContext.Provider value={colyseus}>
      {children}
    </ColyseusContext.Provider>
  );
};

export default ColyseusProvider;
