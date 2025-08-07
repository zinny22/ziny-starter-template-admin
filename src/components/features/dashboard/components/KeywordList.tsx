import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { formatPrice } from "@/utils";

interface KeywordListProps {
  title: string;
  list: { id: number; name: string; sales: number; revenue?: number }[];
}
function KeywordList({ title, list }: KeywordListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-1">
        {list.map((item, idx) => (
          <div key={item.id} className="flex items-center gap-3 cursor-pointer hover:bg-main-100-10 p-1 rounded-md">
            <span className="w-7 h-7 flex items-center justify-center bg-main-100-10 text-main-100 rounded-full font-bold text-sm">
              {idx + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium text-sm">{item.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {item.sales}건
                {item.revenue && (
                  <span className="ml-2">/ {formatPrice(item.revenue, "원")}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default KeywordList;
