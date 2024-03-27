import { Socket } from "socket.io-client";

export type Step = `${number}-${number}`;

export interface SendMessageDto {
  botId: string;
  value: string;
  sender: string;
  answer: boolean;
  receiver: string;
  clientId: string;
  currentStep: Step;
}

export interface Message {
  id?: string;
  value: string;
  sender: string;
  receiver: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientToServerEvents {
  message: (payload: SendMessageDto) => void;
  "start-message": (payload: SendMessageDto) => void;
}

export type SocketServer = Socket<any, ClientToServerEvents>;
