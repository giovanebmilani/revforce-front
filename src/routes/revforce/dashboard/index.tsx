import IconButton from '@/components/IconButton'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { icons, Plus } from 'lucide-react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, LabelList, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, XAxis } from "recharts"

export const Route = createFileRoute('/revforce/dashboard/')({
  component: RouteComponent,
})

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { listCharts, Chart, ChartResponse } from '@/api/listCharts'
import { DraggableList } from '@/components/DraggableList'

const chartConfig = { //cores placeholder, adequar a identidade visual
  desktop: {
    label: "Desktop",
    color: "#FFDF20",
  },
  mobile: {
    label: "Mobile",
    color: "#FDC700",
  },
  tablet: {
    label: "Tablet",
    color: "#FFC72C",
  },
  other: {
    label: "Other",
    color: "#FFB81C",
  }
} satisfies ChartConfig

function createChartComponent(response: ChartResponse) {
  switch (response.chart.type) { //revisar Bar e Pie
    case "Bar":
      return <ChartContainer config={chartConfig} className="h-3/4 w-full">
        <BarChart accessibilityLayer data={response.data}>
          <XAxis
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(dataKey) => {
              const date = new Date(dataKey);
              switch (response.chart.granularity.type) {
                case "Month":
                  return date.toLocaleString('default', { month: 'short' });
                case "Week":
                  return `Week ${Math.ceil(date.getDate() / 7)}`;
                case "Day":
                  return date.getDate().toString();
                case "Hour":
                  return date.getHours().toString();
                default:
                  return dataKey;
              }
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />

          {response.chart.segment === "Device" ? ( //por device
            ["Mobile", "Desktop", "Tablet", "Other"].map((device) => (
              <Bar
                key={device}
                dataKey="value"
                name={device}
                fill={
                  device === "Desktop" ? chartConfig.desktop.color :
                    device === "Mobile" ? chartConfig.mobile.color :
                      device === "Tablet" ? chartConfig.tablet.color :
                        chartConfig.other.color
                }
                radius={4}
                stackId="a"
                isAnimationActive={false}
              />
            ))
          ) : (
            <Bar //outro tipo
              dataKey="value" 
              fill={chartConfig.desktop.color} //definir cor padrao
              radius={4}
              isAnimationActive={false}
            />
          )}
        </BarChart>
      </ChartContainer>

    case "Pie":
      return <ChartContainer config={chartConfig} className="h-3/5 w-full mx-auto aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          {response.chart.segment === "Device" && (
            <Pie
              data={response.data}
              dataKey="value"
              nameKey="device"
              fill="#8884d8"
              label
            >
              {response.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.device === "Mobile" ? chartConfig.mobile.color
                      : entry.device === "Desktop" ? chartConfig.desktop.color
                        : entry.device === "Tablet" ? chartConfig.tablet.color
                          : chartConfig.other.color
                  }
                />
              ))}
            </Pie>
          )}
        </PieChart>
      </ChartContainer>

    //Consertar tudo abaixo dessa linha: 
    /* case "Line":
      return <ChartContainer config={chartConfig} className="h-3/4 w-full">
        <LineChart
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
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          {Object.keys(response.entries[0] || {}).filter(key => typeof response.entries[0][key] !== 'string').map((key, index) => (
            <Line
              dataKey={key}
              type="monotone"
              stroke={index % 2 === 0 ? chartConfig.desktop.color : chartConfig.mobile.color}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ChartContainer>

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
      </ChartContainer>
    case "Radar":
      return <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-3/5 w-full"
      >
        <RadarChart data={response.entries}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <PolarAngleAxis dataKey="identifier" />
          <PolarGrid />
          {Object.keys(response.entries[0] || {}).filter(key => typeof response.entries[0][key] !== 'string').map((key, index) => (
            <Radar
              dataKey={key}
              fill={index % 2 === 0 ? chartConfig.desktop.color : chartConfig.mobile.color}
              fillOpacity={0.6}
            />
          ))}
        </RadarChart>
      </ChartContainer>
    case "BarNegative":
      return <ChartContainer config={chartConfig} className="mx-auto aspect-square h-2/3 w-full">
        <BarChart accessibilityLayer data={response.entries}>
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel hideIndicator />}
          />
          {
            Object.keys(response.entries[0] || {}).filter(key => typeof response.entries[0][key] !== 'string').map((key, index) => (
              <Bar dataKey={key}>
                <LabelList position="top" dataKey="identifier" fillOpacity={1} />
                {response.entries.map((item) => (
                  <Cell
                    key={item.identifier}
                    fill={(item[key] as number) > 0 ? chartConfig.desktop.color : chartConfig.mobile.color}
                  />
                ))}
              </Bar>
            ))
          }
        </BarChart>
      </ChartContainer> */
  }
}

//possivelmente sem necessidade de ajuste
async function RouteComponent() {
  const chartData = await listCharts() //puxa a lista de chats
  const chartsDraggable = chartData.map((response: ChartResponse) => ({ //para por no draggable
    id: response.chart.id, //para o draggable
    content: (
      <Card key={response.chart.id} className="w-full h-70 pt-2 pb-0">
        <CardHeader className="border-b h-12">
          <CardTitle className="flex flex-row items-center justify-between">
            Chart
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

  return <div className='w-full h-full flex flex-col gap-4'>
    <div className='flex flex-row justify-end border-b pb-3'>
      <h1 className='text-3xl font-bold h-full items-center flex align-items'>Dashboard</h1>
      <div className='w-3/4'></div>
      {/* pra separar o dashboard do resto (chinelagem, ajude ages 3) */}
      <div className='flex flex-row gap-2 items-center'>
        <IconButton icon={icons.RefreshCcw} />
        <Button className='text-white cursor-pointer h-full'>
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
}
