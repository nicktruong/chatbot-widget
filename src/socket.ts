import { Socket, io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : "http://localhost:8000/chat";

export const socket: Socket = io(URL as string);
