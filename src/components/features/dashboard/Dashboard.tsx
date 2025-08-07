"use client";
import { KeywordList, SalesOrderTrendChart } from "./components";
import { mockProducts, mockSales } from "@/data/dashboard";
import StateCard from "@/components/shared/StateCard";


function Dashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 p-2">
      <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
        {mockSales.map((item) => (
          <StateCard
            key={item.title}
            title={item.title}
            value={item.value}
            change={item.change}
            changeType={item.changeType as "up" | "down"}
            onClick={item.onClick}
          />
        ))}
      </div>

      <div className="grid auto-rows-min gap-4 lg:grid-cols-3">
        <KeywordList title="인기 키워드 TOP 5" list={mockProducts} />
        <KeywordList title="인기 상품 TOP 5" list={mockProducts} />
        <KeywordList title="품절 임박 상품 TOP 5" list={mockProducts} />
      </div>
      <SalesOrderTrendChart />
    </div>
  );
}

export default Dashboard;