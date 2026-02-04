import { navData } from "@/constants/nav";

export function getBreadcrumbItems(
  pathname: string
): { title: string; url: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  const items: { title: string; url: string }[] = [];

  function search(navData: any[], baseUrl = ""): boolean {
    for (const item of navData) {
      const itemUrl = item.url || baseUrl + "/" + (item.id || "");
      if (item.id && item.id === segments[0]) {
        items.push({ title: item.title, url: itemUrl });
        if (item.items) {
          // 재귀적으로 하위 메뉴 탐색
          segments.shift();
          if (search(item.items, itemUrl)) return true;
          segments.unshift(item.id); // 복구
        }
      }
      if (item.url === pathname) {
        items.push({ title: item.title, url: item.url });
        return true;
      }
    }
    return false;
  }

  search(navData);
  return items;
}
