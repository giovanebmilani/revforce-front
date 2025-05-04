import { ChartResponse } from "@/api/listCharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis } from "recharts";
import { treatChartData } from "./treatChartData";

export function createDashboardBarChartComponent(
  response: ChartResponse,
  chartConfig: ChartConfig
) {
  const entries = treatChartData(response)

  return (
    <ChartContainer config={chartConfig} className="h-3/4 w-full">
      <BarChart accessibilityLayer data={entries}>
        <XAxis
          dataKey="identifier"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />

        {
          Object.keys(entries[0] || {}).filter(key => typeof entries[0][key] !== 'string').map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={chartConfig[index % Object.keys(chartConfig).length] || chartConfig.other.color}
              radius={4}
            />
          ))
        }
      </BarChart>
    </ChartContainer>
  );
}
