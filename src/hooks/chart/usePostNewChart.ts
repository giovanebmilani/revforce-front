import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

interface Period {
  type: string;
  amount: number;
}

interface Granularity {
  type: string;
  amount: number;
}

interface Sources {
  source_table: string;
  source_id: string;
}

interface ChartParams {
  account_id: string;
  name: string;
  type: string;
  metric: string;
  period: Period;
  granularity: Granularity;
  sources: Sources[];
  segment: string;
}
export const usePostNewChart = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: AxiosError) => void;
}) => {
  return useMutation({
    mutationFn: async (chart: ChartParams) => {
      console.log("Chart:", chart);
      const response = await axios.post(`${API_BASE_URL}/chart/`, chart);
      return response.data;
    },
    onSuccess: () => {
      console.log("Chart created successfully");
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: any) => {
      console.error("Error creating chart:", error);
      if (onError) {
        onError(error);
      }
    },
  });
};
