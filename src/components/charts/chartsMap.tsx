import { JSX } from "react";
import { ChartConfig } from "../ui/chart";
import { Component as AreaStacked } from "./areaStacked";
import { Component as BarHoriz } from "./barHoriz";
import { Component as BarMult } from "./barMult";
import { Component as BarVertic } from "./barVertic";
import { Component as LineMult } from "./lineMult";
import { Component as LineSimple } from "./lineSimple";
import { Component as PizzaLegend } from "./pizzaLegend";

export const chartsMap: Record<
  string,
  {
    Component: ({
      data,
      config,
      title,
      description,
    }: {
      data: any;
      config: ChartConfig;
      title: string;
      description: string;
    }) => Promise<JSX.Element>;
    adaptData: (apiResponde: any) => Record<string, any>[];
  }
> = {
  areaStacked: {
    Component: AreaStacked,
    adaptData: (apiResponse: any) => {
      return apiResponse.data || [];

      /*
      const chart = apiResponse.chart;
      const data = apiResponse.data;

      if (!data || data.length === 0) return [];

      const segmentKey = chart.segment;
      const dateKey = "date";

      const grouped: Record<string, Record<string, any>> = {};

      data.forEach((item: any) => {
        const date = item[dateKey].slice(0, 10);
        const segmentValue = item[segmentKey];
        const value = item.value;

        if (!grouped[date]) {
          grouped[date] = { date };
        }

        grouped[date][segmentValue] =
          (grouped[date][segmentValue] || 0) + value;
      });

      return Object.values(grouped);
      */
    },
  },
  barHoriz: {
    Component: BarHoriz,
    adaptData: (apiResponse: any) => {
      return apiResponse.data || [];

      /*
      const chart = apiResponse.chart;
      const data = apiResponse.data;

      if (!data || data.length === 0) return [];

      const segmentKey = chart.segment;

      const grouped: Record<string, Record<string, any>> = {};

      data.forEach((item: any) => {
        const month = item[monthKey] || item.date;
        const segmentValue = item[segmentKey];
        const value = item.value;

        if (!grouped[month]) {
          grouped[month] = { month };
        }

        grouped[month][segmentValue] =
          (grouped[month][segmentValue] || 0) + value;
      });

      return Object.values(grouped);
      */
    },
  },
  barMult: {
    Component: BarMult,
    adaptData: (apiResponse: any) => {
      return apiResponse.data || [];
    },
  },
  barVertic: {
    Component: BarVertic,
    adaptData: (apiResponse: any) => {
      return apiResponse.data || [];
    },
  },
  lineMult: {
    Component: LineMult,
    adaptData: (apiResponse: any) => {
      return apiResponse.data || [];
    },
  },
  lineSimple: {
    Component: LineSimple,
    adaptData: (apiResponse: any) => {
      return apiResponse.data || [];
    },
  },
  pizzaLegend: {
    Component: PizzaLegend,
    adaptData: (apiResponse: any) => {
      return apiResponse.data || [];
    },
  },
};
