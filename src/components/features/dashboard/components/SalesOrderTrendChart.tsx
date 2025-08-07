import { Card, CardContent, CardDescription, CardHeader, CardTitle, ChartConfig, ChartContainer, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, ToggleGroup, ToggleGroupItem } from '@/components/ui';
import { mockSalesOrderTrendData } from '@/data/dashboard';
import { useIsMobile } from '@/hooks';
import { useEffect, useState } from 'react';
import { XAxis, CartesianGrid, AreaChart, Area } from 'recharts';

const chartConfig = {
  salesAndOrders: {
    label: "매출/주문",
  },
  sales: {
    label: "매출",
    color: "var(--color-blue-500)",
  },
  orders: {
    label: "주문",
    color: "var(--color-blue-300)",
  },
} satisfies ChartConfig;


function SalesOrderTrendChart() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("30d");

  const timeRangeLabel = {
    "30d": "지난 30일",
    "7d": "지난 7일",
    "90d": "지난 3개월",
  };

  useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = mockSalesOrderTrendData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });


  return (
    <Card className="@container/card">
      <CardHeader className="grid grid-cols-2 items-start">
        <div>
          <CardTitle>매출/주문 수</CardTitle>
          <CardDescription className='pt-1'>
            {timeRangeLabel[timeRange as keyof typeof timeRangeLabel]}
          </CardDescription>
        </div>
        <div className="justify-self-end">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              {timeRangeLabel["90d"]}
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              {timeRangeLabel["30d"]}
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              {timeRangeLabel["7d"]}
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue
                placeholder={
                  timeRangeLabel[timeRange as keyof typeof timeRangeLabel]
                }
              />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                {timeRangeLabel["90d"]}
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                {timeRangeLabel["30d"]}
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                {timeRangeLabel["7d"]}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-blue-500)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-blue-500)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-blue-300)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-blue-300)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            // tickFormatter={(value) => {
            //   const date = new Date(value);

            // }}
            />
            <Area
              dataKey="orders"
              type="natural"
              fill="url(#fillOrders)"
              stroke="var(--color-blue-300)"
              stackId="a"
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="url(#fillSales)"
              stroke="var(--color-blue-500)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default SalesOrderTrendChart;