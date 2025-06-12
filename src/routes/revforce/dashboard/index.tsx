import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import IconButton from "@/components/IconButton";
import { DraggableList } from "@/components/DraggableList";
import { ChartConfig } from "@/components/ui/chart";
import { createDashboardBarChartComponent } from "@/components/dashboardCharts/Bar";
import { createDashboardPieChartComponent } from "@/components/dashboardCharts/Pie";
import { createDashboardLineChartComponent } from "@/components/dashboardCharts/Line";
import { createDashboardAreaChartComponent } from "@/components/dashboardCharts/Area";
import { ChartResponse, useListCharts } from "@/api/charts";
import { useQueryClient } from "@tanstack/react-query";
import { useGetRefresh, usePostRefresh } from "@/api/refresh";

export const Route = createFileRoute("/revforce/dashboard/")({
  component: DashboardPage,
});

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

const DashboardHeader = () => {
  const queryClient = useQueryClient();
  const { mutate: getRefresh, data: getRefreshData } = useGetRefresh();
  const { mutate: postRefresh } = usePostRefresh();

  if (getRefreshData) {
    const nextRefresh = new Date(getRefreshData.next_refresh_time).getTime();
    if (Date.now() > nextRefresh) {
      postRefresh();
    }
  }

  return (
    <header className="flex flex-row border-b pb-3 justify-between">
      <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      <div className="flex gap-2 items-center">
        <IconButton
          icon={RefreshCcw}
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ["listCharts"],
            });
            getRefresh();
          }}
        />
        <Link to="/revforce/dashboard/newchart">
          <Button className="text-black h-11 flex gap-2 cursor-pointer">
            <Plus className="h-5 w-5" /> New Chart
          </Button>
        </Link>
      </div>
    </header>
  );
};

const DashboardChartCard = ({ response }: { response: ChartResponse }) => (
  <Card className="w-full h-full pt-2 pb-0 overflow-hidden rounded-lg border">
    <CardHeader className="border-b">
      <CardTitle className="flex items-center justify-between p-1">
        {response.chart.name}
        <Link
          to="/revforce/dashboard/chartdetails/$chartId"
          params={{ chartId: response.chart.id }}
        >
          <Button variant="ghost" className="text-blue-500 cursor-pointer">
            Ver mais {">"}
          </Button>
        </Link>
      </CardTitle>
    </CardHeader>
    <CardContent className="h-max p-6">
      {createChartComponent(response)}
    </CardContent>
  </Card>
);

const DashboardLoading = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Spinner />
  </div>
);

const DashboardError = () => (
  <div className="w-full h-full flex items-center justify-center text-destructive">
    Error loading dashboard data
  </div>
);

function DashboardPage() {
  const { data, isLoading, isSuccess, isError, error, isFetching } = useListCharts();

  const chartsDraggable =
    data?.map((response: ChartResponse) => ({
      id: response.chart.id,
      content: (
        <DashboardChartCard key={response.chart.id} response={response} />
      ),
    })) || [];

  if (isLoading) return <DashboardLoading />;
  if (isError) {
    console.error(error)
    return <DashboardError />;
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <DashboardHeader />

      {isSuccess && (
        <div className="flex flex-col gap-4">
          <DraggableList
            initialItems={chartsDraggable}
            direction="auto"
            className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            itemClassName="w-full"
            onOrderChange={() => {
              // TODO: Implement order save logic
            }}
          />
          {isFetching && <Spinner className="text-gray-700" />}
        </div>
      )}
    </div>
  );
}
