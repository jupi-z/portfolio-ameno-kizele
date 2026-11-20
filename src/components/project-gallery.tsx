"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProjectArt } from "@/components/site";
import { projects } from "@/data/projects";

const filters = ["Tous", "Backend & API", "Web", "Android", "Code public"];

export function ProjectGallery() {
  const search = useSearchParams();
  const type = search.get("type") || "Tous";
  const visible = projects.filter((p) => type === "Tous" || (type === "Backend & API" && /backend|api/i.test(`${p.tech} ${p.eyebrow}`)) || (type === "Web" && /react|web/i.test(p.tech)) || (type === "Android" && /android|kotlin/i.test(p.tech)) || (type === "Code public" && /code public/i.test(p.eyebrow)));
  return <><div className="filters gallery-filters">{filters.map((filter) => <Link className={type === filter ? "selected" : ""} href={filter === "Tous" ? "/projets" : `/projets?type=${encodeURIComponent(filter)}`} key={filter}>{filter}</Link>)}</div><section className="listing-grid">{visible.map((p) => { const i = projects.indexOf(p); return <Link href={`/projets/${p.slug}`} className="project-card" key={p.slug}><ProjectArt color={p.color} mark={p.mark} index={i} /><span className="project-eyebrow">{p.eyebrow}</span><div className="project-title"><h2>{p.title}</h2><b>↗</b></div><p>{p.summary}</p><small>{p.status}</small></Link>; })}</section></>;
}
