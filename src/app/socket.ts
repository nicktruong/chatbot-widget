import { io } from "socket.io-client";
import type { SocketServer } from "./interfaces";

const URL = "https://chatbot-fe-red.vercel.app/chat";
// "http://localhost:8000/chat";

console.log({ URL });

export const socket: SocketServer = io(URL as string);
