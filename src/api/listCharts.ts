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
      },
      // Pie chart example
      {
        chart: {
          id: '789',
          account_id: "asd",
          name: "Device Distribution",
          type: 'Pie',
          metric: 'Click',
          period: {
            id: "24",
            type: "Month",
            amount: 1
          },
          granularity: {
            id: "14",
            type: "Day",
            amount: 1
          },
          sources: [{
            id: "225",
            chart_id: "789",
            source_table: "Campaign",
            source_id: "15"
          }],
          segment: "Device"
        },
        data: [
          { source_table: 'Campaign', source_id: '15', value: 1500, date: new Date(2025,4,1), device: "Mobile"},
          { source_table: 'Campaign', source_id: '15', value: 800, date: new Date(2025,4,1), device: "Desktop"},
          { source_table: 'Campaign', source_id: '15', value: 300, date: new Date(2025,4,1), device: "Tablet"},
          { source_table: 'Campaign', source_id: '15', value: 100, date: new Date(2025,4,1), device: "Other"},
        ]
      },
      // Bar chart example
      {
        chart: {
          id: '101',
          account_id: "asd",
          name: "Monthly Impressions",
          type: 'Bar',
          metric: 'Impression',
          period: {
            id: "25",
            type: "Month",
            amount: 4
          },
          granularity: {
            id: "15",
            type: "Month",
            amount: 1
          },
          sources: [{
            id: "226",
            chart_id: "101",
            source_table: "Ad",
            source_id: "16"
          }],
          segment: null
        },
        data: [
          { source_table: 'Ad', source_id: '16', value: 12000, date: new Date(2025,1,1), device: null},
          { source_table: 'Ad', source_id: '16', value: 18000, date: new Date(2025,2,1), device: null},
          { source_table: 'Ad', source_id: '16', value: 15000, date: new Date(2025,3,1), device: null},
          { source_table: 'Ad', source_id: '16', value: 21000, date: new Date(2025,4,1), device: null},
        ]
      },
      // Area chart example
      {
        chart: {
          id: '102',
          account_id: "asd",
          name: "Spend Over Time",
          type: 'Area',
          metric: 'spend',
          period: {
            id: "26",
            type: "Week",
            amount: 2
          },
          granularity: {
            id: "16",
            type: "Day",
            amount: 1
          },
          sources: [{
            id: "227",
            chart_id: "102",
            source_table: "Campaign",
            source_id: "17"
          }],
          segment: "Date"
        },
        data: [
          { source_table: 'Campaign', source_id: '17', value: 125, date: new Date(2025,3,28), device: null},
          { source_table: 'Campaign', source_id: '17', value: 150, date: new Date(2025,3,29), device: null},
          { source_table: 'Campaign', source_id: '17', value: 175, date: new Date(2025,3,30), device: null},
          { source_table: 'Campaign', source_id: '17', value: 200, date: new Date(2025,3,31), device: null},
          { source_table: 'Campaign', source_id: '17', value: 225, date: new Date(2025,4,1), device: null},
        ]
      },
      // Radar chart example
      {
        chart: {
          id: '103',
          account_id: "asd",
          name: "Performance Metrics",
          type: 'Radar',
          metric: 'Ctr',
          period: {
            id: "27",
            type: "Month",
            amount: 1
          },
          granularity: {
            id: "17",
            type: "Week",
            amount: 1
          },
          sources: [
            {
              id: "228",
              chart_id: "103",
              source_table: "Ad",
              source_id: "18"
            },
            {
              id: "229",
              chart_id: "103",
              source_table: "Ad",
              source_id: "19"
            }
          ],
          segment: "Device"
        },
        data: [
          { source_table: 'Ad', source_id: '18', value: 2.5, date: new Date(2025,4,1), device: "Mobile"},
          { source_table: 'Ad', source_id: '18', value: 3.1, date: new Date(2025,4,1), device: "Desktop"},
          { source_table: 'Ad', source_id: '18', value: 1.8, date: new Date(2025,4,1), device: "Tablet"},
          { source_table: 'Ad', source_id: '19', value: 3.2, date: new Date(2025,4,1), device: "Mobile"},
          { source_table: 'Ad', source_id: '19', value: 2.9, date: new Date(2025,4,1), device: "Desktop"},
          { source_table: 'Ad', source_id: '19', value: 2.1, date: new Date(2025,4,1), device: "Tablet"},
        ]
      },
      // BarNegative chart example
      {
        chart: {
          id: '104',
          account_id: "asd",
          name: "Budget Variance",
          type: 'BarNegative',
          metric: 'spend',
          period: {
            id: "28",
            type: "Month",
            amount: 3
          },
          granularity: {
            id: "18",
            type: "Month",
            amount: 1
          },
          sources: [{
            id: "230",
            chart_id: "104",
            source_table: "Campaign",
            source_id: "20"
          }],
          segment: null
        },
        data: [
          { source_table: 'Campaign', source_id: '20', value: -500, date: new Date(2025,2,1), device: null},
          { source_table: 'Campaign', source_id: '20', value: 200, date: new Date(2025,3,1), device: null},
          { source_table: 'Campaign', source_id: '20', value: -300, date: new Date(2025,4,1), device: null},
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
