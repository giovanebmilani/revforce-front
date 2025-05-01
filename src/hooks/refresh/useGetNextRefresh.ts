import axios from "axios";
import { useQuery } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useGetNextRefresh = (account_id: string) =>
  useQuery({
    queryKey: ["refreshTime", account_id],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/refresh/${account_id}`);
      return response.data.next_refresh_time;
    },
    enabled: !!account_id,
  });
