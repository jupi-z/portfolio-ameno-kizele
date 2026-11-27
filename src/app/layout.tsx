import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Caveat, Manrope, DM_Sans, IBM_Plex_Mono } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://ameno.monarquegrp.com"),
  title: {
    default: "Ameno Kizele Mwine — Software engineer en RDC",
    template: "%s | Ameno Kizele Mwine",
  },
  description:
    "Software engineer à Kolwezi et Lubumbashi, Ameno Kizele conçoit des API et des applications web, métier et Android, du cadrage au déploiement.",
  applicationName: "Portfolio Ameno Kizele",
  authors: [{ name: "Ameno Kizele Mwine", url: "https://ameno.monarquegrp.com" }],
  creator: "Ameno Kizele Mwine",
  publisher: "Ameno Kizele Mwine",
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_CD",
    url: "/",
    siteName: "Ameno Kizele Mwine — Portfolio",
    title: "Ameno Kizele Mwine — Software engineer en RDC",
    description:
      "API, applications web et Android, systèmes métier : le parcours et les réalisations d’Ameno Kizele à Kolwezi et Lubumbashi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ameno Kizele Mwine — Software engineer en RDC",
    description:
      "API, applications web et Android, systèmes métier : le parcours et les réalisations d’Ameno Kizele.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = { themeColor: "#14171c" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manrope.variable} ${dmSans.variable} ${caveat.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
