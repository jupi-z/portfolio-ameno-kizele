import Image from "next/image";
import type { Metadata } from "next";
import { ActionLink, Eyebrow, PageShell, Portrait } from "@/components/site";
import styles from "./journey.module.css";

export const metadata: Metadata = {
  title: "Parcours de Ameno Kizele Mwine",
  description:
    "Expérience et formation d’Ameno Kizele Mwine, software engineer à Kolwezi : développement backend, applications web et Android, systèmes métier.",
  alternates: { canonical: "/parcours", languages: { fr: "/parcours", en: "/en/career", "x-default": "/parcours" } },
  openGraph: {
    title: "Parcours — Ameno Kizele Mwine",
    description: "Expérience, formation et pratique du développement logiciel en RDC.",
    url: "/parcours",
    images: [{ url: "/og/fr", width: 1200, height: 630, alt: "Parcours — Ameno Kizele Mwine" }],
  },
  twitter: { title: "Parcours — Ameno Kizele Mwine", images: ["/og/fr"] },
};

const roles = [
  ["2026 — présent", "MonarQue Group / LTEX", "Responsable technique · produits & systèmes numériques", "Architecture backend/API, données, coordination de trois développeurs et exploitation de services Linux."],
  ["2024 — 2026", "Zingatia", "Responsable technologie & projets numériques", "Cadrage client, choix techniques et coordination de la réalisation jusqu’à la livraison."],
  ["2020 — 2024", "Développement indépendant", "Missions rémunérées · Kolwezi / à distance", "Applications web, API, intégrations, déploiements et maintenance."],
  ["2017 — 2020", "INNOVAC", "Frontend junior · formation pratique rémunérée", "Interfaces connectées aux API, composants réutilisables et amélioration de code existant."],
];

export default function JourneyPage() { return <PageShell active="Parcours"><div className="journey-page"><section className="journey-intro"><div><Eyebrow>Ameno Kizele Mwine</Eyebrow><h1>Le métier en tête.<br />La technique<br />entre les mains.</h1><p className="lead">Je développe des applications métier en reliant les usages, les données et les interfaces.</p><p>Mon parcours associe développement indépendant, projets clients et responsabilité technique chez MonarQue Group / LTEX, après une activité de projets numériques chez Zingatia.</p></div><Portrait /></section><section className="journey-experience section-wash"><div className="section-container"><Eyebrow>Une pratique sur le terrain</Eyebrow><h2>Du développement<br />à la responsabilité technique.</h2><div className="timeline">{roles.map(([date,company,title,desc])=><article key={company}><span className="timeline-date">{date}</span><div><h3>{company}</h3><p className="role-title">{title}</p><p>{desc}</p></div></article>)}</div></div></section><section className={`education ${styles.education}`}><div className="education-art"><Image src="/figma-assets/illustration-reading.svg" alt="Illustration d’une personne qui lit" width={460} height={345} /></div><div className="education-copy"><Eyebrow>Apprendre &amp; communiquer</Eyebrow><h2>La pratique continue.<br />L’apprentissage aussi.</h2><div className="education-details"><p>ISICOM · Kolwezi, 2021–2023<br />Cursus en génie logiciel suivi jusqu’en troisième année.</p><p>Institut Ukweli · 2020<br />Diplôme d’État · Latin-Philosophie.</p></div><p>Français et swahili : maîtrise professionnelle.<br />Anglais : très bonne compréhension, expression orale intermédiaire.</p><ActionLink href="/contact?subject=cv" tone="blue">Demander mon CV</ActionLink></div></section></div></PageShell>; }
