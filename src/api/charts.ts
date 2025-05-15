import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getErrorMessage } from "./utils";
import { ChartType } from "@/components/ChartSelect";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const ACCOUNT_ID = localStorage.getItem("account_id");
const LIST_CHARTS_ENDPOINT = `${API_BASE_URL}/chart/${ACCOUNT_ID}/all`;
const CREAT_CHART_ENDPOINT = `${API_BASE_URL}/chart/`;
const makeGetChartEndpoint = (chartId: string) =>
  `${API_BASE_URL}/chart/${chartId}`;

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

interface SourceRequest {
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

export interface CreateChartRequest {
  account_id: string
  name: string;
  type: ChartType;
  metric: ChartMetric;
  period: PeriodResponse;
  granularity: PeriodResponse;
  sources: SourceRequest[];
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
          console.error("Unexpected error:", error);
          throw new Error("Ocorreu um erro inesperado na aplicação.");
        }
      }
    },
    refetchOnWindowFocus: true,
  });
};

export const usePostNewChart = () => {
  return useMutation<string, Error, CreateChartRequest>({
    mutationFn: async (chart: CreateChartRequest) => {
      try {
        const response = await axios.post<string>(CREAT_CHART_ENDPOINT,chart, {
          headers: {
            "Content-Type": "application/json",
          }
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
    },
  });
};

export const useGetChart = (chartId: string) => {
  return useQuery<ChartResponse, Error>({
    queryKey: [`get-${chartId}`],
    queryFn: async () => {
      try {
        const response = await axios.get<ChartResponse>(
          makeGetChartEndpoint(chartId),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

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
  });
};
