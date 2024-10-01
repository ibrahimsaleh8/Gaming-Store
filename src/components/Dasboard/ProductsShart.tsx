"use client";

import { LabelList, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
type PropsNumbers = {
  pc: number;
  ps4: number;
  ps5: number;
  xbox: number;
};

export default function ProductsShart({ pc, ps4, ps5, xbox }: PropsNumbers) {
  const chartData = [
    { cat: "PC", products: pc, fill: "var(--color-PC)" },
    { cat: "PS4", products: ps4, fill: "var(--color-PS4)" },
    { cat: "PS5", products: ps5, fill: "var(--color-PS5)" },
    { cat: "XBOX", products: xbox, fill: "var(--color-XBOX)" },
  ];

  const chartConfig = {
    products: {
      label: "products",
    },
    PC: {
      label: "PC",
      color: "hsl(var(--chart-3))",
    },
    PS4: {
      label: "PS4",
      color: "#0e5fd8",
    },
    PS5: {
      label: "PS5",
      color: "#003087",
    },
    XBOX: {
      label: "XBOX",
      color: "#52b043",
    },
  };
  return (
    <Card className="flex flex-col bg-second-black  border-none lg:w-2/3">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-white">Categories Chart</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0 border-none">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square  ">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="products" hideLabel />}
            />
            <Pie data={chartData} dataKey="products">
              <LabelList
                dataKey="cat"
                className="fill-background"
                stroke="none"
                fontSize={12}
                fontWeight={"bold"}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2 text-sm text-white">
        Showing total Categories in our website
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chart-pie">
          <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        </svg>
      </CardFooter>
    </Card>
  );
}
