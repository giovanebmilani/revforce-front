import axios from "axios";
import { getErrorMessage } from "./utils";

// const API_BASE_URL = import.meta.env.VITE_API_URL;
// const LIST_CHARTS_ENDPOINT = `${API_BASE_URL}/list_charts`;

interface ChartEntry { //;-;
  month: string;
  desktop: number;
  mobile: number;
}

type Chart = ChartEntry[]
type ListChartsResponse = Chart[]

export const listCharts = async (): Promise<ListChartsResponse> => {
  try {
    // const response = await axios.get(LIST_CHARTS_ENDPOINT);
    // return response.data;
    return [
      [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
      ],

      [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
      ]
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
