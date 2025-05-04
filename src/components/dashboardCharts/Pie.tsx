import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, LabelList, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartResponse } from "@/api/listCharts"
import { treatChartData } from "./treatChartData"


export function createDashboardPieChartComponent(response: ChartResponse, chartConfig: ChartConfig) {
    const entries = treatChartData(response);
    
    return <ChartContainer config={chartConfig} className="h-3/5 w-full mx-auto aspect-square pb-0 [&_.recharts-pie-label-text]:fill-foreground">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          {
            Object.keys(entries[0] || {}).filter(key => typeof entries[0][key] !== 'string').map((key) => (
              <Pie
                data={entries}
                key={key}
                dataKey={key}
                fill="#8884d8" // Default color
                label
                nameKey="identifier"
              >
                {
                  entries.map((_, index) => (
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
}