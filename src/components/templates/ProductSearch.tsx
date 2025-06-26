'use client';

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import { RotateCcw, Search } from "lucide-react";
import { useState } from "react";
import { FormField, LabelForm } from "../molecules";

function ProductSearch() {
    const [search, setSearch] = useState(["selling"]);

    const rangeLabel = {
        selling: "판매량순",
        view: "조회순",
        search: "인기검색어",
    };

    return (
        <Card>
            <CardHeader className="relative" />

            <CardContent className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <FormField
                    label="상품명"
                    placeholder="상품명을 입력해주세요"
                    type="text"
                    value={""}
                    onChange={(e) => { }}
                />
                <FormField
                    label="상품코드"
                    placeholder="상품코드를 입력해주세요"
                    type="text"
                    value={""}
                    onChange={(e) => { }}
                />
                <LabelForm label="상태">
                    <Checkbox id="판매중" value="판매중" />
                    <Label htmlFor="판매중" className="whitespace-nowrap">
                        판매중
                    </Label>

                    <Checkbox id="품절" value="품절" />
                    <Label htmlFor="품절" className="whitespace-nowrap">
                        품절
                    </Label>

                    <Checkbox id="노출중지" />
                    <Label htmlFor="노출중지" className="whitespace-nowrap">
                        노출중지
                    </Label>
                </LabelForm>

                <LabelForm label="단가">
                    <Select
                        value={search.join()}
                        onValueChange={(e) => {
                            setSearch((prev) => {
                                if (prev.includes(e)) {
                                    return prev.filter((item) => item !== e);
                                } else {
                                    return [...prev, e];
                                }
                            });
                        }}
                    >
                        <SelectTrigger
                            className="flex @[767px]/card:hidden "
                            aria-label="Select a value"
                        >
                            {search
                                .map((item) => rangeLabel[item as keyof typeof rangeLabel])
                                .join(", ")}
                        </SelectTrigger>

                        <SelectContent className="rounded-xl">
                            <SelectItem value="selling">{rangeLabel["selling"]}</SelectItem>
                            <SelectItem value="view">{rangeLabel["view"]}</SelectItem>
                            <SelectItem value="search">{rangeLabel["search"]}</SelectItem>
                        </SelectContent>
                    </Select>
                </LabelForm>
            </CardContent>

            <CardFooter className="flex items-center gap-x-3 justify-center">
                <Button variant="outline" size="sm">
                    <RotateCcw />
                    초기화
                </Button>
                <Button size="sm">
                    <Search />
                    검색
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ProductSearch;