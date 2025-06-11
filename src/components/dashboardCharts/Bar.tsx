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
  // Extrai dados E metadados da função de tratamento
  const { data: entries, metadata } = treatChartData(response);

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
        {Object.keys(metadata).map((key) => (
          <Bar
            key={key}
            dataKey={key}
            name={metadata[key].friendlyName} // Nome amigável para tooltip
            fill={metadata[key].color} // Cor consistente
            radius={4}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
