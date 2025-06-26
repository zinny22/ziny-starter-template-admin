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
    SidebarRail,
} from "@/components/ui/sidebar";
import { navData } from "@/constants/nav";
import { useRouter } from "next/navigation";
import UserNav from "./UserNav";

function Sidebar({ ...props }: ComponentProps<typeof SidebarComponent>) {
    const router = useRouter();
    return (
        <SidebarComponent collapsible="icon" {...props}>
            <SidebarHeader>
                <UserNav
                    user={{
                        name: "ziny",
                        email: "https://github.com/zinny22",
                    }}
                />
            </SidebarHeader>

            <SidebarContent>
                {navData.map((item, index) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarMenu>
                            {item.items.map((subItem) => (
                                <SidebarMenuItem key={subItem.title}>
                                    <SidebarMenuButton
                                        tooltip={subItem.title}
                                        onClick={() => {
                                            router.push(subItem.url);
                                        }}
                                    >
                                        {subItem.icon}
                                        <span>{subItem.title}</span>
                                    </SidebarMenuButton>
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