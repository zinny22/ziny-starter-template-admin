"use client";

import { AuthProvider } from "@/shared/providers";
import { ReactNode } from "react";

function ProviderLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default ProviderLayout;
