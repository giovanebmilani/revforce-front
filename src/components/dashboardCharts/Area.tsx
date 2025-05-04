import { ChartResponse } from "@/api/listCharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { treatChartData } from "./treatChartData";

export function createDashboardAreaChartComponent(
    response: ChartResponse,
    chartConfig: ChartConfig
) {
    const entries = treatChartData(response)

    return (
        <ChartContainer config={chartConfig} className="h-3/4 w-full">
            <AreaChart
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

                <defs>
                    {Object.keys(entries[0] || {}).filter(key => typeof entries[0][key] !== 'string').map((key, index) => (
                        console.log(key, index, Object.keys(chartConfig).length, chartConfig, index % Object.keys(chartConfig).length),

                        <linearGradient key={key} id={`fillGradient-${key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor={chartConfig[key]?.color || chartConfig.other.color}
                                stopOpacity={1} />
                            <stop
                                offset="95%"
                                stopColor={chartConfig[key]?.color || chartConfig.other.color}
                                stopOpacity={0.1} />
                        </linearGradient>
                    ))}
                </defs>

                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                {Object.keys(entries[0] || {}).filter(key => typeof entries[0][key] !== 'string').map((key, index) => (
                    <Area
                        key={key}
                        dataKey={key}
                        type="natural"
                        fill={`url(#fillGradient-${key})`}
                        fillOpacity={0.4}
                        stroke={chartConfig[key]?.color || chartConfig.other.color}
                        stackId="a" />
                ))}
            </AreaChart>
        </ChartContainer>
    );
}
