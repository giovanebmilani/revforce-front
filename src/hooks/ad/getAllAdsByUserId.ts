import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useGetAllAdsByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["ads", userId],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/ads/${userId}/all`);
      return response.data;
    },
    enabled: !!userId,
  });
};