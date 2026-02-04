"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Header, Sidebar } from "@/components/layout";
import { SidebarInset } from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/authStore";

function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, isAuthInitialized } = useAuthStore();

  useEffect(() => {
    if (isAuthInitialized && !isLoggedIn) {
      router.replace("/sign-in");
    }
  }, [isLoggedIn, isAuthInitialized, router]);

  if (!isAuthInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AuthLayout;
