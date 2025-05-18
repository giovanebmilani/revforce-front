import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getErrorMessage } from "./utils";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ACCOUNT_ID = localStorage.getItem("account_id");
const SEND_CHAT_MESSAGE_ENDPOINT = `${API_BASE_URL}/chart/${ACCOUNT_ID}/all`;

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

const sendChatMessage = async (message : string, history : ChatHistoryMessage[]) => {
  try {
    if (!ACCOUNT_ID) {
      throw new Error("Account ID not found in local storage.");
    }

    const payload: ChatRequest = {
      history: history,
      question: message,
      chart_id: ACCOUNT_ID,
    };

    const response = await axios.post<ChatResponse[]>(SEND_CHAT_MESSAGE_ENDPOINT, payload, {
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

export const usePostChat = (message : string, history : ChatHistoryMessage[]) => {
  return useQuery<ChatResponse[], Error>({ //this probably doesnt make sense
    queryKey: [`post-${message}`],
    queryFn: () => sendChatMessage(message, history),
  });
};
