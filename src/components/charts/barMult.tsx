"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const mockData = [
  { month: "January", desktop: 186, mobile: 80, isMock: true },
  { month: "February", desktop: 305, mobile: 200, isMock: true },
  { month: "March", desktop: 237, mobile: 120, isMock: true },
  { month: "April", desktop: 73, mobile: 190, isMock: true },
  { month: "May", desktop: 209, mobile: 130, isMock: true },
  { month: "June", desktop: 214, mobile: 140, isMock: true },
];

export async function Component({
  data,
  config,
  title,
  description,
}: {
  data: any;
  config: ChartConfig;
  title: string;
  description?: string;
}) {
  const isEmpty = !Array.isArray(data) || data.length === 0;
  const chartData = isEmpty ? mockData : data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {title ?? "Bar Chart"}
          {isEmpty && (
            <span className="ml-2 text-xs text-red-500">(Mock Data)</span>
          )}
        </CardTitle>
        <CardDescription>
          {description ?? "This is the description."}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <ChartContainer config={config}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {Object.keys(config).map((device) => (
              <Bar
                key={device}
                dataKey={device}
                fill={config[device].color}
                radius={4}
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Info 1 this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {isEmpty ? "Usando dados mockados!" : "Dados reais carregados"}
        </div>
      </CardFooter>
    </Card>
  );
}
