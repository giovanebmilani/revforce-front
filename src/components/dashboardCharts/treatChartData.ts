// const chartData = [
//     { month: "January", desktop: 186, mobile: 80 },
//     { month: "February", desktop: 305, mobile: 200 },
//     { month: "March", desktop: 237, mobile: 120 },
//     { month: "April", desktop: 73, mobile: 190 },
//     { month: "May", desktop: 209, mobile: 130 },
//     { month: "June", desktop: 214, mobile: 140 },
// ]

import { ChartResponse } from "@/api/listCharts";

interface ChartDataItem {
    identifier: string;
    [key: string]: number | string;
}

export function treatChartData(response: ChartResponse): ChartDataItem[] {
    
    const chartData: ChartDataItem[] = [];

    response.data.forEach((item) => {
        chartData.push({
            identifier: item.date.toLocaleDateString("pt-BR", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit",
            }),
            [item.device || ""]: item.value,
        });
    })
    
    return chartData
}
