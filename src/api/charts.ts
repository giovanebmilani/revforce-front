import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "./utils";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ACCOUNT_ID = localStorage.getItem("account_id");
const LIST_CHARTS_ENDPOINT = `${API_BASE_URL}/chart/${ACCOUNT_ID}/all`;
console.log("LIST_CHARTS_ENDPOINT", LIST_CHARTS_ENDPOINT);

export type ChartType = "pizza" | "bar" | "line" | "area";
export type ChartMetric = "ctr" | "click" | "impression" | "spend";
export type ChartSegment = "device" | "date" | "source_table" | "source_id";

export type DeviceType = "mobile" | "desktop" | "tablet" | "other";
export type SourceTable = "campaign" | "ad";
export type PeriodType = "month" | "week" | "day" | "hour";

interface PeriodResponse {
  type: PeriodType;
  amount: number;
}

interface SourceResponse {
  chart_id: string;
  source_table: SourceTable;
  source_id: string;
}

export interface Chart {
  id: string;
  account_id: string;
  name: string;
  type: ChartType;
  metric: ChartMetric;
  period: PeriodResponse;
  granularity: PeriodResponse;
  sources: SourceResponse[];
  segment: ChartSegment | null | undefined;
}

export interface DataPoint {
  source_id: string;
  source_table: SourceTable;
  value: number;
  date: string;
  device: DeviceType | null | undefined;
}

export interface ChartResponse {
  chart: Chart;
  data: DataPoint[];
}

export type ListChartsResponse = ChartResponse[];

export const useListCharts = () => {
  return useQuery<ListChartsResponse, Error>({
    queryKey: ["listCharts"],
    queryFn: async () => {
      try {
        if (!ACCOUNT_ID) {
          throw new Error("Account ID not found in local storage.");
        }
        const response = await axios.get<ListChartsResponse>(
          LIST_CHARTS_ENDPOINT,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response from API:", response.data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const friendlyMessage = getErrorMessage(error);
          throw new Error(friendlyMessage);
        } else {
          throw new Error("Ocorreu um erro inesperado na aplicação.");
        }
      }
    },
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000,
  });
};
