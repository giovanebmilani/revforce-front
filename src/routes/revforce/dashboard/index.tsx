import IconButton from '@/components/IconButton'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { icons, Plus } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis } from "recharts"

export const Route = createFileRoute('/revforce/dashboard/')({
  component: RouteComponent,
})

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
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
      return <ChartContainer config={chartConfig} className="h-40 w-80">
        <BarChart accessibilityLayer data={chart.entries}>
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

          {/*<Bar dataKey="value" fill="var(--color-desktop)" radius={4} />*/}
        </BarChart>
      </ChartContainer>

    case "Pie":
      return <ChartContainer config={chartConfig} className="h-40 w-80 mx-auto aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground">
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
                  chart.entries.map((entry, index) => (
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
      return <ChartContainer config={chartConfig}>
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
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="desktop"
            type="monotone"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="mobile"
            type="monotone"
            stroke="var(--color-mobile)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
  }
}

async function RouteComponent() {
  const chartData = await listCharts() //puxa a lista de chats

  return <div className='w-full h-full flex flex-col gap-4'>
    <div className='flex flex-row justify-end border-b pb-3'>
      <h1 className='text-3xl font-bold h-full items-center flex align-items'>Dashboard</h1>
      <div className='w-3/4'> </div> {/* pra separar o dashboard do resto (chinelagem, ajude ages 3) */}
      <div className='flex flex-row gap-2 items-center'>
        <IconButton icon={icons.RefreshCcw} />
        <Button className='text-white cursor-pointer'>
          <Plus /> New Chart
        </Button>
      </div>
    </div>

    <div className='flex flex-row gap-4 items-center'>
      {chartData.map((chart: Chart) => { //TODO: Make card header the same for every chart without having to duplicate the code
        return <Card>
          <CardHeader className='border-b'>
            <CardTitle className='flex flex-row items-center content-normal justify-between' >
              Chart
              <Button variant={'ghost'} className='text-blue-500'>Ver mais {">"}</Button>
            </CardTitle>
          </CardHeader>

          {createChartComponent(chart)}

        </Card>
      })}
    </div>
  </div>
}
