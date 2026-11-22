import { Suspense } from "react";
import { ProjectGallery } from "@/components/project-gallery";
import { Eyebrow, PageShell } from "@/components/site";

export default function ProjectsPage() { return <PageShell active="Projets"><section className="listing-intro"><Eyebrow>Code, produits &amp; applications</Eyebrow><h1>Des projets.<br />Des choix. Des usages.</h1><p>Chaque étude de cas expose le besoin, les décisions techniques et le périmètre réellement présent dans les sources.</p></section><Suspense fallback={<section className="listing-grid" aria-label="Chargement des projets" />}><ProjectGallery /></Suspense></PageShell>; }
