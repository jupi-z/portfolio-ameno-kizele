import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ActionLink, Arrow, Eyebrow, MethodRoadmap, PageShell, Portrait } from "@/components/site";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Ameno Kizele Mwine — Software engineer à Kolwezi et Lubumbashi",
  description:
    "Ameno Kizele Mwine conçoit des API et des applications web, métier et Android en RDC, du cadrage au déploiement.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ameno Kizele Mwine — Software engineer en RDC",
    description:
      "API, applications web et Android, systèmes métier : le parcours et les réalisations d’Ameno Kizele à Kolwezi et Lubumbashi.",
    url: "/",
    type: "profile",
  },
  twitter: {
    title: "Ameno Kizele Mwine — Software engineer en RDC",
    description: "API, applications web et Android, systèmes métier, du cadrage au déploiement.",
  },
};

const expertise = [
  ["Backend & API", "TypeScript, NestJS, Express et Kotlin/Ktor. Des contrats explicites et des règles métier."],
  ["Web & Android", "React, Next.js et Kotlin natif. Relier les parcours aux données."],
  ["Données & cohérence", "PostgreSQL, Prisma, migrations et transactions. Structurer les états et les transitions."],
  ["Accès & traçabilité", "Permissions, sessions et audit. Clarifier ce qui peut être fait, par qui et dans quel contexte."],
  ["Livraison & maintenance", "Linux, Docker, Nginx et déploiement. Préparer le fonctionnement après la livraison."],
  ["Coordination technique", "Relier cadrage, choix techniques et implémentation, avec une documentation exploitable."],
];

