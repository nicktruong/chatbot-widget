import { io } from "socket.io-client";
import type { SocketServer } from "./interfaces";

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "http://localhost:8000/chat";

export const socket: SocketServer = io(URL as string);
