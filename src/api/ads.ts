import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getErrorMessage } from "./utils";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ACCOUNT_ID = localStorage.getItem("account_id");
const LIST_ADS_ENDPOINT = `${API_BASE_URL}/ads/${ACCOUNT_ID}/all`;

export type AdsResponse = {
  id: string;
  remote_id: string;
  integration_id: string;
  campaign_id: string;
  name: string;
  created_at: Date;
};

const fetchAds = async () => {
  try {
    if (!ACCOUNT_ID) {
      throw new Error("Account ID not found in local storage.");
    }
    const response = await axios.get<AdsResponse[]>(LIST_ADS_ENDPOINT, {
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
  return useQuery<AdsResponse[], Error>({
    queryKey: ["ads"],
    queryFn: fetchAds,
  });
};
