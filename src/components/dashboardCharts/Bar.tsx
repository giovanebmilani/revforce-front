import { ChartResponse } from "@/api/listCharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis } from "recharts"


export function createDashboardBarChartComponent(response: ChartResponse, chartConfig: ChartConfig) {
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
}