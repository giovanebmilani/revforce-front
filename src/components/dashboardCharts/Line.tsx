import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, LabelList, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartResponse } from "@/api/listCharts"
import { treatChartData } from "./treatChartData"

export function createDashboardLineChartComponent(response: ChartResponse, chartConfig: ChartConfig) {
  const entries = treatChartData(response)

  console.log(entries)

  return <ChartContainer config={chartConfig} className="h-3/4 w-full">
    <LineChart
      accessibilityLayer
      data={entries}
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
      {Object.keys(entries[0] || {}).filter(key => typeof entries[0][key] !== 'string').map((key, index) => (
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
}