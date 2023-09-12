import { SocketioContext } from "@/context/socket";
import { useContext } from "react";

export const useSocketio = () => {
  return useContext(SocketioContext);
};
