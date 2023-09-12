import { ColyseusContext } from "@/context/colyseus";
import { useContext } from "react";

export const useColyseus = () => {
  return useContext(ColyseusContext);
};
