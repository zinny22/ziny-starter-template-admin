

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { GenericTable } from "@/components/shared";
import { ProductSearch } from "./components";
import { Badge, Card, CardContent, CardHeader } from "@/components/ui";
import { ProductType } from "./products.type";
import { productData } from "./mock";

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

function Products() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <ProductSearch />

            <Card>
                <CardHeader className="relative">상품 관리</CardHeader>

                <CardContent>
                    <GenericTable data={productData} columns={productColumns} />
                </CardContent>
            </Card>
        </div>
    );
}

export default Products;