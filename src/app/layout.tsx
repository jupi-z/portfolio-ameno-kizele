import type { Metadata } from "next";
import "./globals.css";
import { Manrope, DM_Sans } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Ameno Kizele — Software Engineer",
  description: "Je développe des API et des applications métier, du cadrage au déploiement.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${manrope.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
