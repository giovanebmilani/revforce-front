import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, LabelList, Line, LineChart, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartResponse } from "@/api/listCharts"


export function createDashboardPieChartComponent(response: ChartResponse, chartConfig: ChartConfig) {
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
}