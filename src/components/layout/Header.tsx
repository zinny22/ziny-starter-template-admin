"use client";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getBreadcrumbTitles } from "@/utils/breadcrumb";
import { usePathname } from "next/navigation";

function Header() {
    const pathname = usePathname();

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">zinyAdmin</BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator className="hidden md:block" />

                    <BreadcrumbItem>
                        <BreadcrumbPage>{getBreadcrumbTitles(pathname)[0]}</BreadcrumbPage>
                    </BreadcrumbItem>

                    {getBreadcrumbTitles(pathname).length > 1 && (
                        <>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    {getBreadcrumbTitles(pathname)[1]}
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </>
                    )}
                </BreadcrumbList>
            </Breadcrumb>
        </header>
    );
}

export default Header;