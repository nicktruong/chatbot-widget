import { Socket } from "socket.io-client";

export interface SendMessageDto {
  value: string;
  botId: string;
  sender: string;
  receiver: string;
}

export interface Message {
  id: string;
  value: string;
  sender: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClientToServerEvents {
  message: (payload: SendMessageDto) => void;
}

export type SocketServer = Socket<any, ClientToServerEvents>;
