import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const queryClient = useQueryClient();

export const usePostRefresh = () =>
  useMutation({
    mutationFn: async (account_id: string) => {
      const response = await axios.post(`${API_BASE_URL}/refresh`, 
        {account_id},
      );
      console.log("response", {account_id});
      return response.data;
    },
    onSuccess: (_data, account_id) => {
      queryClient.invalidateQueries({ queryKey: ["refreshTime", account_id] });
    },
  });
