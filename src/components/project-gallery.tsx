"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/projects";
import { Arrow } from "@/components/site";

const filters = ["Tous", "Backend & API", "Web", "Android", "Code public"];

export function ProjectGallery({ filtersOnly = false, cardsOnly = false }: { filtersOnly?: boolean; cardsOnly?: boolean }) {
  const search = useSearchParams();
  const type = search.get("type") || "Tous";
  const visible = projects.filter((p) => type === "Tous" || p.categories.includes(type));
  const filterBar = <div className="filters gallery-filters" aria-label="Filtrer les projets">{filters.map((filter) => <Link className={type === filter ? "selected" : ""} aria-current={type === filter ? "page" : undefined} href={filter === "Tous" ? "/projets" : `/projets?type=${encodeURIComponent(filter)}`} key={filter}>{filter}</Link>)}</div>;
  if (filtersOnly) return filterBar;
  const cards = <section className={`listing-grid listing-grid-count-${visible.length}`} aria-label="Projets">{visible.map((p) => <Link href={`/projets/${p.slug}`} className="project-card" key={p.slug}><div className="listing-cover"><Image src={`/figma-assets/${p.cover}`} alt={`Couverture ${p.title}`} width={620} height={372} /></div><div className="project-title"><h2>{p.title}</h2><b aria-hidden="true"><Arrow /></b></div><p>{p.summary}</p><small>{p.cardStatus}</small></Link>)}</section>;
  if (cardsOnly) return cards;
  return <>{filterBar}{cards}</>;
}
