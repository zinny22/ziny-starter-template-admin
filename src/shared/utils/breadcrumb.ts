import { navData } from "@/components/layout";

export function getBreadcrumbTitles(pathname: string): string[] {
  const segments = pathname.split("/").filter(Boolean); // ["me", "order"]
  const titles: string[] = [];

  if (segments.length === 0) return ["Dashboard"];

  function search(items: any[], segIdx: number, parentPath = ""): boolean {
    for (const item of items) {
      const itemPath = item.url?.startsWith("/")
        ? item.url
        : `${parentPath}/${item.url || ""}`.replace(/\/+/g, "/");

      if (itemPath === `/${segments.slice(0, segIdx + 1).join("/")}`) {
        titles.push(item.title);

        if (item.items && segIdx + 1 < segments.length) {
          if (search(item.items, segIdx + 1, itemPath)) return true;
        } else if (segIdx + 1 === segments.length) {
          return true;
        }
      } else if (item.items) {
        if (search(item.items, segIdx, itemPath)) return true;
      }
    }
    return false;
  }

  search(navData, 0);
  return titles;
}
