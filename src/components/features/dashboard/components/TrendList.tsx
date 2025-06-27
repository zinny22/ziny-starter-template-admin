
"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { popularKeywords } from "@/data/search";
import { PopularKeyword } from "@/types/search";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { GenericTable } from "@/components/shared";
import { ProductType } from "../../products/products.type";
import { productData } from "../../products/mock";
import { Badge, Card, CardContent, CardDescription, CardHeader, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, ToggleGroup, ToggleGroupItem } from "@/components/ui";


export const productColumns: ColumnDef<ProductType>[] = [
    {
        accessorKey: "name",
        header: "상품명",
        cell: ({ row }) => {
            const product = row.original;
            return (
                <div className="flex items-center gap-2">
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={32}
                        height={32}
                        className="rounded-md object-cover"
                    />
                    <span>{product.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "sku",
        header: "상품코드",
    },
    {
        accessorKey: "category",
        header: "카테고리",
    },
    {
        accessorKey: "quantitySold",
        header: "판매량",
        cell: ({ row }) => <span>{row.getValue("quantitySold")}개</span>,
    },
    {
        accessorKey: "revenue",
        header: "총 매출",
        cell: ({ row }) =>
            new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
            }).format(row.getValue("revenue")),
    },
    {
        accessorKey: "price",
        header: "단가",
        cell: ({ row }) =>
            new Intl.NumberFormat("ko-KR", {
                style: "currency",
                currency: "KRW",
            }).format(row.getValue("price")),
    },
    {
        accessorKey: "stock",
        header: "재고",
        cell: ({ row }) => (
            <span className={row.getValue("stock") === 0 ? "text-red-500" : ""}>
                {row.getValue("stock")}개
            </span>
        ),
    },
    {
        accessorKey: "updatedAt",
        header: "업데이트",
        cell: ({ row }) => row.getValue("updatedAt"),
    },
    {
        accessorKey: "status",
        header: "상태",
        cell: ({ row }) => {
            const status = row.getValue("status");
            return (
                <Badge
                    variant="outline"
                    className={cn("", {
                        "border-green-500 text-green-500": status === "판매중",
                        "border-red-500 text-red-500": status === "품절",
                    })}
                >
                    {status as string}
                </Badge>
            );
        },
    },
];

export const keywordColumns: ColumnDef<PopularKeyword>[] = [
    {
        accessorKey: "keyword",
        header: "검색어",
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("keyword")}</span>
        ),
    },
    {
        accessorKey: "count",
        header: "검색 횟수",
        cell: ({ row }) => (
            <span>{row?.getValue("count")?.toLocaleString()}회</span>
        ),
    },
    {
        accessorKey: "trend",
        header: "트렌드",
        cell: ({ row }) => {
            const trend = row.getValue("trend") as PopularKeyword["trend"];
            const icon =
                trend === "상승" ? (
                    <ArrowUp className="h-4 w-4 text-green-500" />
                ) : trend === "하락" ? (
                    <ArrowDown className="h-4 w-4 text-red-500" />
                ) : (
                    <Minus className="h-4 w-4 text-gray-400" />
                );
            return (
                <div className="flex items-center gap-1">
                    {icon}
                    <span>{trend}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "lastSearchedAt",
        header: "최근 검색 시각",
        cell: ({ row }) => {
            const date = new Date(row.getValue("lastSearchedAt"));
            return (
                <span className="text-muted-foreground">{date.toLocaleString()}</span>
            );
        },
    },
];

function TrendList() {
    const [range, setRange] = useState("selling");

    const rangeLabel = {
        selling: "판매량순",
        view: "조회순",
        search: "인기검색어",
    };

    return (
        <Card>
            <CardHeader className="relative">
                최신 트렌드
                <CardDescription>
                    지난 72시간동안의 트랜드에 대해서 확인할 수 있습니다.
                </CardDescription>
                <div className="absolute right-4 top-4">
                    <ToggleGroup
                        type="single"
                        value={range}
                        onValueChange={setRange}
                        variant="outline"
                        className="@[767px]/card:flex hidden"
                    >
                        <ToggleGroupItem value="selling" className="h-8 px-2.5">
                            {rangeLabel["selling"]}
                        </ToggleGroupItem>
                        <ToggleGroupItem value="view" className="h-8 px-2.5">
                            {rangeLabel["view"]}
                        </ToggleGroupItem>
                        <ToggleGroupItem value="search" className="h-8 px-2.5">
                            {rangeLabel["search"]}
                        </ToggleGroupItem>
                    </ToggleGroup>

                    <Select value={range} onValueChange={setRange}>
                        <SelectTrigger
                            className="@[767px]/card:hidden flex w-40"
                            aria-label="Select a value"
                        >
                            <SelectValue
                                placeholder={rangeLabel[range as keyof typeof rangeLabel]}
                            />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="selling" className="rounded-lg">
                                {rangeLabel["selling"]}
                            </SelectItem>
                            <SelectItem value="view" className="rounded-lg">
                                {rangeLabel["view"]}
                            </SelectItem>
                            <SelectItem value="search" className="rounded-lg">
                                {rangeLabel["search"]}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>

            <CardContent>
                {range === "search" ? (
                    <GenericTable
                        data={popularKeywords}
                        columns={keywordColumns}
                        filterColumn="keyword"
                    />
                ) : (
                    <GenericTable
                        data={productData}
                        columns={productColumns}
                        filterColumn="name"
                    />
                )}
            </CardContent>
        </Card>
    );
}

export default TrendList;