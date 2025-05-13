import axios from "axios";
import { getErrorMessage } from "./utils";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const SETTINGS_ENDPOINT = `${API_BASE_URL}/account_config/`;

interface Payload {
  account_id: string;
  type: string;
  api_secret: string;
}

export const saveIntegrationSettings = async (
  accountId: string,
  apiSecret: string,
  sourceType: string
): Promise<string> => {
  const payload: Payload = {
    account_id: accountId,
    type: sourceType,
    api_secret: apiSecret,
  };

  try {
    const response = await axios.post<any>(SETTINGS_ENDPOINT, payload, {
      timeout: 15000,
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
