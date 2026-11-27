import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ActionLink, Eyebrow, MethodRoadmap, PageShell, Portrait } from "@/components/site";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Ameno Kizele Mwine — Software Engineer in Kolwezi and Lubumbashi",
  description: "Ameno Kizele Mwine builds APIs and business, web and Android applications in DR Congo, from discovery to delivery.",
  alternates: { canonical: "/en", languages: { fr: "/", en: "/en", "x-default": "/" } },
  openGraph: { title: "Ameno Kizele Mwine — Software Engineer in DR Congo", description: "APIs, web and Android applications, and business systems.", url: "/en", type: "profile", images: [{ url: "/og/en", width: 1200, height: 630, alt: "Ameno Kizele Mwine — Software Engineer in DR Congo" }] },
  twitter: { images: ["/og/en"] },
};

const short = ["Invitations & access control", "Accounting & operations", "Role-based access control", "Modular business platform", "Bilingual portfolio & CMS", "Offline-first Android demo"];
const expertise = [
  ["Backend & APIs", "TypeScript, NestJS, Express and Kotlin/Ktor. Explicit contracts and business rules."],
  ["Web & Android", "React, Next.js and native Kotlin. Connect user journeys to data."],
  ["Data & consistency", "PostgreSQL, Prisma, migrations and transactions. Structure states and transitions."],
  ["Access & traceability", "Permissions, sessions and audit. Clarify who can do what, and in which context."],
  ["Delivery & maintenance", "Linux, Docker, Nginx and deployment. Plan for how software runs after delivery."],
  ["Technical coordination", "Connect discovery, technical choices and implementation with useful documentation."],
];
export default function EnglishHome() {
  return <PageShell active="Home" locale="en"><div className="home-page">
    <section className="hero"><div className="hero-layout"><div className="hero-copy"><Eyebrow>Ameno Kizele · Software Engineer</Eyebrow><h1><span className="hero-line">FROM NEED</span><span className="hero-line hero-line-blue">TO SOFTWARE.</span><span className="hero-line hero-line-small">WITH INTENT.</span></h1><div className="hero-description"><p>I build APIs and business applications, from discovery through delivery.</p><ActionLink href="/en/projects">Explore my projects</ActionLink><Link className="text-link" href="/en/career"><span className="link-label">Experience &amp; CV</span></Link></div></div><Portrait locale="en" /></div><div className="signature"><span>Backend &amp; APIs</span><span>Web</span><span>Native Android</span><span>Business systems</span></div></section>
    <section className="about section-wash"><div className="section-container"><Eyebrow>Starting point</Eyebrow><h2>Understand the use.<br />Build the right system.</h2><div className="about-columns"><p className="lead">I connect operational needs with technical decisions, from discovery to delivery.</p><div><p>My work combines backend, data, web and Android interfaces, with close attention to business rules and maintainability.</p><Link className="under-link" href="/en/career"><span className="link-label">My experience</span></Link></div></div><div className="about-panels"><article><Image className="topographic-art" src="/figma-assets/10-80.svg" alt="" width={800} height={310} /><span>From need<br />to delivery.</span><div className="panel-tags"><b>Architecture</b><b>Interfaces</b><b>Operations</b></div></article><article><span>End-to-end<br />practice.</span><p>Keep a coherent view from data through to interfaces.</p><Image className="approach-star" src="/figma-assets/asset_10-2_5.svg" width={58} height={58} alt="" /></article></div></div></section>
    <section className="method-preview"><div className="section-container"><div className="method-showcase"><div className="method-lead"><Eyebrow>How I work</Eyebrow><h2>From need<br />to delivery.</h2><p>Understand before building. Clarify the rules. Then verify what matters in use.</p><Image className="reading-art" src="/figma-assets/asset_10-2_11.svg" alt="A person reading" width={192} height={222} /></div><MethodRoadmap locale="en" /></div><p className="method-note">Every step serves the user.</p></div></section>
    <section className="expertise expertise-dark"><div className="section-container"><Eyebrow dark>What I do</Eyebrow><h2>Systems designed<br />to be used.</h2><p className="expertise-intro">A backend and API focus, alongside web, Android and operations experience.</p><div className="expertise-grid">{expertise.map(([title, description], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>
    <section className="projects-preview"><div className="section-container"><div className="section-heading"><div><Eyebrow>Selected work</Eyebrow><h2>Work,<br />made concrete.</h2><p>Six documented case studies across products, operations and software engineering.</p></div></div><div className="project-grid featured-grid">{projects.slice(0, 3).map((p, i) => <Link href={`/en/projects/${p.slug}`} className="project-card" key={p.slug}><div className="featured-art"><Image src={`/figma-assets/${p.cover}`} alt="" width={600} height={360} /></div><div className="project-title"><h3>{p.title}</h3></div><p>{short[i]}</p><small>{p.cardStatus.includes("cadrage") ? "Scope documented · next phase in discovery" : "Documented case study"}</small></Link>)}</div><Link className="projects-more" href="/en/projects"><span className="link-label">Explore all six projects</span></Link></div></section>
    <section className="posture"><div className="section-container posture-inner"><div className="posture-art"><Image src="/figma-assets/posture-illustration.svg" alt="A person floating" width={458} height={252} /></div><div><Eyebrow>A consistent standard</Eyebrow><h2>Quality is visible.<br />So is rigor.</h2><p>Make journeys clear, document decisions and describe each project’s actual scope.</p><Link className="under-link" href="/en/method"><span className="link-label">Discover my method</span></Link></div></div></section>
  </div></PageShell>;
}
