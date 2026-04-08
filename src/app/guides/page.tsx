import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guides Panneaux Solaires Belgique — Tout Savoir",
  description: "Guides pratiques sur les panneaux solaires en Belgique : primes, certificats verts, batterie domestique, autoconsommation, démarches administratives.",
};

export default function GuidesIndexPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span className="breadcrumb__sep">›</span>
          <span>Guides</span>
        </div>

        <h1>Guides Panneaux Solaires Belgique</h1>
        <p style={{ color: "var(--text-light)", marginTop: 8, marginBottom: 40, maxWidth: 640 }}>
          Tout ce que vous devez savoir avant d&apos;installer des panneaux solaires en Belgique :
          primes, certificats verts, rentabilité, démarches et bien plus.
        </p>

        <div className="grid-2">
          {guides.map((g) => (
            <Link key={g.slug} href={`/guides/${g.slug}/`} className="guide-card">
              <div className="guide-card__icon">{g.icon}</div>
              {g.region && (
                <span className={`badge badge--${g.region === "wallonie" ? "wal" : g.region === "bruxelles" ? "bxl" : "vl"}`} style={{ marginBottom: 8 }}>
                  {g.region === "wallonie" ? "Wallonie" : g.region === "bruxelles" ? "Bruxelles" : "Flandre"}
                </span>
              )}
              <div className="guide-card__title">{g.title}</div>
              <div className="guide-card__excerpt">{g.excerpt}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
