"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/auth.context";

function ProviderLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

export default ProviderLayout;
