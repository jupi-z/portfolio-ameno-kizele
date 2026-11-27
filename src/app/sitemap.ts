import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const siteUrl = "https://ameno.monarquegrp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ["/", 1, "monthly"],
    ["/projets", 0.9, "monthly"],
    ["/parcours", 0.8, "yearly"],
    ["/methode", 0.8, "yearly"],
    ["/contact", 0.7, "yearly"],
  ] as const;

  return [
    ...pages.map(([path, priority, changeFrequency]) => ({
      url: `${siteUrl}${path}`,
      priority,
      changeFrequency,
    })),
    ...projects.map(({ slug }) => ({
      url: `${siteUrl}/projets/${slug}`,
      priority: 0.7,
      changeFrequency: "yearly" as const,
    })),
  ];
}
