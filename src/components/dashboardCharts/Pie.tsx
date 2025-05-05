import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartResponse } from "@/api/listCharts";

interface PieChartDataItem {
  identifier: string;
  value: number;
  fill: string;
}

function treatDataForPie(response: ChartResponse): PieChartDataItem[] {
  const pieDict: { [key: string]: number } = {};

  response.data.forEach((value) => {
    if (typeof response.chart.segment === "string") {
      const key = String(value[response.chart.segment] ?? "unknown");
      if (key in pieDict) {
        pieDict[key] += value.value;
      } else {
        pieDict[key] = value.value;
      }
    }
  });

  const pieData: PieChartDataItem[] = [];
  Object.keys(pieDict).forEach((value) => {
    pieData.push({
      identifier: value,
      value: pieDict[value],
      fill: `var(--color-${value})`,
    });
  });

  return pieData;
}

export function createDashboardPieChartComponent(
  response: ChartResponse,
  chartConfig: ChartConfig
) {
  const entries = treatDataForPie(response);

  return (
    <ChartContainer
      config={chartConfig}
      className="h-5/6 w-full mx-auto pb-0 [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <Pie data={entries} dataKey="value" nameKey={"identifier"} />
        <ChartLegend
          content={<ChartLegendContent nameKey="identifier" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
      </PieChart>
    </ChartContainer>
  );
}
