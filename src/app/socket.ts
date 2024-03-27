import { io } from "socket.io-client";
import type { SocketServer } from "./interfaces";

// const URL = "wss://chatbot-be-0654.onrender.com/chat";
const URL = "ws://localhost:8000/app-chat";

export const socket: SocketServer = io(URL as string);
