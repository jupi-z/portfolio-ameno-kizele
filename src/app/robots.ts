import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ameno.monarquegrp.com/sitemap.xml",
    host: "https://ameno.monarquegrp.com",
  };
}
