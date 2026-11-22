import type { Metadata } from "next";
import "./globals.css";
import { Caveat, Manrope, DM_Sans, IBM_Plex_Mono } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Ameno Kizele — Software Engineer",
  description: "Je développe des API et des applications métier, du cadrage au déploiement.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manrope.variable} ${dmSans.variable} ${caveat.variable} ${ibmPlexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
