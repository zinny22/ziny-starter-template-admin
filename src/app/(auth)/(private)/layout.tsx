"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header, Sidebar } from "@/components/layout";
import { SidebarInset } from "@/components/ui/sidebar";

function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    router.replace("/sign-in");
    return null;
  }

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AuthLayout;
