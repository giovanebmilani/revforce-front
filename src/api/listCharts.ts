import axios from "axios";
import { getErrorMessage } from "./utils";

// const API_BASE_URL = import.meta.env.VITE_API_URL;
// const LIST_CHARTS_ENDPOINT = `${API_BASE_URL}/list_charts`;

export interface Chart {
  chartId: string
  chartType: "Pie" | "Bar" | "Line" | "Area" | "Radar" | "BarNegative"
  entries: ChartEntry[]
}

interface ChartEntry { //
  [key: string]: number | string;
}

type ListChartsResponse = Chart[]

export const listCharts = async (): Promise<ListChartsResponse> => {
  try {
    // const response = await axios.get(LIST_CHARTS_ENDPOINT);
    // return response.data;
    return [
      {
        chartId: "1",
        chartType: "Bar",

        entries: [
          { identifier: "January", value: 186, otherValue : 20 },
          { identifier: "February", value: 305, otherValue : 40 },
          { identifier: "March", value: 237, otherValue : 60 },
          { identifier: "April", value: 73, otherValue : 200 },
          { identifier: "May", value: 209, otherValue : 120 },
          { identifier: "June", value: 214, otherValue : 140 },
        ]
      },

      {
        chartId: "2",
        chartType: "Pie",

        entries: [
          { identifier: 'Group A', value: 400 },
          { identifier: 'Group B', value: 300 },
          { identifier: 'Group C', value: 200 },
          { identifier: 'Group D', value: 100 },
        ]
      },

      {
        chartId: "3",
        chartType: "Line",

        entries: [
          { identifier: "January", value: 186, otherValue : 20 },
          { identifier: "February", value: 305, otherValue : 40 },
          { identifier: "March", value: 237, otherValue : 60 },
          { identifier: "April", value: 73, otherValue : 200 },
          { identifier: "May", value: 209, otherValue : 120 },
          { identifier: "June", value: 214, otherValue : 140 },
        ]
      },

      {
        chartId: "4",
        chartType: "Area",

        entries: [
          { identifier: "January", value: 186, otherValue : 20 },
          { identifier: "February", value: 305, otherValue : 40 },
          { identifier: "March", value: 237, otherValue : 60 },
          { identifier: "April", value: 73, otherValue : 200 },
          { identifier: "May", value: 209, otherValue : 120 },
          { identifier: "June", value: 214, otherValue : 140 },
        ]
      },

      {
        chartId: "5",
        chartType: "Radar",

        entries: [
          { identifier: "January", value: 186, otherValue : 20 },
          { identifier: "February", value: 305, otherValue : 40 },
          { identifier: "March", value: 237, otherValue : 60 },
          { identifier: "April", value: 73, otherValue : 200 },
          { identifier: "May", value: 209, otherValue : 120 },
          { identifier: "June", value: 214, otherValue : 140 },
        ]
      },
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
