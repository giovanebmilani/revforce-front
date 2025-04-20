import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// export function useRefresh(account_id: string) {
//   const queryClient = useQueryClient();

//   const {
//     data: refreshTime,
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["refreshTime", account_id],
//     queryFn: async () => {
//       const response = await axios.get(`${API_BASE_URL}/refresh/${account_id}`);
//       return response.data.next_refresh_time;
//     },
//     enabled: !!account_id,
//   });

//   const { mutate: triggerRefresh, isPending } = useMutation({
//     mutationFn: (id: string) =>
//       axios.post(`${API_BASE_URL}/refresh`, { account_id: id }),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["refreshTime", account_id] });
//     },
//   });

//   return {};
// }

export const useRefreshTime = (account_id: string) =>
  useQuery({
    queryKey: ["refreshTime", account_id],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/refresh/${account_id}`);
      return response.data.next_refresh_time;
    },
    enabled: !!account_id,
  });

export const useRefreshMutation = (account_id: string) =>
  useMutation({
    mutationFn: () => axios.post(`${API_BASE_URL}/refresh`, { account_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["refreshTime", account_id] });
    },
  });
