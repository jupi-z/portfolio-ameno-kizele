import Image from "next/image";
import { Eyebrow, MethodRoadmap, PageShell } from "@/components/site";

const fields = [
  ["Backend & API", "TypeScript, NestJS, Express et Kotlin/Ktor. Des contrats explicites et des règles métier."],
  ["Web & Android", "React, Next.js et Kotlin natif. Relier les parcours aux données."],
  ["Données & cohérence", "PostgreSQL, Prisma, migrations et transactions. Structurer les états et les transitions."],
  ["Accès & traçabilité", "Permissions, sessions et audit. Clarifier ce qui peut être fait, par qui et dans quel contexte."],
  ["Livraison & maintenance", "Linux, Docker, Nginx et déploiement. Préparer le fonctionnement après la livraison."],
  ["Coordination technique", "Relier cadrage, choix techniques et implémentation, avec une documentation exploitable."],
];

export default function MethodPage() {
  return <PageShell active="Ma méthode">
    <section className="method-intro"><div className="section-container"><Eyebrow>Clarté · Cohérence · Vérification</Eyebrow><h1>L’intention donne<br />le cap au code.</h1><p className="lead">Un chemin de travail lisible pour relier le besoin au fonctionnement réel du système.</p></div></section>
    <section className="method-roadmap-section"><div className="section-container method-roadmap-layout"><div className="method-roadmap-intro"><Eyebrow>Comment je travaille</Eyebrow><h2>Du besoin<br />à la livraison.</h2><p>Comprendre avant de construire. Clarifier les règles. Puis vérifier ce qui compte dans l’usage.</p><Image src="/figma-assets/8-83.svg" alt="Illustration d’une personne qui lit" width={330} height={247.5} /></div><MethodRoadmap /></div><p className="method-handnote section-container">Chaque étape sert l’usage.</p></section>
    <section className="expertise expertise-dark"><div className="section-container"><Eyebrow dark>Ce que je fais</Eyebrow><h2>Des systèmes pensés<br />pour être utilisés.</h2><p className="expertise-intro">Une dominante backend et API, avec une pratique du web, d’Android et de l’exploitation.</p><div className="expertise-grid">{fields.map(([title,description],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
  </PageShell>;
}
