import { axiosClient } from "../api";

interface CreateSchedule {
  botId: string;
  value: string;
  sender: string;
  receiver: string;
  clientId: string;
  messageId: string;
  scheduleDate: string;
}

export const scheduleMessage = async (data: CreateSchedule) => {
  await axiosClient.post("/messages/schedule", data);
};
