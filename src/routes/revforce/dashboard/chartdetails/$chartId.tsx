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

const exampleChartConfig = {
  desktop: { label: "Desktop", color: "#916860" },
  mobile: { label: "Mobile", color: "#E1AD00" },
  tablet: { label: "Tablet", color: "#008080" },
  other: { label: "Other", color: "#BE7405" },
  ad: { label: "Ad", color: "#916860" },
  campaign: { label: "Campaign", color: "#E1AD00" },
} satisfies ChartConfig;

const createChartComponent = (response: ChartResponse) => {
  switch (response.chart.type) {
    case "bar":
      return createDashboardBarChartComponent(response, exampleChartConfig);
    case "pizza":
      return createDashboardPieChartComponent(response, exampleChartConfig);
    case "line":
      return createDashboardLineChartComponent(response, exampleChartConfig);
    case "area":
      return createDashboardAreaChartComponent(response, exampleChartConfig);
    default:
      return null;
  }
};

function RouteComponent() {
  const { chartId } = Route.useParams();
  const { data, isError, isLoading, isSuccess } = useGetChart(chartId);

  const [bubbles, setBubbles] = React.useState<React.JSX.Element[]>([]);
  const [chatHistory, setChatHistory] = React.useState<ChatHistoryMessage[]>(
    []
  );
  const bubbleKeyCounter = React.useRef(0);

  const { data: postChatData, mutate } = usePostChat();

  React.useEffect(() => {
    if (!postChatData?.response) return;

    const assistantMessageContent = postChatData.response;
    setBubbles((prevBubbles) => [
      ...prevBubbles,
      <ChatBubble
        text={assistantMessageContent}
        isUser={false}
        key={`assistant-${bubbleKeyCounter.current++}`}
      />,
    ]);

    setChatHistory((prevHistory) => [
      ...prevHistory,
      {
        role: "assistant",
        content: assistantMessageContent,
      },
    ]);
  }, [postChatData]);

  const {
    mutate: deleteChart,
    isPending: isDeletingChart,
    isError: isDeletedError,
  } = useDeleteChart();
  const currentChartConfig: ChartConfig = exampleChartConfig;
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
      <div className="flex min-h-screen justify-center items-center h-full w-full">
        <Spinner />
      </div>
    );
  }

  if (isSuccess && data) {
    return (
      <div className="flex flex-col h-full w-full p-4 space-y-4">
        <h2 className="text-2xl font-bold italic tracking-tight">
          Chart Details
        </h2>
        {isDeletedError && (
          <h3 className="text-red-500">Ocorreu um erro ao apagar o gráfico.</h3>
        )}

        <div className="flex flex-row flex-1 gap-4 overflow-hidden">
          <div className="w-[70%] flex flex-col overflow-hidden">
            <ChartProvider config={currentChartConfig}>
              <ChartStyle id="external-legend" config={currentChartConfig} />
              <Card className="flex-1 flex flex-col">
                {" "}
                <CardHeader className="flex flex-wrap gap-2 border-b sm:flex-row">
                  <div className="flex gap-2 flex-wrap">
                    {" "}
                    <Button variant="outline" size="sm">
                      {" "}
                      <Filter className="h-4 w-4 mr-2" />
                      Filtro
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleRefresh}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Atualizar
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleEdit}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDelete}
                      disabled={isDeletingChart}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      {isDeletingChart ? "Apagando..." : "Apagar"}
                    </Button>
                  </div>
                </CardHeader>
                {isDeletingChart ? (
                  <div className="flex-1 flex justify-center items-center">
                    <Spinner />
                  </div>
                ) : (
                  <CardContent className="flex-1 overflow-y-auto pt-10">
                    {" "}
                    {createChartComponent(data)}
                  </CardContent>
                )}
              </Card>
            </ChartProvider>
          </div>

          <div className="w-[30%] flex flex-col overflow-hidden">
            <TabsComponent
              tabs={[
                {
                  value: "events",
                  label: "Eventos",
                  content: (
                    <div className="p-4 h-full">Conteúdo dos Eventos</div>
                  ),
                },
                {
                  value: "chat",
                  label: "Chat",
                  content: (
                    <ResponsiveTabChat
                      onSend={(text) => {
                        const userMessage: ChatHistoryMessage = {
                          role: "user",
                          content: text,
                        };
                        setBubbles((prevBubbles) => [
                          ...prevBubbles,
                          <ChatBubble
                            text={text}
                            isUser={true}
                            key={`user-${bubbleKeyCounter.current++}`}
                          />,
                        ]);

                        const historyForApi = [...chatHistory];
                        mutate({
                          question: text,
                          history: historyForApi,
                          chart_id: chartId,
                        });
                        setChatHistory((prevHistory) => [
                          ...prevHistory,
                          userMessage,
                        ]);
                      }}
                      bubbles={bubbles}
                      classname="flex flex-col h-full p-0"
                    />
                  ),
                },
              ]}
              defaultValue="chat"
              className="flex-1 flex flex-col"
            />
          </div>
        </div>
      </div>
    );
  }
}
