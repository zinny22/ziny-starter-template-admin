"use client";
import { ComponentProps } from "react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useSidebar } from "@/components/ui/sidebar";
import clsx from "clsx";
import React, { useState } from "react";
import Link from "next/link";
import { navData } from "@/constants";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "sonner";

function Sidebar({ ...props }: ComponentProps<typeof SidebarComponent>) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();
  const { user } = useAuthStore();

  const [openKeys, setOpenKeys] = useState<Set<string>>(
    new Set(navData.map((item) => item.title))
  );

  const toggleOpen = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const hasPermission = (item: any) => {
    if (!item.permissions || item.permissions.length === 0) return true;
    return item.permissions.some((code: string) =>
      user?.permissions?.includes(code)
    );
  };

  const navigateIfAllowed = (item: any) => {
    if (!hasPermission(item)) {
      toast.error("해당 메뉴에 접근할 수 없는 유저입니다.");
      return;
    }

    if (item.isHidden) {
      toast.error("해당 메뉴는 접근할 수 없습니다.");
      return;
    }

    if (!item.url) return;

    router.push(item.url);
  };

  return (
    <SidebarComponent collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                {state === "collapsed" ? (
                  <Image
                    src="/logo/icon.svg"
                    alt="Logo Collapsed"
                    width={40}
                    height={40}
                    className="my-3 rounded-md"
                  />
                ) : (
                  <Image
                    src={"/logo/poppop-logo-black.svg"}
                    alt="Logo Expanded"
                    fill
                    className="my-3"
                  />
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent
        className={clsx("", state === "collapsed" ? "" : "pt-5 pl-3")}
      >
        {navData.map((item: any, index: number) => (
          <SidebarGroup key={item.title}>
            {hasPermission(item) && (
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            )}

            <SidebarMenu>
              {item.items
                ?.filter((subItem: any) => hasPermission(subItem))
                .map((subItem: any, subIdx: number) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton
                      tooltip={subItem.title}
                      onClick={() => {
                        if (subItem.items && subItem.items?.length > 0) {
                          toggleOpen(item.title);
                        } else {
                          navigateIfAllowed(subItem);
                        }
                      }}
                      disabled={subItem.isHidden}
                      className={clsx(
                        "flex items-center",
                        pathname === subItem.url &&
                          "bg-sidebar-border font-bold"
                      )}
                    >
                      {subItem.icon && subItem.icon}
                      <span>{subItem.title}</span>
                      {subItem.items && subItem.items?.length > 0 && (
                        <ChevronRight
                          className={`ml-auto transition-transform duration-200 ${openKeys.has(item.title) ? "rotate-90" : ""}`}
                        />
                      )}
                    </SidebarMenuButton>
                    {subItem.items &&
                      subItem.items?.length > 0 &&
                      openKeys.has(item.title) && (
                        <SidebarMenuSub>
                          {subItem.items
                            .filter((subSubItem: any) =>
                              hasPermission(subSubItem)
                            )
                            .map((subSubItem: any) => (
                              <SidebarMenuSubItem key={subSubItem.title}>
                                <SidebarMenuButton
                                  tooltip={subSubItem.title}
                                  onClick={() => {
                                    navigateIfAllowed(subSubItem);
                                  }}
                                  disabled={subSubItem.isHidden}
                                  className={clsx(
                                    "flex items-center",
                                    pathname === subSubItem.url &&
                                      "bg-sidebar-border font-bold"
                                  )}
                                >
                                  {subSubItem.icon}
                                  <span>{subSubItem.title}</span>
                                </SidebarMenuButton>
                              </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                      )}
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
        <SidebarRail />
      </SidebarContent>
    </SidebarComponent>
  );
}

export default Sidebar;
