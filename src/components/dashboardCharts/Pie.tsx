import { Pie, PieChart } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartMetric, ChartResponse, SourceTable } from "@/api/charts";

interface PieChartDataItem {
  identifier: string;
  value: number;
  fill: string;
}

function getRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 20) + 70;
  const lightness = Math.floor(Math.random() * 20) + 50;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function getSourceName(sourceTable: SourceTable, sourceId: string): string {
  return sourceTable === "campaign"
    ? `Campanha #${sourceId}`
    : `Anúncio #${sourceId}`;
}

function getMetricName(metricKey: ChartMetric): string {
  switch (metricKey) {
    case "impression":
      return "Impressoes";
    case "spend":
      return "Investimento";
    case "ctr":
      return "Taxa de Cliques (CTR)";
    case "click":
      return "Cliques";
    default:
      return metricKey;
  }
}

function treatDataForPie(response: ChartResponse): PieChartDataItem[] {
  const pieDict: { [key: string]: number } = {};
  const itemLabels: { [key: string]: string } = {};
  const itemColors: { [key: string]: string } = {};

  response.data.forEach((dataPoint) => {
    const internalKey = `${dataPoint.source_table}-${dataPoint.source_id}-${dataPoint.metric}`;
    const friendlySourceName = getSourceName(
      dataPoint.source_table,
      dataPoint.source_id
    );
    const friendlyMetricName = getMetricName(dataPoint.metric);
    const combinedLabel = `${friendlySourceName} - ${friendlyMetricName}`;

    if (internalKey in pieDict) {
      pieDict[internalKey] += dataPoint.value;
    } else {
      pieDict[internalKey] = dataPoint.value;
      itemLabels[internalKey] = combinedLabel;
      itemColors[internalKey] = getRandomColor();
    }
  });

  const pieData: PieChartDataItem[] = [];
  Object.keys(pieDict).forEach((key) => {
    pieData.push({
      identifier: itemLabels[key],
      value: pieDict[key],
      fill: itemColors[key],
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
        <ChartTooltip
          content={<ChartTooltipContent/>}
        />
      </PieChart>
    </ChartContainer>
  );
}
