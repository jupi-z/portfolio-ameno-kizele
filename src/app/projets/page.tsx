import { Suspense } from "react";
import type { Metadata } from "next";
import { ProjectGallery } from "@/components/project-gallery";
import { Eyebrow, PageShell } from "@/components/site";

export const metadata: Metadata = {
  title: "Projets logiciels et études de cas",
  description:
    "Découvrez les projets d’Ameno Kizele : API, applications web et Android, outils métier et études de cas avec périmètres et preuves documentés.",
  alternates: { canonical: "/projets" },
  openGraph: {
    title: "Projets logiciels — Ameno Kizele Mwine",
    description: "Études de cas en backend, API, web, Android et systèmes métier.",
    url: "/projets",
  },
  twitter: { title: "Projets logiciels — Ameno Kizele Mwine" },
};

export default function ProjectsPage() { return <PageShell active="Projets"><section className="listing-intro"><Eyebrow>Code, produits &amp; applications</Eyebrow><h1>Des projets.<br />Des choix. Des usages.</h1><p>Chaque étude de cas expose le besoin, les décisions techniques et le périmètre réellement présent dans les sources.</p><Suspense fallback={<div className="filters gallery-filters" aria-label="Chargement des filtres" />}><ProjectGallery filtersOnly /></Suspense></section><Suspense fallback={<section className="listing-grid" aria-label="Chargement des projets" />}><ProjectGallery cardsOnly /></Suspense></PageShell>; }
