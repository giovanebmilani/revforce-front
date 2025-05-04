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
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
            }),
            [(typeof response.chart.segment === "string") ? String(item[response.chart.segment] || "") : "All"]: item.value,
        });
    })
    
    let previous = chartData[0]
    chartData.forEach((item) => {
        Object.keys(item).forEach((key) => {
            chartData.forEach((item) => {
                if (item[key] === undefined) {
                    item[key] = previous[key]; //TODO: valor anterior
                }
            });
        });

        previous = item;
    });

    //console.log(response.chart.segment)

    return chartData
}
