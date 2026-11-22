"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { projects } from "@/data/projects";

const filters = ["Tous", "Backend & API", "Web", "Android", "Code public"];

export function ProjectGallery() {
  const search = useSearchParams();
  const type = search.get("type") || "Tous";
  const visible = projects.filter((p) => type === "Tous" || p.categories.includes(type));
  return <><div className="filters gallery-filters">{filters.map((filter) => <Link className={type === filter ? "selected" : ""} href={filter === "Tous" ? "/projets" : `/projets?type=${encodeURIComponent(filter)}`} key={filter}>{filter}</Link>)}</div><section className="listing-grid">{visible.map((p) => <Link href={`/projets/${p.slug}`} className="project-card" key={p.slug}><div className="listing-cover"><Image src={`/figma-assets/${p.cover}`} alt={`Couverture ${p.title}`} width={600} height={360} /></div><span className="project-eyebrow">{p.eyebrow}</span><div className="project-title"><h2>{p.title}</h2><b>↗</b></div><p>{p.summary}</p><small>{p.cardStatus}</small></Link>)}</section></>;
}
