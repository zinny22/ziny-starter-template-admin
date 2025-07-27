"use client";

import { ReactNode } from "react";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";

function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthInitialized } = useAuth();

  if (!isAuthInitialized) {
    router.replace("/sign-in");
    return null;
  }

  return <>{children}</>;
}

export default AuthLayout;
