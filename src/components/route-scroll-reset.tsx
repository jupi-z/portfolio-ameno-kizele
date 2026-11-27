"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function RouteScrollReset() {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const historyPathname = useRef<string | null>(null);

  useEffect(() => {
    const rememberHistoryNavigation = () => {
      historyPathname.current = window.location.pathname;
    };

    window.addEventListener("popstate", rememberHistoryNavigation);
    return () => window.removeEventListener("popstate", rememberHistoryNavigation);
  }, []);

  useEffect(() => {
    if (previousPathname.current === pathname) return;

    previousPathname.current = pathname;
    document.querySelector<HTMLDetailsElement>(".mobile-menu[open]")?.removeAttribute("open");

    const cameFromHistory = historyPathname.current === pathname;
    historyPathname.current = null;

    if (cameFromHistory || window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
