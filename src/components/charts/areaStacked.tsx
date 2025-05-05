"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  { date: "2024-01-01", desktop: 186, mobile: 80, isMock: true },
  { date: "2024-02-01", desktop: 305, mobile: 200, isMock: true },
  { date: "2024-03-01", desktop: 237, mobile: 120, isMock: true },
  { date: "2024-04-01", desktop: 73, mobile: 190, isMock: true },
  { date: "2024-05-01", desktop: 209, mobile: 130, isMock: true },
  { date: "2024-06-01", desktop: 214, mobile: 140, isMock: true },
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
          {title ?? "Area Chart"}
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
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {Object.keys(config).map((device) => (
              <Area
                key={device}
                dataKey={device}
                type="natural"
                fill={config[device].color}
                fillOpacity={0.4}
                stroke={config[device].color}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Info 1 this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {isEmpty ? "Usando dados mockados!" : "Dados reais carregados"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
