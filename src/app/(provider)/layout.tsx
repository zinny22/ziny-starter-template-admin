"use client";

import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header, Sidebar } from "@/components/layout";
import { AuthProvider } from "@/contexts/auth.context";

function ProviderLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default ProviderLayout;
