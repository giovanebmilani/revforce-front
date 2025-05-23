import { createFileRoute, useNavigate } from "@tanstack/react-router";

import * as React from "react";

import { Filter, RefreshCw, Pencil, Trash } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContext, ChartStyle } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { DateRangePresets } from "@/components/ui/dateRangePresets";
import { createDashboardAreaChartComponent } from "@/components/dashboardCharts/Area";
import { createDashboardBarChartComponent } from "@/components/dashboardCharts/Bar";
import { createDashboardLineChartComponent } from "@/components/dashboardCharts/Line";
import { createDashboardPieChartComponent } from "@/components/dashboardCharts/Pie";

import { ChartResponse, useDeleteChart, useGetChart } from "@/api/charts";
import { ResponsiveTabChat } from "@/components/ResponsiveTabChat";
import { ChatBubble } from "@/components/ChatBubble";
import { TabsComponent } from "@/components/TabsComponent";
import { ChatHistoryMessage, usePostChat } from "@/api/chat";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute(
  "/revforce/dashboard/chartdetails/$chartId"
)({ component: RouteComponent });

function handleRefresh() {
  // Espaço para atualizar dados
  console.log("Atualizar gráfico");
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
      <h1>Something went wrong</h1>
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
  const { data, isError, isLoading, isSuccess } = useGetChart(chartId);
  const [bubbles, setBubbles] = React.useState<React.JSX.Element[]>([]);
  const [count, setCount] = React.useState(0);

  const { data: postChatData, mutate } = usePostChat();
  var chatHistory: ChatHistoryMessage[] = [];

  React.useEffect(() => {
    if (!postChatData?.response) return;

    setBubbles((prev) => [
      ...prev,
      <ChatBubble
        text={postChatData?.response || ""}
        isUser={false}
        key={count}
      />,
    ]);
    setCount(count + 1);

    chatHistory.push({
      role: "assistant",
      content: postChatData?.response || "",
    });
  }, [postChatData]);
  const {
    mutate: deleteChart,
    isPending,
    isError: isDeletedError,
  } = useDeleteChart();
  const chartConfig: ChartConfig = {};
  const navigate = useNavigate();

  function handleEdit() {
    navigate({
      to: `/revforce/dashboard/newchart`,
    });
  }

  function handleDelete() {
    deleteChart(chartId, {
      onSuccess: () => {
        navigate({
          to: `/revforce/dashboard`,
        });
      },
    });
  }

  if (isError) {
    return <ErrorScreen />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-row min-h-screen justify-center items-center h-full w-full">
        <Spinner></Spinner>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="h-full w-full">
        <h2 className="text-2xl font-bold italic mb-4 tracking-tight">
          Chart Details
        </h2>
        {isDeletedError && (
          <h3 className="text-red-500">Ocorreu um erro ao apagar o gráfico.</h3>
        )}
        <ChartProvider config={chartConfig}>
          <ChartStyle id="external-legend" config={chartConfig} />
          <Card>
            <CardHeader className="flex flex-wrap items-center justify-between gap-2 border-b sm:flex-row">
              <DateRangePresets
                onChange={(newRange) => {
                  data.data
                    .filter((item) => {
                      const itemDate = new Date(item.date);
                      return (
                        itemDate >= newRange.from && itemDate <= newRange.to
                      );
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
                <Button variant="outline" onClick={handleDelete}>
                  <Trash className="h-4 w-4" />
                  Apagar
                </Button>
              </div>
            </CardHeader>
            {isPending ? (
              <div className="flex flex-row min-h-screen justify-center items-center h-full w-full">
                <Spinner></Spinner>
              </div>
            ) : (
              <CardContent>{createChartComponent(data)}</CardContent>
            )}
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
              content: (
                <ResponsiveTabChat
                  onSend={(text) => {
                    setBubbles((prev) => [
                      ...prev,
                      <ChatBubble text={text} isUser={true} key={count} />,
                    ]);
                    setCount(count + 1);

                    chatHistory.push({
                      role: "user",
                      content: postChatData?.response || "",
                    });

                    mutate({
                      question: text,
                      history: chatHistory,
                      chart_id: chartId,
                    });
                  }}
                  bubbles={bubbles}
                  classname="w-full h-full"
                />
              ),
            },
          ]}
          defaultValue="events"
          className="w-full h-full"
          containerClassName="w-1/2 max-h-full"
        />
      </div>
    );
  }
}