export default function Home() {
  const personId = "https://ameno.monarquegrp.com/#ameno-kizele";
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://ameno.monarquegrp.com/#website",
      name: "Ameno Kizele Mwine — Portfolio",
      url: "https://ameno.monarquegrp.com/",
      inLanguage: "fr-CD",
      publisher: { "@id": personId },
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: "Portfolio d’Ameno Kizele Mwine",
      url: "https://ameno.monarquegrp.com/",
      mainEntity: {
        "@type": "Person",
        "@id": personId,
        name: "Ameno Kizele Mwine",
        alternateName: "Ameno Kizele",
        url: "https://ameno.monarquegrp.com/",
        image: "https://ameno.monarquegrp.com/figma-assets/asset_10-2_0.png",
        jobTitle: "Software Engineer",
        description:
          "Software engineer basé à Kolwezi et Lubumbashi, spécialisé en API, applications web, Android et systèmes métier.",
        email: "ameno.aton4@gmail.com",
        telephone: "+243843187952",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kolwezi",
          addressRegion: "Lualaba",
          addressCountry: "CD",
        },
        sameAs: [
          "https://github.com/jupi-z",
          "https://www.linkedin.com/in/ameno-kizele-3b8322360",
        ],
        knowsAbout: [
          "Développement logiciel",
          "API et systèmes backend",
          "Applications web",
          "Applications Android",
          "Applications métier",
          "PostgreSQL et conception de données",
          "Architecture logicielle",
          "Déploiement et maintenance",
        ],
      },
    },
  ];

  const signature = [
    ["Backend & API", "/figma-assets/asset_10-2_15.svg"],
    ["Web", "/figma-assets/asset_10-2_4.svg"],
    ["Android natif", "/figma-assets/asset_10-2_15.svg"],
    ["Systèmes métier", "/figma-assets/asset_10-2_4.svg"],
  ];

  return <PageShell active="Accueil"><div className="home-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <section className="hero"><div className="hero-layout"><div className="hero-copy"><Eyebrow>Ameno Kizele · Software Engineer</Eyebrow><h1><span className="hero-line">DU MÉTIER</span><span className="hero-line hero-line-blue">AU LOGICIEL.</span><span className="hero-line hero-line-small">AVEC INTENTION.</span></h1><div className="hero-description"><p>Je développe des API et des applications métier, du cadrage au déploiement.</p><ActionLink href="/projets">Explorer mes projets</ActionLink><Link className="text-link" href="/parcours"><span className="link-label">Mon parcours &amp; mon CV</span><Arrow /></Link></div></div><Portrait /></div><div className="signature">{signature.map(([label,icon])=><span key={label}><Image src={icon} alt="" width={20} height={20} />{label}</span>)}</div></section>

    <section className="about section-wash"><div className="section-container"><Eyebrow>Le point de départ</Eyebrow><h2>Comprendre l’usage.<br />Construire le bon système.</h2><div className="about-columns"><p className="lead">Je relie les besoins opérationnels aux décisions techniques, du cadrage au déploiement.</p><div><p>Mon travail associe backend, données, interfaces web et Android, avec une attention aux règles métier et à la maintenance.</p><Link className="under-link" href="/parcours"><span className="link-label">Mon parcours en détail</span><Arrow /></Link></div></div><div className="about-panels"><article><Image className="topographic-art" src="/figma-assets/10-80.svg" alt="" width={800} height={310} /><span>Du besoin<br />à la livraison.</span><div className="panel-tags"><b>Architecture</b><b>Interfaces</b><b>Exploitation</b></div></article><article><span>Une pratique<br />de bout en bout.</span><p>Des données aux interfaces, garder une lecture cohérente de l’ensemble.</p><Image className="approach-star" src="/figma-assets/asset_10-2_5.svg" width={58} height={58} alt="" /></article></div></div></section>

    <section className="method-preview"><div className="section-container"><div className="method-showcase"><div className="method-lead"><Eyebrow>Comment je travaille</Eyebrow><h2>Du besoin<br />à la livraison.</h2><p>Comprendre avant de construire. Clarifier les règles. Puis vérifier ce qui compte dans l’usage.</p><div className="reading-art"><Image src="/figma-assets/asset_10-2_11.svg" alt="Illustration d’une personne en train de lire" width={192} height={222} /></div></div><MethodRoadmap /></div><p className="method-note">Chaque étape sert l’usage.</p></div></section>

    <section className="expertise expertise-dark"><div className="section-container"><Eyebrow dark>Ce que je fais</Eyebrow><h2>Des systèmes pensés<br />pour être utilisés.</h2><p className="expertise-intro">Une dominante backend et API, avec une pratique du web, d’Android et de l’exploitation.</p><div className="expertise-grid">{expertise.map(([title,description],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <section className="projects-preview"><div className="section-container"><div className="section-heading"><div><Eyebrow>Quelques réalisations</Eyebrow><h2>Le travail,<br />côté concret.</h2><p>Trois projets pour entrer dans ma pratique : produit, opérations métier et backend public.</p></div></div><div className="project-grid featured-grid">{projects.slice(0,3).map((p)=><Link href={`/projets/${p.slug}`} className="project-card" key={p.slug}><div className="featured-art"><Image src={`/figma-assets/${p.cover}`} alt="" width={600} height={360} /></div><div className="project-title"><h3>{p.title}</h3><b><Arrow /></b></div><p>{p.summary}</p><small>{p.cardStatus}</small></Link>)}</div><Link className="projects-more" href="/projets"><span className="link-label">Explorer les six projets</span><Arrow /></Link></div></section>

    <section className="posture"><div className="section-container posture-inner"><div className="posture-art"><Image src="/figma-assets/posture-illustration.svg" alt="Illustration d’une personne en lévitation" width={458} height={252} /></div><div><Eyebrow>Une même exigence</Eyebrow><h2>La qualité se voit.<br />La rigueur aussi.</h2><p>Rendre les parcours lisibles, documenter les choix et montrer le périmètre réel de chaque projet.</p><Link className="under-link" href="/methode"><span className="link-label">Découvrir ma méthode</span><Arrow /></Link></div></div></section>
  </div></PageShell>;
}

