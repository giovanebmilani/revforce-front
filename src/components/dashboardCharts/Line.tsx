import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartResponse } from "@/api/charts";
import { treatChartData } from "./treatChartData";

export function createDashboardLineChartComponent(
  response: ChartResponse,
  chartConfig: ChartConfig
) {
  const { data: entries, metadata } = treatChartData(response);

  return (
    <ChartContainer config={chartConfig} className="h-3/4 w-full">
      <LineChart
        accessibilityLayer
        data={entries}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="identifier"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {Object.keys(metadata).map((key) => (
          <Line
            key={key}
            dataKey={key}
            name={metadata[key].friendlyName}
            stroke={metadata[key].color}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
