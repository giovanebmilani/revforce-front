import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getErrorMessage } from "./utils";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ACCOUNT_ID = localStorage.getItem("account_id");
const SEND_CHAT_MESSAGE_ENDPOINT = `${API_BASE_URL}/chart/${ACCOUNT_ID}/all`;

export type ChatRequest = {
  history: [
    {
      role: "user" | "assistant" | "system";
      content: string;
    }
  ],
  question: string;
  chart_id: string;
};

export type ChatResponse = {
  history: [
    {
      role: "user" | "assistant" | "system";
      content: string;
    }
  ],
  response: string;
};

const sendChatMessage = async () => {
  try {
    if (!ACCOUNT_ID) {
      throw new Error("Account ID not found in local storage.");
    }
    const response = await axios.get<ChatResponse[]>(SEND_CHAT_MESSAGE_ENDPOINT, {
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

export const useGetAds = () => {
  return useQuery<ChatResponse[], Error>({
    queryKey: ["ads"],
    queryFn: sendChatMessage,
  });
};
