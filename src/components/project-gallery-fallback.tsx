import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import type { Locale } from "@/lib/localization";

const labels: Record<string, string> = { Tous: "All", "Backend & API": "Backend & API", Web: "Web", Android: "Android", "Code public": "Public code" };
const summaries: Record<string, string> = { happiguest: "Invitations & access control", "sel-facturation": "Accounting & operations", "arkena-core": "Role-based access control", "monarque-connect": "Modular business platform", "brice-miaffo": "Bilingual portfolio & CMS", tervyn: "Offline-first Android demo" };

export function ProjectGalleryFallback({ locale = "fr", filtersOnly = false }: { locale?: Locale; filtersOnly?: boolean }) {
  const prefix = locale === "en" ? "/en/projects" : "/projets";
  if (filtersOnly) return <nav className="filters gallery-filters" aria-label={locale === "fr" ? "Filtrer les projets" : "Filter projects"}>{["Tous", "Backend & API", "Web", "Android", "Code public"].map((filter) => <Link className={filter === "Tous" ? "selected" : ""} href={filter === "Tous" ? prefix : `${prefix}?type=${encodeURIComponent(filter)}`} key={filter}>{locale === "en" ? labels[filter] : filter}</Link>)}</nav>;
  return <section className="listing-grid listing-grid-count-6" aria-label={locale === "fr" ? "Projets" : "Projects"}>{projects.map((project) => <Link href={`${prefix}/${project.slug}`} className="project-card" key={project.slug}><div className="listing-cover"><Image src={`/figma-assets/${project.cover}`} alt={locale === "fr" ? `Couverture ${project.title}` : `${project.title} cover`} width={620} height={372} /></div><div className="project-title"><h2>{project.title}</h2></div><p>{locale === "en" ? summaries[project.slug] : project.summary}</p><small>{locale === "en" ? "Documented case study" : project.cardStatus}</small></Link>)}</section>;
}
