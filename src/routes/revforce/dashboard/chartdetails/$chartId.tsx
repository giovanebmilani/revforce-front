import { createFileRoute } from "@tanstack/react-router";

import * as React from "react";

import { Filter, RefreshCw, Pencil } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContext, ChartStyle } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { chartsMap } from "@/components/charts/chartsMap";
import { DateRangePresets } from "@/components/ui/dateRangePresets";

export const Route = createFileRoute(
  "/revforce/dashboard/chartdetails/$chartId"
)({
  component: RouteComponent,
  loader: async ({ params }) => {
    try {
      const response = await fetch(
        `http://localhost:5173/api/charts/${params.chartId}`
      );
      const json = await response.json();
      return {
        chartData: json.data,
        chartInfo: json.chart,
      };
    } catch (error) {
      console.error("Erro ao buscar dados do gráfico", error);

      const mockData = [
        { date: "2025-05-01", desktop: 100, mobile: 50, mock: true },
        { date: "2025-05-02", desktop: 120, mobile: 60, mock: true },
        { date: "2025-04-20", desktop: 130, mobile: 70, mock: true },
        { date: "2025-03-04", desktop: 110, mobile: 55, mock: true },
        { date: "2025-01-05", desktop: 140, mobile: 75, mock: true },
        { date: "2024-05-04", desktop: 110, mobile: 55, mock: true },
        { date: "2024-05-05", desktop: 140, mobile: 75, mock: true },
        { date: "2023-05-04", desktop: 110, mobile: 55, mock: true },
        { date: "2022-05-05", desktop: 140, mobile: 75, mock: true },
      ];

      const mockChart = {
        title: "Mocked Chart",
        description: "Isso é um mock.",
        colors: {
          desktop: "#916860",
          mobile: "#E1AD00",
        },
        type: "areaStacked",
      };

      return {
        chartData: mockData,
        chartInfo: mockChart,
      };
    }
  },
});

function handleRefresh() {
  // Espaço para atualizar dados
  console.log("Atualizar gráfico");
}

function handleEdit() {
  window.location.href = "/revforce/dashboard/newchart";
}

function ChartProvider({
  config,
  children,
}: {
  config: ChartConfig;
  children: React.ReactNode;
}) {
  return (
    <ChartContext.Provider value={{ config }}>{children}</ChartContext.Provider>
  );
}

function RouteComponent() {
  const [filteredData, setFilteredData] = React.useState<any[]>([]);

  const { chartData, chartInfo } = Route.useLoaderData() as {
    chartData: any[];
    chartInfo: any;
  };

  const chartEntry = chartsMap[chartInfo?.type];
  const adaptedData = chartEntry?.adaptData
    ? chartEntry.adaptData({ chart: chartInfo, data: chartData })
    : [];

  const chartConfig: ChartConfig = {};

  if (chartInfo?.colors) {
    Object.keys(chartInfo.colors).forEach((segment) => {
      chartConfig[segment] = {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        color: chartInfo.colors[segment],
      };
    });
  }

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold italic mb-4 tracking-tight">
        {" "}
        Chart Details{" "}
      </h2>
      <ChartProvider config={chartConfig}>
        <ChartStyle id="external-legend" config={chartConfig} />
        <Card>
          <CardHeader className="flex flex-wrap items-center justify-between gap-2 space-y-0 border-b sm:flex-row">
            <DateRangePresets
              onChange={(newRange) => {
                const result = chartData
                  .filter((item) => {
                    const itemDate = new Date(item.date);
                    return itemDate >= newRange.from && itemDate <= newRange.to;
                  })
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  );
                setFilteredData(result);
              }}
            />
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="h-4 w-4" />
                Filtro
              </Button>
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4" />
                Atualizar
              </Button>
              <Button variant="outline" onClick={handleEdit}>
                <Pencil className="h-4 w-4" />
                Editar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {chartEntry?.Component && (
              <chartEntry.Component
                data={filteredData.length > 0 ? filteredData : adaptedData}
                config={chartConfig}
                title={chartInfo?.title || "Chart"}
                description={chartInfo?.description}
              />
            )}
          </CardContent>
        </Card>
      </ChartProvider>
    </div>
  );
}


// A área lateral sumiu de onde vão ficar o chat e eventos! Precisa só deixar o espaço.

// Falta integrar!