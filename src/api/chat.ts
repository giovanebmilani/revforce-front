import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getErrorMessage } from "./utils";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const SEND_CHAT_MESSAGE_ENDPOINT = `${API_BASE_URL}/chat`;

type ChatHistoryMessage = {
  role: "user" | "assistant" | "system";
  content: string;
}

export type ChatRequest = {
  history: ChatHistoryMessage[],
  question: string;
  chart_id: string;
};

export type ChatResponse = {
  history: ChatHistoryMessage[],
  response: string;
};

const sendChatMessage = async (payload: ChatRequest) => {
  try {

    const response = await axios.post<ChatResponse>(SEND_CHAT_MESSAGE_ENDPOINT, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const friendlyMessage = getErrorMessage(error);
      throw new Error(friendlyMessage);
    } else {
      throw new Error("Ocorreu um erro inesperado na aplicação.");
    }
  }
};

export const usePostChat = () => {
  return useMutation({ //this probably doesnt make sense
    mutationFn: (payload: ChatRequest) => sendChatMessage(payload),
  });
};
