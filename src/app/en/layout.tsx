import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Caveat, Manrope, DM_Sans, IBM_Plex_Mono } from "next/font/google";
import "../globals.css";
import { RouteScrollReset } from "@/components/route-scroll-reset";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ameno.monarquegrp.com"),
  title: { default: "Ameno Kizele Mwine — Software Engineer in DR Congo", template: "%s | Ameno Kizele Mwine" },
  description: "Software engineer in Kolwezi and Lubumbashi, building APIs and web, business and Android applications from discovery to delivery.",
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en", "x-default": "/" } },
  openGraph: { type: "website", locale: "en_US", url: "/en", siteName: "Ameno Kizele Mwine — Portfolio" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <html lang="en" className={`${manrope.variable} ${dmSans.variable} ${caveat.variable} ${ibmPlexMono.variable}`}><body><RouteScrollReset />{children}</body></html>;
}
