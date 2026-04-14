import type { Metadata } from "next";
import Link from "next/link";
import { primesByRegion } from "@/data/primes";
import communes from "@/data/communes-be.json";

export const metadata: Metadata = {
  title: "Primes Panneaux Solaires Bruxelles 2026 — Certificats Verts BRUGEL & Aides",
  description: "Guide complet des aides à Bruxelles pour vos panneaux solaires : certificats verts BRUGEL (2,055 CV/MWh), prêt Ecoreno, RESCert obligatoire. Conditions et montants 2026.",
};

export default function PrimesBruxellesPage() {
  const bruxelles = primesByRegion.find((r) => r.region === "bruxelles")!;
  const communesBxl = (communes as { slug: string; name: string; postCode: number; region: string }[]).filter((c) => c.region === "bruxelles").slice(0, 20);

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span className="breadcrumb__sep">›</span>
          <span>Primes Bruxelles</span>
        </div>

        <span className="badge badge--bxl">Bruxelles</span>
        <h1 style={{ marginTop: 12 }}>Primes panneaux solaires Bruxelles 2026 : guide complet</h1>

        <div className="article">
          <p>La Région de Bruxelles-Capitale maintient en 2026 le système de certificats verts BRUGEL, le plus avantageux de Belgique. Contrairement à la Wallonie qui a supprimé ses CV pour les nouvelles installations depuis 2024, Bruxelles préserve ce mécanisme tout en l&apos;adaptant régulièrement. Attention aux nouvelles règles en vigueur depuis 2026.</p>

          <div className="card card--region-bxl" style={{ background: '#F5F3FF', border: '2px solid #DDD6FE', marginBottom: 24 }}>
            <p style={{ fontWeight: 600, color: '#5B21B6', marginBottom: 4 }}>ℹ️ Nouveautés 2026 à Bruxelles</p>
            <ul style={{ margin: 0, color: '#4C1D95', paddingLeft: 20 }}>
              <li><strong>Depuis le 1er janvier 2026</strong> : certification <strong>RESCert PV</strong> obligatoire pour l&apos;installateur (toutes nouvelles installations)</li>
              <li><strong>Depuis le 1er avril 2026</strong> : taux maintenu à <strong>2,055 CV/MWh</strong> pour les installations ≤ 5 kWc (résidentiel typique)</li>
              <li>Installations &gt; 100 kWc : aucun certificat vert octroyé</li>
            </ul>
          </div>

          <h2>Les certificats verts BRUGEL : le système actif en 2026</h2>
          <p>Le système bruxellois de certificats verts est géré par BRUGEL, le régulateur de l&apos;énergie. Pour chaque MWh d&apos;électricité verte produite, vous recevez des certificats verts que les fournisseurs d&apos;énergie sont obligés de racheter.</p>
          <p>
            Depuis le <strong>1er avril 2026</strong>, le taux d&apos;octroi pour les <strong>installations résidentielles ≤ 5 kWc</strong> est de
            <strong> 2,055 CV/MWh</strong> — <em>inchangé par rapport à la période précédente</em>. Pour une installation
            de 5 kWc produisant ~4 300 kWh/an (4,3 MWh), cela représente environ 8 à 9 CV par an,
            soit <strong>700€ à 1 000€ de revenus annuels</strong> sur 10 ans (prix CV ~85–95€).
          </p>

          <h2>Le prêt Ecoreno</h2>
          <p>Le prêt vert Ecoreno permet de financer vos travaux d&apos;efficacité énergétique, y compris l&apos;installation de panneaux solaires. Le montant maximum est de 25 000€ à un taux avantageux.</p>

          <h2>Primes communales</h2>
          <p>Certaines communes bruxelloises offrent des primes locales supplémentaires pour l&apos;installation de panneaux solaires. Il est recommandé de contacter directement votre administration communale pour connaître les aides disponibles.</p>

          <h2>Compensation réseau</h2>
          <p>Bruxelles bénéficie encore du mécanisme de compteur réversible (compensation annuelle). L&apos;électricité que vous injectez sur le réseau est déduite de votre consommation sur une base annuelle, ce qui maximise vos économies.</p>

          <div className="grid-2" style={{ margin: "32px 0" }}>
            {bruxelles.mecanismes.map((m) => (
              <div key={m.nom} className="card card--region-bxl">
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{m.icon}</div>
                <h3>{m.nom}</h3>
                <p style={{ color: "var(--text-light)", margin: "8px 0" }}>{m.description}</p>
                <div className="data-value">{m.montant}</div>
              </div>
            ))}
          </div>

          <h2>Communes bruxelloises</h2>
          <div className="grid-4" style={{ marginTop: 16 }}>
            {communesBxl.map((c) => (
              <Link key={c.slug} href={`/primes-solaires/${c.slug}/`} className="guide-card" style={{ padding: 12 }}>
                <div className="guide-card__title" style={{ fontSize: "0.875rem" }}>{c.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>{c.postCode}</div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href="/devis/" className="btn btn-accent btn-lg">✦ Demander mes devis gratuits à Bruxelles</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
