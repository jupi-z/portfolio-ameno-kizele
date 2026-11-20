import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, PageShell } from "@/components/site";
import { projects } from "@/data/projects";

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(({ slug: candidate }) => candidate === slug);
  if (!project) notFound();
  const next = projects.find(({ slug: candidate }) => candidate === project.next)!;
  const isRepository = project.cta.startsWith("Consulter");

  return <PageShell active="Projets">
    <section className="case-intro">
      <Link className="back-link" href="/projets">Tous les projets <span>↗</span></Link>
      <div className="case-heading">
        <div className="case-copy-intro"><Eyebrow>{project.eyebrow}</Eyebrow><h1>{project.heroTitle}</h1><p>{project.summary}.</p><p className="case-tech">{project.tech}</p><small>{project.status}</small></div>
        <Image className="case-cover" src={`/figma-assets/${project.cover}`} alt={`Couverture du projet ${project.title}`} width={600} height={360} priority />
      </div>
    </section>

    <section className="case-section case-need section-wash"><div className="case-label"><Eyebrow>01 · Le besoin</Eyebrow><h2>Partir du<br />problème réel.</h2></div><div className="case-copy"><p>{project.lead}</p></div></section>

    <section className="case-section case-intervention"><div className="case-label"><span className="case-kicker">02 · Intervention documentée</span><h2>Relier les usages.<br />Maîtriser le système.</h2></div><div className="case-copy"><p>{project.intervention}</p><p className="case-source">Périmètre documenté : architecture, règles métier, intégration et preuves disponibles.</p></div></section>

    <section className="case-section case-decisions"><div className="case-label"><Eyebrow>03 · Les choix</Eyebrow><h2>Des décisions qui<br />structurent le produit.</h2></div><div className="decision-list">{project.decisions.map((decision, index)=><article key={decision}><span className={`decision-number decision-${index}`}>0{index+1}</span><p>{decision}</p></article>)}</div></section>

    <section className="case-mechanism"><div className="case-mechanism-inner"><Eyebrow dark>04 · Un mécanisme concret</Eyebrow><h2>{project.mechanismTitle}</h2><div className="mechanism-cards">{project.mechanism.map(([title, description], index)=><article className={index === 1 ? "mechanism-highlight" : ""} key={title}><span>0{index+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div><small>Lecture du code existant. Le périmètre de chaque projet reste celui des éléments présentés.</small></div></section>

    <section className="case-proofs section-wash"><div className="case-proof-head"><span className="case-kicker">05 · Contrôles &amp; preuves</span><h2>Des comportements<br />à examiner.</h2><p>{project.proofIntro}</p></div><div className="proof-list">{project.proofs.map(([title, description, kind, link], index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{description}</p></div><div className="proof-source"><strong>{kind}</strong><span>{link}</span><small>Revue · 13 nov. 2026</small></div><b>↗</b></article>)}</div><p className="proof-footnote">Sources examinées le 13 novembre 2026. Le type de preuve distingue code, tests présents et validation observée.</p></section>

    <section className="case-section case-result"><div className="case-label"><Eyebrow>06 · Résultat &amp; périmètre</Eyebrow><h2>Un résultat observable.<br />Un périmètre explicite.</h2></div><div className="case-copy case-scope">{project.scope.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}<p className="case-source">Les statuts présentés décrivent le niveau de preuve disponible pour ce périmètre.</p><a className="case-cta" href={isRepository ? project.repositoryUrl : "/contact"} target={isRepository ? "_blank" : undefined} rel={isRepository ? "noreferrer" : undefined}><span>{project.cta}</span><span>↗</span></a><small>Présentation fondée sur les sources du projet. Revue d’architecture et éléments de preuve disponibles sur demande.</small></div></section>

    <Link className="case-next" href={`/projets/${next.slug}`} style={{"--next-color":next.color} as React.CSSProperties}><Eyebrow>Continuer la visite</Eyebrow><h2>{next.title}</h2><span>Étude de cas suivante <b>↗</b></span></Link>
  </PageShell>;
}
