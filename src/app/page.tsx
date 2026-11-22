import Image from "next/image";
import Link from "next/link";
import { ActionLink, Eyebrow, MethodRoadmap, PageShell, Portrait } from "@/components/site";
import { projects } from "@/data/projects";

const expertise = [
  ["Backend & API", "TypeScript, NestJS, Express et Kotlin/Ktor. Des contrats explicites et des règles métier."],
  ["Web & Android", "React, Next.js et Kotlin natif. Relier les parcours aux données."],
  ["Données & cohérence", "PostgreSQL, Prisma, migrations et transactions. Structurer les états et les transitions."],
  ["Accès & traçabilité", "Permissions, sessions et audit. Clarifier ce qui peut être fait, par qui et dans quel contexte."],
  ["Livraison & maintenance", "Linux, Docker, Nginx et déploiement. Préparer le fonctionnement après la livraison."],
  ["Coordination technique", "Relier cadrage, choix techniques et implémentation, avec une documentation exploitable."],
];

export default function Home() {
  return <PageShell active="Accueil">
    <section className="hero"><div className="hero-layout"><div className="hero-copy"><Eyebrow>Ameno Kizele · Software Engineer</Eyebrow><h1>DU MÉTIER<br /><em>AU LOGICIEL.</em><br /><span>AVEC INTENTION.</span></h1><div className="hero-description"><p>Je développe des API et des applications métier, du cadrage au déploiement.</p><ActionLink href="/projets">Explorer mes projets</ActionLink><Link className="text-link" href="/parcours">Mon parcours &amp; mon CV <span>↗</span></Link></div></div><Portrait /></div><div className="signature">{["Backend & API", "Web", "Android natif", "Systèmes métier"].map((x)=><span key={x}><Image src="/figma-assets/asterisk-feature.svg" alt="" width={20} height={20} />{x}</span>)}</div></section>

    <section className="about section-wash"><div className="section-container"><div className="about-top"><div><Eyebrow>Le point de départ</Eyebrow><h2>Comprendre l’usage.<br />Construire le bon système.</h2></div><div className="about-columns"><p className="lead">Je relie les besoins opérationnels aux décisions techniques, du cadrage au déploiement.</p><div><p>Mon travail associe backend, données, interfaces web et Android, avec une attention aux règles métier et à la maintenance.</p><Link className="under-link" href="/parcours">Mon parcours en détail <span>↗</span></Link></div></div></div><div className="about-panels"><article><Image className="topographic-art" src="/figma-assets/10-80.svg" alt="" width={800} height={310} /><span>Du besoin<br />à la livraison.</span><div className="panel-tags"><b>Architecture</b><b>Interfaces</b><b>Exploitation</b></div></article><article><span>Une pratique<br />de bout en bout.</span><p>Des données aux interfaces, garder une lecture cohérente de l’ensemble.</p><Image className="approach-star" src="/figma-assets/asterisk-feature.svg" width={58} height={58} alt="" /></article></div></div></section>

    <section className="method-preview"><div className="section-container"><Eyebrow>Comment je travaille</Eyebrow><div className="method-showcase"><div className="method-lead"><h2>Du besoin<br />à la livraison.</h2><p>Comprendre avant de construire. Clarifier les règles. Puis vérifier ce qui compte dans l’usage.</p><Image src="/figma-assets/8-83.svg" alt="Illustration d’une personne en train de lire" width={279} height={323} /></div><MethodRoadmap /></div><Link className="method-more" href="/methode">Chaque étape sert l’usage. <span>Découvrir ma méthode ↗</span></Link></div></section>

    <section className="expertise expertise-dark"><div className="section-container"><Eyebrow dark>Ce que je fais</Eyebrow><h2>Des systèmes pensés<br />pour être utilisés.</h2><p className="expertise-intro">Une dominante backend et API, avec une pratique du web, d’Android et de l’exploitation.</p><div className="expertise-grid">{expertise.map(([title,description],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

    <section className="projects-preview"><div className="section-container"><div className="section-heading"><div><Eyebrow>Quelques réalisations</Eyebrow><h2>Le travail,<br />côté concret.</h2><p>Trois projets pour entrer dans ma pratique : produit, règles métier et backend public.</p></div><Link className="under-link" href="/projets">Explorer les six projets <span>↗</span></Link></div><div className="project-grid featured-grid">{projects.slice(0,3).map((p)=><Link href={`/projets/${p.slug}`} className="project-card" key={p.slug}><div className="featured-art"><Image src={`/figma-assets/${p.cover}`} alt="" width={600} height={360} /><span>↗</span></div><div className="project-title"><h3>{p.title}</h3><b>↗</b></div><p>{p.summary}</p><small>{p.cardStatus}</small></Link>)}</div></div></section>

    <section className="posture"><div className="section-container posture-inner"><Image src="/figma-assets/8-3.svg" alt="Illustration d’une personne en lévitation" width={458} height={252} /><div><Eyebrow>Une même exigence</Eyebrow><h2>La qualité se voit.<br />La rigueur aussi.</h2><p>Relier les parcours fiables, documenter les choix et maintenir le périmètre réel de chaque projet.</p><Link className="under-link" href="/methode">Découvrir ma méthode <span>↗</span></Link></div></div></section>
  </PageShell>;
}

