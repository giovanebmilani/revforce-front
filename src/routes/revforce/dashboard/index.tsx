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
import { listCharts, Chart } from '@/api/listCharts'

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#FFDF20",
  },
  mobile: {
    label: "Mobile",
    color: "#FDC700",
  },
} satisfies ChartConfig

function createChartComponent(chart: Chart) {
  switch (chart.chartType) {
    case "Bar":
      return <ChartContainer config={chartConfig} className="h-2/3 w-full">
        <BarChart accessibilityLayer data={chart.entries}>
          <XAxis
            dataKey="identifier"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />

          { // nao me pergunte, copilot fez td
            Object.keys(chart.entries[0] || {}).filter(key => typeof chart.entries[0][key] !== 'string').map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={index % 2 === 0 ? chartConfig.desktop.color : chartConfig.mobile.color}
                radius={4}
              />
            ))
          }
        </BarChart>
      </ChartContainer>

    case "Pie":
      return <ChartContainer config={chartConfig} className="h-2/3 w-full mx-auto aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          {
            Object.keys(chart.entries[0] || {}).filter(key => typeof chart.entries[0][key] !== 'string').map((key) => (
              <Pie
                data={chart.entries}
                key={key}
                dataKey={key}
                fill="#8884d8" // Default color
                label
                nameKey="identifier"
              >
                {
                  chart.entries.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? chartConfig.desktop.color : chartConfig.mobile.color}
                    />
                  ))
                }
              </Pie>
            ))
          }
        </PieChart>
      </ChartContainer>

    case "Line":
      return <ChartContainer config={chartConfig} className="h-2/3 w-full">
        <LineChart
          accessibilityLayer
          data={chart.entries}
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
          {Object.keys(chart.entries[0] || {}).filter(key => typeof chart.entries[0][key] !== 'string').map((key, index) => (
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
      return <ChartContainer config={chartConfig} className="h-2/3 w-full">
        <AreaChart
          accessibilityLayer
          data={chart.entries}
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
            {Object.keys(chart.entries[0] || {}).filter(key => typeof chart.entries[0][key] !== 'string').map((key, index) => (
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
          {Object.keys(chart.entries[0] || {}).filter(key => typeof chart.entries[0][key] !== 'string').map((key, index) => (
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
        className="mx-auto aspect-square h-2/3 w-full"
      >
        <RadarChart data={chart.entries}>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <PolarAngleAxis dataKey="identifier" />
          <PolarGrid />
          {Object.keys(chart.entries[0] || {}).filter(key => typeof chart.entries[0][key] !== 'string').map((key, index) => (

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
      <BarChart accessibilityLayer data={chart.entries}>
        <CartesianGrid vertical={false} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel hideIndicator />}
        />
        {
            Object.keys(chart.entries[0] || {}).filter(key => typeof chart.entries[0][key] !== 'string').map((key, index) => (
              
              <Bar dataKey={key}>
                <LabelList position="top" dataKey={key} fillOpacity={1} />
                {chart.entries.map((item) => (
                  <Cell
                    key={item.month}
                    fill={index > 0 ? chartConfig.desktop.color : chartConfig.mobile.color}
                  />
                ))}
              </Bar>
            ))
          }
        
      </BarChart>
    </ChartContainer>
  }
}

async function RouteComponent() {
  const chartData = await listCharts() //puxa a lista de chats

  return <div className='w-full h-full flex flex-col gap-4'>
    <div className='flex flex-row justify-end border-b pb-3'>
      <h1 className='text-3xl font-bold h-full items-center flex align-items'>Dashboard</h1>
      <div className='w-3/4'></div>
      {/* pra separar o dashboard do resto (chinelagem, ajude ages 3) */}
      <div className='flex flex-row gap-2 items-center'>
        <IconButton icon={icons.RefreshCcw} />
        <Button className='text-white cursor-pointer'>
          <Plus /> New Chart
        </Button>
      </div>
    </div>

    <div className='flex flex-row gap-4 items-center flex-wrap'>
      {chartData.map((chart: Chart) => {
        return <Card key={chart.chartId} className='w-10/31 h-70 pt-2 pb-0'>
          <CardHeader className='border-b h-12'>
            <CardTitle className='flex flex-row items-center content-normal justify-between'>
              Chart
              <Link to="/revforce/dashboard/chartdetails/$chartId"
                params={{ chartId: chart.chartId }}>
                <Button variant={'ghost'} className='text-blue-500 cursor-pointer'>
                  Ver mais {">"}
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>

          <CardContent className='h-11/10'>
            {createChartComponent(chart)}
          </CardContent>
        </Card>
      })}
    </div>
  </div>
}
