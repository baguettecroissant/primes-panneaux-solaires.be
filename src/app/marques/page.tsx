import type { Metadata } from "next";
import Link from "next/link";
import { marques } from "@/data/marques";

export const metadata: Metadata = {
  title: "Marques de Panneaux Solaires — Comparatif 2026",
  description: "Comparatif des meilleures marques de panneaux solaires : SunPower, LG Solar, Trina Solar, Jinko, Canadian Solar, REC, LONGi et Enphase.",
};

export default function MarquesIndexPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span className="breadcrumb__sep">›</span>
          <span>Marques</span>
        </div>
        <h1>Comparatif des marques de panneaux solaires</h1>
        <p style={{ color: "var(--text-light)", marginTop: 8, marginBottom: 40, maxWidth: 640 }}>
          Découvrez les meilleures marques de panneaux solaires et d&apos;onduleurs disponibles en Belgique.
        </p>
        <div className="grid-2">
          {marques.map((m) => (
            <Link key={m.slug} href={`/marques/${m.slug}/`} className="guide-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div className="guide-card__title">{m.name}</div>
                <span className="badge" style={{ background: m.type === "onduleur" ? "#DBEAFE" : "#D1FAE5", color: m.type === "onduleur" ? "#1D4ED8" : "#065F46", fontSize: "0.6875rem" }}>
                  {m.type === "onduleur" ? "Onduleur" : "Panneau"}
                </span>
              </div>
              <div className="guide-card__excerpt">{m.description}</div>
              <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: "0.8125rem" }}>
                <span><strong>Efficacité :</strong> {m.efficiency}</span>
                <span><strong>Garantie :</strong> {m.warranty.split("+")[0]}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
