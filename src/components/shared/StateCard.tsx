"use client";

import { cn } from "@/lib/utils";
import { Badge, Card, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

interface StateCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  onClick?: () => void;
}

function StateCard({
  title,
  value,
  change,
  changeType,
  onClick,
}: StateCardProps) {
  return (
    <Card className="@container/card cursor-pointer w-full" onClick={onClick}>
      <CardHeader className="flex flex-col gap-1">
        <div className="flex items-start justify-between w-full">
          <CardDescription >{title}</CardDescription>

          {change ? (
            <Badge
              variant="outline"
              className={cn(
                "flex gap-1 rounded-lg text-xs border-green-500 text-green-500",
                {
                  "border-red-500 text-red-500": changeType === "down",
                }
              )}
            >
              {changeType === "up" ? (
                <TrendingUpIcon className="size-3" />
              ) : (
                <TrendingDownIcon className="size-3" />
              )}
              {change}
            </Badge>
          ) : null}
        </div>
        <CardTitle className={cn("text-2xl font-semibold")}>
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default StateCard;