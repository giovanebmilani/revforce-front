import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useGetAllCampaignsByUserId = (userId: string) => {
  return useQuery({
    queryKey: ['campaigns', userId],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/campaigns/${userId}/all`);
      return response.data;
    },
    enabled: !!userId,
  });
}