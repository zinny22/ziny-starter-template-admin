"use client";

import { useRouter } from "next/navigation";
import { useBreadcrumbs } from "@/context";
import { Breadcrumb, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Separator, SidebarTrigger } from "../ui";

function Header() {
  const router = useRouter();
  const { breadcrumbs } = useBreadcrumbs();

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-50 bg-white dark:bg-gray-900">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center justify-between gap-2 w-full">
        
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return(
              <div
                key={index}
                className="flex items-center gap-2 cursor-pointer"
              >
                <BreadcrumbPage
                  className={
                    isLast
                      ? "text-gray-950 dark:text-gray-400"
                      : "text-gray-600 dark:text-gray-400"
                  }
                  onClick={() => router.push(item.url)}
                >
                  {item.title}
                </BreadcrumbPage>
                
                {!isLast && (
                  <BreadcrumbSeparator className="" />
                )}
              </div>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}

export default Header;
