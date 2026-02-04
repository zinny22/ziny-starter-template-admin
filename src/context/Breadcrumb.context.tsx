"use client";

import { usePathname } from "next/navigation";
import { getBreadcrumbItems } from "@/utils/";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type BreadcrumbContextType = {
  breadcrumbs: { title: string; url: string }[];
  setBreadcrumbs: (
    items: { title: string; url: string }[],
    manual?: boolean
  ) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbsState] = useState<
    { title: string; url: string }[]
  >(getBreadcrumbItems(pathname));
  const isManualRef = useRef(false);

  const setBreadcrumbs = (
    items: { title: string; url: string }[],
    manual?: boolean
  ) => {
    setBreadcrumbsState(items);
    if (manual) isManualRef.current = true;
  };

  useEffect(() => {
    if (isManualRef.current) {
      isManualRef.current = false; // 한 번만 무시
      return;
    }
    setBreadcrumbsState(getBreadcrumbItems(pathname));
  }, [pathname]);

  const value = useMemo(() => ({ breadcrumbs, setBreadcrumbs }), [breadcrumbs]);

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumbs = () => {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx)
    throw new Error("useBreadcrumbs must be used within a BreadcrumbProvider");
  return ctx;
};
