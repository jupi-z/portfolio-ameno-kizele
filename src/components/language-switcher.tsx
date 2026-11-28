"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/localization";

export function LanguageSwitcher({ locale, mobile = false }: { locale: Locale; mobile?: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const href = `${localizedPath(pathname, locale)}${searchParams.size ? `?${searchParams.toString()}` : ""}`;
  const nextLocale: Locale = locale === "fr" ? "en" : "fr";
  const languageName = locale === "fr" ? "English" : "Français";
  const visibleCode = locale === "fr" ? "EN" : "FR";
  const label = `${visibleCode} — ${locale === "fr" ? "Switch to English" : "Passer en français"}`;

  return <Link className={`language-switcher${mobile ? " language-switcher-mobile" : ""}`} href={href} hrefLang={nextLocale} lang={nextLocale} aria-label={label} title={label}>
    <span>{visibleCode}</span>
    <span className="language-switcher-label">{languageName}</span>
  </Link>;
}
