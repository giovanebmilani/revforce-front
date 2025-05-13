import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getErrorMessage } from "./utils";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ACCOUNT_ID = localStorage.getItem("account_id");
const LIST_CAMPAIGNS_ENDPOINT = `${API_BASE_URL}/campaigns/${ACCOUNT_ID}/all`;

export type CampaignsResponse = {
  id: string;
  remote_id: string;
  integration_id: string;
  name: string;
  start_date: Date;
  end_date: Date;
  daily_budget: number;
  monthly_budget: number;
};

const fetchCampaigns = async () => {
  try {
    if (!ACCOUNT_ID) {
      throw new Error("Account ID not found in local storage.");
    }
    const response = await axios.get<CampaignsResponse[]>(
      LIST_CAMPAIGNS_ENDPOINT,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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

export const useGetCampaigns = () => {
  return useQuery<CampaignsResponse[], Error>({
    queryKey: ["campaigns"],
    queryFn: fetchCampaigns,
  });
};
