import { useMutation } from "@tanstack/react-query";
import axios from "axios";

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
  name: string;
  type: string;
  metric: string;
  period: Period;
  granularity: Granularity;
  sources: Sources[];
  segment: string;
}
export const usePostNewChart = ({ onSuccess }: { onSuccess?: () => void }) => {
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
  });
};
