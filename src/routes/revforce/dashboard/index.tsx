import IconButton from "@/components/IconButton";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { icons, Plus } from "lucide-react";

export const Route = createFileRoute("/revforce/dashboard/")({
  component: RouteComponent,
});

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listCharts, Chart, ChartResponse } from "@/api/listCharts";
import { DraggableList } from "@/components/DraggableList";
import { createDashboardBarChartComponent } from "@/components/dashboardCharts/Bar";
import { createDashboardPieChartComponent } from "@/components/dashboardCharts/Pie";
import { createDashboardLineChartComponent } from "@/components/dashboardCharts/Line";

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
} satisfies ChartConfig;

function createChartComponent(response: ChartResponse) {
  switch (
    response.chart.type //revisar Bar e Pie
  ) {
    // case "bar":
    //   return createDashboardBarChartComponent(response, chartConfig);

    // case "pie":
    //   return createDashboardPieChartComponent(response, chartConfig);

    case "line":
      return createDashboardLineChartComponent(response, chartConfig);

    //Consertar tudo abaixo dessa linha:
    /* case "Line":
      

    case "Area":
      return <ChartContainer config={chartConfig} className="h-3/4 w-full">
        <AreaChart
          accessibilityLayer
          data={response.entries}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="identifier"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />

          <defs>
            {Object.keys(response.entries[0] || {}).filter(key => typeof response.entries[0][key] !== 'string').map((key, index) => (
              <linearGradient key={key} id={`fillGradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={index % 2 === 0 ? chartConfig.desktop.color : chartConfig.mobile.color}
                  stopOpacity={0.8} />
                <stop
                  offset="95%"
                  stopColor={index % 2 === 0 ? chartConfig.desktop.color : chartConfig.mobile.color}
                  stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          {Object.keys(response.entries[0] || {}).filter(key => typeof response.entries[0][key] !== 'string').map((key, index) => (
            <Area
              key={key}
              dataKey={key}
              type="natural"
              fill={`url(#fillGradient-${key})`}
              fillOpacity={0.4}
              stroke={index % 2 === 0 ? chartConfig.desktop.color : chartConfig.mobile.color}
              stackId="a" />
          ))}
        </AreaChart>
      </ChartContainer>*/
  }
}

//possivelmente sem necessidade de ajuste
async function RouteComponent() {
  const chartData = await listCharts(); //puxa a lista de chats
  const chartsDraggable = chartData.map((response: ChartResponse) => ({
    //para por no draggable
    id: response.chart.id, //para o draggable
    content: (
      <Card key={response.chart.id} className="w-full h-70 pt-2 pb-0">
        <CardHeader className="border-b h-12">
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
        <CardContent className="h-11/10">
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
          <Button className="text-white cursor-pointer h-full">
            <Plus /> New Chart
          </Button>
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
