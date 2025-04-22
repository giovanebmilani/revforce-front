import axios from "axios";
import { getErrorMessage } from "./utils";

// const API_BASE_URL = import.meta.env.VITE_API_URL;
// const LIST_CHARTS_ENDPOINT = `${API_BASE_URL}/list_charts`;

export interface Chart {
  type: "Pie" | "Bar" | "Line"
  entries: ChartEntry[]
}

interface ChartEntry { //;-;
  identifier: string;
  value: number;
}

type ListChartsResponse = Chart[]

export const listCharts = async (): Promise<ListChartsResponse> => {
  try {
    // const response = await axios.get(LIST_CHARTS_ENDPOINT);
    // return response.data;
    return [
      {
        type: "Bar",

        entries: [
          { identifier: "January", value: 186 },
          { identifier: "February", value: 305 },
          { identifier: "March", value: 237 },
          { identifier: "April", value: 73 },
          { identifier: "May", value: 209 },
          { identifier: "June", value: 214 },
        ]
      },

      {
        type: "Pie",

        entries: [
          { identifier: 'Group A', value: 400 },
          { identifier: 'Group B', value: 300 },
          { identifier: 'Group C', value: 200 },
          { identifier: 'Group D', value: 100 },
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
