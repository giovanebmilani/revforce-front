import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, RefreshCcw } from "lucide-react";
import { useMemo } from "react";

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
          }}
        />
        <Link to="/revforce/dashboard/newchart">
          <Button className="text-white h-11 flex gap-2">
            <Plus className="h-5 w-5" /> New Chart
          </Button>
        </Link>
      </div>
    </header>
  );
};

const DashboardChartCard = ({ response }: { response: ChartResponse }) => (
  <Card className="w-full h-full pt-2 pb-0 overflow-hidden">
    <CardHeader className="border-b">
      <CardTitle className="flex items-center justify-between">
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
  const { data, isLoading, isSuccess, isError } = useListCharts();
  const chartsDraggable = useMemo(
    () =>
      data?.map((response: ChartResponse) => ({
        id: response.chart.id,
        content: (
          <DashboardChartCard key={response.chart.id} response={response} />
        ),
      })) || [],
    [data]
  );

  if (isLoading) return <DashboardLoading />;
  if (isError) return <DashboardError />;

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      <DashboardHeader />

      {isSuccess && (
        <DraggableList
          initialItems={chartsDraggable}
          direction="auto"
          className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          itemClassName="w-full"
          onOrderChange={() => {
            // TODO: Implement order save logic
          }}
        />
      )}
    </div>
  );
}
