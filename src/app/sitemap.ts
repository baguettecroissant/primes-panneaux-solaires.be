import type { MetadataRoute } from "next";
import communes from "@/data/communes-be.json";
import { guides } from "@/data/guides";
import { marques } from "@/data/marques";

export const dynamic = "force-static";

const BASE = "https://primes-panneaux-solaires.be";

export default function sitemap(): MetadataRoute.Sitemap {
  const communePages = (communes as { slug: string }[]).map((c) => ({
    url: `${BASE}/primes-solaires/${c.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const guidePages = guides.map((g) => ({
    url: `${BASE}/guides/${g.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const marquePages = marques.map((m) => ({
    url: `${BASE}/marques/${m.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: `${BASE}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/devis/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/primes-wallonie/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/primes-bruxelles/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/primes-flandre/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/rentabilite/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/guides/`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/marques/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/faq/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...communePages,
    ...guidePages,
    ...marquePages,
  ];
}
