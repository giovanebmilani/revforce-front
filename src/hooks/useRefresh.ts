import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useRefreshTime = (account_id: string) =>
  useQuery({
    queryKey: ["refreshTime", account_id],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/refresh/${account_id}`);
      return response.data.next_refresh_time;
    },
    enabled: !!account_id,
  });

export const useRefreshMutation = () =>
  useMutation({
    mutationFn: async (account_id: string) => {
      const response = await axios.post(`${API_BASE_URL}/refresh`, account_id);
      return response.data;
    },
    onSuccess: ({ account_id }) => {
      queryClient.invalidateQueries({ queryKey: ["refreshTime", account_id] });
    },
  });
