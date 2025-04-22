import IconButton from '@/components/IconButton'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { icons, Plus } from 'lucide-react'
import { Bar, BarChart, Pie, PieChart } from "recharts"

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

async function RouteComponent() {
  const chartData = await listCharts()

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
      {chartData.map((chart: Chart) => {
        //TODO: add possible chart types
        switch (chart.chartType) {
          case "Bar":
            return <Card>
              <CardHeader className='border-b'>
                <CardTitle className='flex flex-row items-center content-normal justify-between' >
                  Chart
                  <Button variant={'ghost'} className='text-blue-500'>Ver mais {">"}</Button>
                </CardTitle>
              </CardHeader>

              <ChartContainer config={chartConfig} className="h-40 w-80">
                <BarChart accessibilityLayer data={chart.entries}>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-desktop)" radius={4} />
                </BarChart>
              </ChartContainer>
            </Card>

          case "Pie":
            return <Card>
              <CardHeader className='border-b'>
                <CardTitle className='flex flex-row items-center content-normal justify-between' >
                  Chart
                  <Button variant={'ghost'} className='text-blue-500'>Ver mais {">"}</Button>
                </CardTitle>
              </CardHeader>

              <ChartContainer config={chartConfig} className="h-40 w-80">
                <PieChart data={chart.entries}>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie data={chart.entries} dataKey="value" fill="#8884d8" />
                </PieChart>
              </ChartContainer>
            </Card>
        }
      })}
    </div>
  </div>
}
