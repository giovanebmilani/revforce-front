import axios from "axios";
import { getErrorMessage } from "./utils";

// const API_BASE_URL = import.meta.env.VITE_API_URL;
// const LIST_CHARTS_ENDPOINT = `${API_BASE_URL}/list_charts`;

type ChartType = "Pie" | "Bar" | "Line" | "Area" | "Radar" | "BarNegative"
type ChartMetric = "Ctr" | "Click" | "Impression" | "spend"
type ChartSegment = "Device" | "Date"

type DeviceType = "Mobile" | "Desktop" | "Tablet" | "Other"
type SourceTable = "Campaign" | "Ad"
type PeriodType = "Month" | "Week" | "Day" | "Hour"

interface PeriodResponse{
  id: string
  type: PeriodType
  amount: number
}

interface SourceResponse {
  id: string
  chart_id: string
  source_table: SourceTable
  source_id: string
}

export interface Chart {
  id: string
  account_id: string
  name: string
  type: ChartType 
  metric: ChartMetric
  period: PeriodResponse
  granularity: PeriodResponse
  sources: SourceResponse[]
  segment: ChartSegment | null | undefined
}

interface DataPoint {
  source_id: string
  source_table: SourceTable
  value: number
  date: Date
  device: DeviceType | null | undefined
}

interface ChartResponse {
  chart: Chart
  data: DataPoint[]
}

type ListChartsResponse = ChartResponse[]

export const listCharts = async (): Promise<ListChartsResponse> => {
  try {
    // const response = await axios.get(LIST_CHARTS_ENDPOINT);
    // return response.data;
    return [
      {
        chart: {
            id: '456',
            account_id: "asd",
            name: "linha que desce",
            type: 'Line',
            metric: 'Ctr',
            period: {
              id: "23",
              type: "Month",
              amount: 3
            },
            granularity: {
              id: "13",
              type: "Week",
              amount: 1
            },
            sources: [ { 
              id: "224",
              chart_id: "456",
              source_table: "Ad",
              source_id: "12" } ],
            segment: null
        },
            data: [
            { source_table: 'Campaign', source_id: 'acb', value: 5842, date: new Date(2025,1,1), device: null},
            { source_table: 'Campaign', source_id: 'acb', value: 5382, date: new Date(2025,2,1), device: null},
            { source_table: 'Campaign', source_id: 'acb', value: 382, date: new Date(2025,3,1), device: null},
            { source_table: 'Campaign', source_id: 'acb', value: 12, date: new Date(2025,4,1), device: null},
        ],
    }
    ]
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const friendlyMessage = getErrorMessage(error);
      throw new Error(friendlyMessage);
    } else {
      throw new Error("Ocorreu um erro inesperado na aplicação.");
    }
  }
};
