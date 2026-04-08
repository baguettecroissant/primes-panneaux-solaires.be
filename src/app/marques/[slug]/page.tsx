import type { Metadata } from "next";
import Link from "next/link";
import { marques } from "@/data/marques";

export function generateStaticParams() {
  return marques.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const marque = marques.find((m) => m.slug === slug);
  if (!marque) return { title: "Marque non trouvée" };
  return {
    title: `${marque.name} — Avis, Prix et Specs Panneaux Solaires`,
    description: marque.description,
  };
}

export default async function MarquePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const marque = marques.find((m) => m.slug === slug);
  if (!marque) return <div className="container section"><h1>Marque non trouvée</h1></div>;

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span className="breadcrumb__sep">›</span>
          <Link href="/marques/">Marques</Link>
          <span className="breadcrumb__sep">›</span>
          <span>{marque.name}</span>
        </div>

        <span className="badge" style={{ background: marque.type === "onduleur" ? "#DBEAFE" : "#D1FAE5", color: marque.type === "onduleur" ? "#1D4ED8" : "#065F46" }}>
          {marque.type === "onduleur" ? "Onduleur" : "Panneau solaire"}
        </span>

        <h1 style={{ marginTop: 12 }}>{marque.name} — Panneaux solaires : avis, prix et caractéristiques</h1>

        <div className="article">
          <p style={{ fontSize: "1.0625rem" }}>{marque.description}</p>

          <div className="grid-2" style={{ margin: "32px 0" }}>
            <div className="card">
              <h3>📊 Caractéristiques</h3>
              <ul style={{ listStyle: "none", marginTop: 12 }}>
                <li style={{ padding: "8px 0", borderBottom: "1px solid var(--border-light)" }}>
                  <strong>Pays d&apos;origine :</strong> {marque.country}
                </li>
                <li style={{ padding: "8px 0", borderBottom: "1px solid var(--border-light)" }}>
                  <strong>Type :</strong> {marque.type === "onduleur" ? "Micro-onduleur" : "Panneau photovoltaïque"}
                </li>
                <li style={{ padding: "8px 0", borderBottom: "1px solid var(--border-light)" }}>
                  <strong>Efficacité :</strong> <span className="data-value">{marque.efficiency}</span>
                </li>
                <li style={{ padding: "8px 0" }}>
                  <strong>Garantie :</strong> {marque.warranty}
                </li>
              </ul>
            </div>
            <div className="card">
              <h3>💰 Prix indicatif</h3>
              <div className="data-value" style={{ fontSize: "1.5rem", margin: "16px 0" }}>{marque.priceRange}</div>
              <p style={{ color: "var(--text-light)", fontSize: "0.875rem" }}>
                Prix par unité, hors pose. Les tarifs varient selon le modèle et le distributeur. Demandez un devis personnalisé pour un prix exact.
              </p>
            </div>
          </div>

          <h2>Pourquoi choisir {marque.name} ?</h2>
          <p>
            {marque.name} est un acteur reconnu sur le marché belge du photovoltaïque. Originaire {marque.country === "Chine" ? "de Chine" : marque.country === "États-Unis" ? "des États-Unis" : marque.country === "Corée du Sud" ? "de Corée du Sud" : `de ${marque.country}`}, la marque est réputée pour {marque.type === "onduleur" ? "ses micro-onduleurs fiables et son système de monitoring avancé" : "la qualité et la durabilité de ses panneaux solaires"}.
          </p>
          <p>
            Avec une efficacité de {marque.efficiency} et une garantie de {marque.warranty}, {marque.name} offre un excellent rapport qualité-prix pour les installations résidentielles en Belgique.
          </p>

          <h2>Disponibilité en Belgique</h2>
          <p>
            Les produits {marque.name} sont disponibles auprès de la plupart des installateurs certifiés en Wallonie et à Bruxelles. Pour obtenir un devis incluant des panneaux {marque.name}, utilisez notre formulaire ci-dessous.
          </p>

          <div className="text-center mt-4">
            <Link href="/devis/" className="btn btn-accent btn-lg">✦ Devis gratuit avec {marque.name}</Link>
          </div>
        </div>

        <div style={{ marginTop: 48 }}>
          <h3>Autres marques</h3>
          <div className="grid-4" style={{ marginTop: 16 }}>
            {marques.filter((m) => m.slug !== slug).map((m) => (
              <Link key={m.slug} href={`/marques/${m.slug}/`} className="guide-card" style={{ padding: 16 }}>
                <div className="guide-card__title" style={{ fontSize: "0.9375rem" }}>{m.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{m.efficiency}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
