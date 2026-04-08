import type { Metadata } from "next";
import Link from "next/link";
import { primesByRegion } from "@/data/primes";
import communes from "@/data/communes-be.json";

export const metadata: Metadata = {
  title: "Primes Panneaux Solaires Bruxelles 2026 — Guide Complet",
  description: "Guide complet des aides à Bruxelles pour vos panneaux solaires : certificats verts Brugel, prêt Ecoreno, primes communales. Conditions et montants 2026.",
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
          <p>La Région de Bruxelles-Capitale offre le système de certificats verts le plus avantageux de Belgique. Bien qu&apos;il n&apos;y ait pas de prime directe, le mécanisme de certificats verts Brugel permet un retour sur investissement excellent.</p>

          <h2>Les certificats verts Brugel</h2>
          <p>Le système bruxellois de certificats verts est géré par BRUGEL, le régulateur du marché de l&apos;énergie. Pour chaque MWh d&apos;électricité verte produite, vous recevez des certificats verts que les fournisseurs d&apos;énergie sont obligés de racheter.</p>
          <p>Le facteur de multiplication varie selon la puissance de votre installation, rendant le système particulièrement avantageux pour les installations résidentielles de petite à moyenne taille. Pour une installation de 6 kWc, les revenus annuels se situent entre 800€ et 1 400€.</p>

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
