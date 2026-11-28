"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/projects";
import { Arrow } from "@/components/site";
import type { Locale } from "@/lib/localization";

const filters = ["Tous", "Backend & API", "Web", "Android", "Code public"];
const enLabels: Record<string, string> = { Tous: "All", "Backend & API": "Backend & API", Web: "Web", Android: "Android", "Code public": "Public code" };
const summaries: Record<string, string> = { happiguest: "Invitations & access control", "sel-facturation": "Accounting & operations", "arkena-core": "Role-based access control", "monarque-connect": "Modular business platform", "brice-miaffo": "Bilingual portfolio & CMS", tervyn: "Offline-first Android demo" };

export function ProjectGallery({ filtersOnly = false, cardsOnly = false, locale = "fr" }: { filtersOnly?: boolean; cardsOnly?: boolean; locale?: Locale }) {
  const search = useSearchParams();
  const rawType = search.get("type") || "Tous";
  const type = filters.includes(rawType) ? rawType : "Tous";
  const prefix = locale === "en" ? "/en/projects" : "/projets";
  const visible = projects.filter((p) => type === "Tous" || p.categories.includes(type));
  const filterBar = <div className="filters gallery-filters" aria-label={locale === "fr" ? "Filtrer les projets" : "Filter projects"}>{filters.map((filter) => <Link className={type === filter ? "selected" : ""} aria-current={type === filter ? "page" : undefined} href={filter === "Tous" ? prefix : `${prefix}?type=${encodeURIComponent(filter)}`} key={filter}>{locale === "en" ? enLabels[filter] : filter}</Link>)}</div>;
  if (filtersOnly) return filterBar;
  const cards = <section className={`listing-grid listing-grid-count-${visible.length}`} aria-label={locale === "fr" ? "Projets" : "Projects"}>{visible.map((p) => <Link href={`${prefix}/${p.slug}`} className="project-card" key={p.slug}><div className="listing-cover"><Image src={`/figma-assets/${p.cover}`} alt={locale === "fr" ? `Couverture ${p.title}` : `${p.title} cover`} width={620} height={372} /></div><div className="project-title"><h2>{p.title}</h2><b aria-hidden="true"><Arrow /></b></div><p>{locale === "en" ? summaries[p.slug] : p.summary}</p><small>{locale === "en" ? "Documented case study" : p.cardStatus}</small></Link>)}</section>;
  if (cardsOnly) return cards;
  return <>{filterBar}{cards}</>;
}
