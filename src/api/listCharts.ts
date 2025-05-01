import axios from "axios";
import { getErrorMessage } from "./utils";

// const API_BASE_URL = import.meta.env.VITE_API_URL;
// const LIST_CHARTS_ENDPOINT = `${API_BASE_URL}/list_charts`;

type ChartType = "pie" | "bar" | "line" | "area" | "radar" | "bar_negative"
type ChartMetric = "ctr" | "click" | "impression" | "spend"
type ChartSegment = "device" | "date"

type DeviceType = "mobile" | "desktop" | "tablet" | "other"
type SourceTable = "campaign" | "ad"
type PeriodType = "month" | "week" | "day" | "hour"

interface PeriodResponse {
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

export interface DataPoint {
  source_id: string
  source_table: SourceTable
  value: number
  date: Date
  device: DeviceType | null | undefined
}

export interface ChartResponse {
  chart: Chart
  data: DataPoint[]
}

export type ListChartsResponse = ChartResponse[]

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
          type: 'line',
          metric: 'ctr',
          period: {
            id: "23",
            type: "month",
            amount: 3
          },
          granularity: {
            id: "13",
            type: "week",
            amount: 1
          },
          sources: [{
            id: "224",
            chart_id: "456",
            source_table: "ad",
            source_id: "12"
          }],
          segment: null
        },
        data: [
          { source_table: 'campaign', source_id: 'acb', value: 5842, date: new Date(2025, 1, 1), device: "desktop" },
          { source_table: 'campaign', source_id: 'acb', value: 5382, date: new Date(2025, 2, 1), device: "desktop" },
          { source_table: 'campaign', source_id: 'acb', value: 382, date: new Date(2025, 3, 1), device: "desktop" },
          { source_table: 'campaign', source_id: 'acb', value: 12, date: new Date(2025, 4, 1), device: "mobile" },
          { source_table: 'campaign', source_id: 'acb', value: 1000, date: new Date(2025, 5, 1), device: "mobile" },
          { source_table: 'campaign', source_id: 'acb', value: 2000, date: new Date(2025, 6, 1), device: "mobile" },
        ],
      },
      // Pie chart example
      {
        chart: {
          id: '789',
          account_id: "asd",
          name: "device distribution",
          type: 'pie',
          metric: 'click',
          period: {
            id: "24",
            type: "month",
            amount: 1
          },
          granularity: {
            id: "14",
            type: "day",
            amount: 1
          },
          sources: [{
            id: "225",
            chart_id: "789",
            source_table: "campaign",
            source_id: "15"
          }],
          segment: "device"
        },
        data: [
          { source_table: 'campaign', source_id: '15', value: 1500, date: new Date(2025, 4, 1), device: "mobile" },
          { source_table: 'campaign', source_id: '15', value: 800, date: new Date(2025, 4, 1), device: "desktop" },
          { source_table: 'campaign', source_id: '15', value: 300, date: new Date(2025, 4, 1), device: "tablet" },
          { source_table: 'campaign', source_id: '15', value: 100, date: new Date(2025, 4, 1), device: "other" },
          { source_table: 'campaign', source_id: '15', value: 200, date: new Date(2025, 4, 2), device: "mobile" },
          { source_table: 'campaign', source_id: '15', value: 400, date: new Date(2025, 4, 2), device: "desktop" },
        ]
      },
      // Bar chart example
      {
        chart: {
          id: '101',
          account_id: "asd",
          name: "device distribution",
          type: 'bar',
          metric: 'impression',
          period: {
            id: "25",
            type: "month",
            amount: 4
          },
          granularity: {
            id: "15",
            type: "month",
            amount: 1
          },
          sources: [{
            id: "226",
            chart_id: "101",
            source_table: "ad",
            source_id: "16"
          }],
          segment: "device"
        },
        data: [
          { source_table: 'ad', source_id: '16', value: 12000, date: new Date(2025, 1, 1), device: null },
          { source_table: 'ad', source_id: '16', value: 18000, date: new Date(2025, 2, 1), device: null },
          { source_table: 'ad', source_id: '16', value: 15000, date: new Date(2025, 3, 1), device: null },
          { source_table: 'ad', source_id: '16', value: 21000, date: new Date(2025, 4, 1), device: null },
          { source_table: 'ad', source_id: '16', value: 25000, date: new Date(2025, 5, 1), device: null },
        ]
      },
      // Area chart example
      {
        chart: {
          id: '102',
          account_id: "asd",
          name: "spend over time",
          type: 'area',
          metric: 'spend',
          period: {
            id: "26",
            type: "week",
            amount: 2
          },
          granularity: {
            id: "16",
            type: "day",
            amount: 1
          },
          sources: [{
            id: "227",
            chart_id: "102",
            source_table: "campaign",
            source_id: "17"
          }],
          segment: "date"
        },
        data: [
          { source_table: 'campaign', source_id: '17', value: 125, date: new Date(2025, 3, 28), device: null },
          { source_table: 'campaign', source_id: '17', value: 150, date: new Date(2025, 3, 29), device: null },
          { source_table: 'campaign', source_id: '17', value: 175, date: new Date(2025, 3, 30), device: null },
          { source_table: 'campaign', source_id: '17', value: 200, date: new Date(2025, 3, 31), device: null },
          { source_table: 'campaign', source_id: '17', value: 225, date: new Date(2025, 4, 1), device: null },
          { source_table: 'campaign', source_id: '17', value: 250, date: new Date(2025, 4, 2), device: null },
        ]
      },
      // Radar chart example
      {
        chart: {
          id: '103',
          account_id: "asd",
          name: "performance metrics",
          type: 'radar',
          metric: 'ctr',
          period: {
            id: "27",
            type: "month",
            amount: 1
          },
          granularity: {
            id: "17",
            type: "week",
            amount: 1
          },
          sources: [
            {
              id: "228",
              chart_id: "103",
              source_table: "ad",
              source_id: "18"
            },
            {
              id: "229",
              chart_id: "103",
              source_table: "ad",
              source_id: "19"
            }
          ],
          segment: "device"
        },
        data: [
          { source_table: 'ad', source_id: '18', value: 2.5, date: new Date(2025, 4, 1), device: "mobile" },
          { source_table: 'ad', source_id: '18', value: 3.1, date: new Date(2025, 4, 1), device: "desktop" },
          { source_table: 'ad', source_id: '18', value: 1.8, date: new Date(2025, 4, 1), device: "tablet" },
          { source_table: 'ad', source_id: '19', value: 3.2, date: new Date(2025, 4, 1), device: "mobile" },
          { source_table: 'ad', source_id: '19', value: 2.9, date: new Date(2025, 4, 1), device: "desktop" },
          { source_table: 'ad', source_id: '19', value: 2.1, date: new Date(2025, 4, 1), device: "tablet" },
          { source_table: 'ad', source_id: '19', value: 3.5, date: new Date(2025, 4, 2), device: "mobile" },
          { source_table: 'ad', source_id: '19', value: 3.0, date: new Date(2025, 4, 2), device: "desktop" },
        ]
      },
      // BarNegative chart example
      {
        chart: {
          id: '104',
          account_id: "asd",
          name: "budget variance",
          type: 'bar_negative',
          metric: 'spend',
          period: {
            id: "28",
            type: "month",
            amount: 3
          },
          granularity: {
            id: "18",
            type: "month",
            amount: 1
          },
          sources: [{
            id: "230",
            chart_id: "104",
            source_table: "campaign",
            source_id: "20"
          }],
          segment: null
        },
        data: [
          { source_table: 'campaign', source_id: '20', value: -500, date: new Date(2025, 2, 1), device: null },
          { source_table: 'campaign', source_id: '20', value: 200, date: new Date(2025, 3, 1), device: null },
          { source_table: 'campaign', source_id: '20', value: -300, date: new Date(2025, 4, 1), device: null },
          { source_table: 'campaign', source_id: '20', value: 100, date: new Date(2025, 5, 1), device: null },
        ]
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
