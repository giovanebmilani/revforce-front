import { createFileRoute } from "@tanstack/react-router";

import * as React from "react";

import { Filter, RefreshCw, Pencil } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContext, ChartStyle } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { DateRangePresets } from "@/components/ui/dateRangePresets";
import { createDashboardAreaChartComponent } from "@/components/dashboardCharts/Area";
import { createDashboardBarChartComponent } from "@/components/dashboardCharts/Bar";
import { createDashboardLineChartComponent } from "@/components/dashboardCharts/Line";
import { createDashboardPieChartComponent } from "@/components/dashboardCharts/Pie";

import { ChartResponse, useGetChart } from "@/api/charts";
import { ResponsiveTabChat } from "@/components/ResponsiveTabChat";
import { ChatBubble } from "@/components/ChatBubble";
import { TabsComponent } from "@/components/TabsComponent";
import { ChatResponse, usePostChat } from "@/api/chat";

export const Route = createFileRoute(
  "/revforce/dashboard/chartdetails/$chartId"
)({ component: RouteComponent });

function handleRefresh() {
  // Espaço para atualizar dados
  console.log("Atualizar gráfico");
}

function handleEdit() {
  window.location.href = "/revforce/dashboard/newchart";
}

type ChartProviderProps = {
  config: ChartConfig;
  children: React.ReactNode;
};

function ChartProvider({ config, children }: ChartProviderProps) {
  return (
    <ChartContext.Provider value={{ config }}>{children}</ChartContext.Provider>
  );
}

function ErrorScreen() {
  return (
    <div>
      <h1>Something went wrong :(</h1>
    </div>
  );
}

const chartConfig = {
  desktop: { label: "Desktop", color: "#916860" },
  mobile: { label: "Mobile", color: "#E1AD00" },
  tablet: { label: "Tablet", color: "#008080" },
  other: { label: "Other", color: "#BE7405" },
  ad: { label: "Desktop", color: "#916860" },
  campaign: { label: "Mobile", color: "#E1AD00" },
} satisfies ChartConfig;

const createChartComponent = (response: ChartResponse) => {
  switch (response.chart.type) {
    case "bar":
      return createDashboardBarChartComponent(response, chartConfig);
    case "pizza":
      return createDashboardPieChartComponent(response, chartConfig);
    case "line":
      return createDashboardLineChartComponent(response, chartConfig);
    case "area":
      return createDashboardAreaChartComponent(response, chartConfig);
    default:
      return null;
  }
};

function RouteComponent() {
  const { chartId } = Route.useParams();
  const { data, isError } = useGetChart(chartId);
  const [bubbles, setBubbles] = React.useState<React.JSX.Element[]>([]);
  const [count, setCount] = React.useState(0);

  if (isError || !data) {
    return <ErrorScreen />;
  }

  const chartConfig: ChartConfig = {};

  return (
    <div className="w-full h-full">
      <h2 className="text-2xl font-bold italic mb-4 tracking-tight">
        Chart Details
      </h2>
      <div className="flex flex-row gap-5">
        <ChartProvider config={chartConfig}>
          <ChartStyle id="external-legend" config={chartConfig} />
          <Card className="w-full h-full">
            <CardHeader className="flex flex-wrap items-center justify-between gap-2 border-b sm:flex-row">
              <DateRangePresets
                onChange={(newRange) => {
                  data.data
                    .filter((item) => {
                      const itemDate = new Date(item.date);
                      return itemDate >= newRange.from && itemDate <= newRange.to;
                    })
                    .sort(
                      (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    );
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
            <CardContent>{createChartComponent(data)}</CardContent>
          </Card>
        </ChartProvider>

        <TabsComponent
          tabs={[
            {
              value: "events",
              label: "Eventos",
              content: <div>Eventos</div>,
            },
            {
              value: "chat",
              label: "Chat",
              content: <ResponsiveTabChat
                onSend={(text) => {
                  setBubbles((prev) => [
                    ...prev,
                    <ChatBubble
                      text={text}
                      isUser={true}
                      key={count}
                    />
                  ])
                  setCount(count + 1)
                  console.log("Texto enviado:", text)

                  const response = usePostChat(text, []).data // TODO: this breaks the rule of hooks

                  setBubbles((prev) => [
                    ...prev,
                    <ChatBubble
                      text={response?.response}
                      isUser={false}
                      key={count}
                    />
                  ])
                  setCount(count + 1)
                }}
                bubbles={bubbles}
              />,
            },
          ]}
          defaultValue="events"
          className="w-full h-full"
          containerClassName="w-1/2"
        />
      </div>
    </div>
  );
}

// A área lateral sumiu de onde vão ficar o chat e eventos! Precisa só deixar o espaço.

// Falta integrar!
