import { ChartResponse } from "@/api/charts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { treatChartData } from "./treatChartData";

export function createDashboardBarChartComponent(
  response: ChartResponse,
  chartConfig: ChartConfig
) {
  const entries = treatChartData(response);

  console.log("entries", entries);

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <BarChart accessibilityLayer data={entries}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="identifier"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        {Object.keys(entries[0] || {}).map(
          (key) =>
            key !== "identifier" && (
              <Bar dataKey={key} fill={`var(--color-${key})`} radius={4} />
            )
        )}
      </BarChart>
    </ChartContainer>
  );
}
