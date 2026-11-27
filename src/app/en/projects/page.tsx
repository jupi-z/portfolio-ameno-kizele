import type { Metadata } from "next";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectGalleryFallback } from "@/components/project-gallery-fallback";
import { Eyebrow, PageShell } from "@/components/site";
import { Suspense } from "react";
export const metadata: Metadata = { title: "Software projects and case studies", description: "Explore documented case studies in APIs, web and Android applications, and business software.", alternates: { canonical: "/en/projects", languages: { fr: "/projets", en: "/en/projects", "x-default": "/projets" } }, openGraph: { title: "Software projects — Ameno Kizele Mwine", url: "/en/projects", images: [{ url: "/og/en", width: 1200, height: 630, alt: "Software projects — Ameno Kizele Mwine" }] }, twitter: { images: ["/og/en"] } };
export default function EnglishProjects() { return <PageShell active="Projects" locale="en"><section className="listing-intro"><Eyebrow>Code, products &amp; applications</Eyebrow><h1>Projects.<br />Decisions. Use.</h1><p>Each case study outlines the need, technical decisions and scope supported by the available sources.</p><Suspense fallback={<ProjectGalleryFallback locale="en" filtersOnly />}><ProjectGallery filtersOnly locale="en" /></Suspense></section><Suspense fallback={<ProjectGalleryFallback locale="en" />}><ProjectGallery cardsOnly locale="en" /></Suspense></PageShell>; }
