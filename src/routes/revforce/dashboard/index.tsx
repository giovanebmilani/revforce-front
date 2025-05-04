import IconButton from "@/components/IconButton";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { icons, Plus } from "lucide-react";

export const Route = createFileRoute("/revforce/dashboard/")({
  component: RouteComponent,
});

import { ChartConfig } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listCharts, ChartResponse } from "@/api/listCharts";
import { DraggableList } from "@/components/DraggableList";
import { createDashboardBarChartComponent } from "@/components/dashboardCharts/Bar";
import { createDashboardPieChartComponent } from "@/components/dashboardCharts/Pie";
import { createDashboardLineChartComponent } from "@/components/dashboardCharts/Line";
import { createDashboardAreaChartComponent } from "@/components/dashboardCharts/Area";

const chartConfig = {
  //cores placeholder, adequar a identidade visual
  desktop: {
    label: "Desktop",
    color: "#916860",
  },
  mobile: {
    label: "Mobile",
    color: "#E1AD00",
  },
  tablet: {
    label: "Tablet",
    color: "#008080",
  },
  other: {
    label: "Other",
    color: "#BE7405",
  },
  ad: {
    label: "Desktop",
    color: "#916860",
  },
  campaign: {
    label: "Mobile",
    color: "#E1AD00",
  },
} satisfies ChartConfig;

function createChartComponent(response: ChartResponse) {
  switch (
    response.chart.type //revisar Bar e Pie
  ) {
    case "bar":
      return createDashboardBarChartComponent(response, chartConfig);

    case "pie":
      return createDashboardPieChartComponent(response, chartConfig);

    case "line":
      return createDashboardLineChartComponent(response, chartConfig);

    case "area":
      return createDashboardAreaChartComponent(response, chartConfig);
  }
}

//possivelmente sem necessidade de ajuste
async function RouteComponent() {
  const chartData = await listCharts(); //puxa a lista de chats
  const chartsDraggable = chartData.map((response: ChartResponse) => ({
    //para por no draggable
    id: response.chart.id, //para o draggable
    content: (
      <Card key={response.chart.id} className="w-full h-100 pt-2 pb-0">
        <CardHeader className="border-b">
          <CardTitle className="flex flex-row items-center justify-between">
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
        <CardContent className="flex flex-col h-full pt-4">
          {createChartComponent(response)}
        </CardContent>
      </Card>
    ),
  }));

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-row justify-end border-b pb-3">
        <h1 className="text-3xl font-bold h-full items-center flex align-items">
          Dashboard
        </h1>
        <div className="w-3/4"></div>
        {/* pra separar o dashboard do resto (chinelagem, ajude ages 3) */}
        <div className="flex flex-row gap-2 items-center">
          <IconButton icon={icons.RefreshCcw} />
          <Link to="/revforce/dashboard/newchart">
            <Button className="text-white cursor-pointer h-11 flex items-center justify-center gap-2">
              <Plus /> New Chart
            </Button>
          </Link>
        </div>
      </div>
      <DraggableList
        initialItems={chartsDraggable}
        direction="auto"
        className="gap-4"
        itemClassName="w-10/31"
        onOrderChange={(newOrder) => {
          //salvar no back?
        }}
      />
    </div>
  );
}
