"use client";

import { useEffect } from "react";

export function MobileMenuEscape() {
  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const menu = document.querySelector<HTMLDetailsElement>(".mobile-menu[open]");
      if (!menu) return;
      menu.open = false;
      menu.querySelector<HTMLElement>("summary")?.focus();
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, []);
  return null;
}
