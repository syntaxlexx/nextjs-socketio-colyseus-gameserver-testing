import { createContext } from "react";
import { Client } from 'colyseus.js'

export const ColyseusContext = createContext<Client | null>(null);
