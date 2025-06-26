export type PopularKeyword = {
  id: string;
  keyword: string;
  count: number;
  trend: "상승" | "하락" | "유지";
  lastSearchedAt: string;
};
