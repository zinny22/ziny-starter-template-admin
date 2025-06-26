"use client";
import { useState } from "react";
import { ChartAreaInteractive } from "../organisms";
import { StateCard } from "../molecules";

function Dashboard() {
    const [title, setTitle] = useState("매출");
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <StateCard
                    title="매출"
                    value="1,250,000원"
                    change="+12.5%"
                    changeType="up"
                    onClick={() => setTitle("매출")}
                />
                <StateCard
                    title="주문"
                    value="480건"
                    change="+12.5%"
                    changeType="up"
                    onClick={() => setTitle("주문수")}
                />
                <StateCard
                    title="방문객"
                    value="480명"
                    change="-12.5%"
                    changeType="down"
                    onClick={() => setTitle("방문객수")}
                />
            </div>
            <ChartAreaInteractive title={title} />
        </div>
    );
}

export default Dashboard;