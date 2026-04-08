import type { Metadata } from "next";
import Link from "next/link";
import { primesByRegion } from "@/data/primes";
import communes from "@/data/communes-be.json";

export const metadata: Metadata = {
  title: "Primes Panneaux Solaires Wallonie 2026 — Montants, Conditions et Démarches",
  description:
    "Guide complet des aides en Wallonie pour l'installation de panneaux solaires : Rénoprêt à taux 0%, certificats verts, TVA à 6%. Conditions et démarches détaillées.",
};

export default function PrimesWalloniePage() {
  const wallonie = primesByRegion.find((r) => r.region === "wallonie")!;
  const communesWal = (communes as { slug: string; name: string; postCode: number; region: string }[])
    .filter((c) => c.region === "wallonie")
    .slice(0, 20);

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span className="breadcrumb__sep">›</span>
          <span>Primes Wallonie</span>
        </div>

        <span className="badge badge--wal">Wallonie</span>
        <h1 style={{ marginTop: 12 }}>
          Primes panneaux solaires Wallonie 2026 : montants, conditions et démarches
        </h1>

        <div className="article">
          <p>
            En 2026, la Région Wallonne ne propose plus de prime directe à l&apos;installation de panneaux
            photovoltaïques. Cependant, plusieurs mécanismes de soutien restent très avantageux pour les
            propriétaires souhaitant investir dans le solaire.
          </p>

          <h2>Les aides disponibles en Wallonie</h2>

          <div className="grid-2" style={{ marginBottom: 32 }}>
            {wallonie.mecanismes.map((m) => (
              <div key={m.nom} className="card card--region-wal">
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{m.icon}</div>
                <h3>{m.nom}</h3>
                <p style={{ color: "var(--text-light)", margin: "8px 0" }}>{m.description}</p>
                <div className="data-value">{m.montant}</div>
              </div>
            ))}
          </div>

          <h2>Le Rénoprêt : un prêt à taux zéro</h2>
          <p>
            Le Rénoprêt est proposé par la Société Wallonne du Crédit Social (SWCS). Il permet de financer
            vos travaux de rénovation énergétique, y compris l&apos;installation de panneaux solaires, avec un
            prêt à taux 0%. Le montant maximum est de 60 000€ avec une durée de remboursement allant
            jusqu&apos;à 30 ans.
          </p>
          <p>
            Pour en bénéficier, vous devez être propriétaire d&apos;un logement situé en Wallonie et
            respecter certains plafonds de revenus. L&apos;installation doit être réalisée par un
            professionnel agréé.
          </p>

          <h2>Les certificats verts wallons</h2>
          <p>
            Le système de certificats verts wallon attribue 1 certificat vert (CV) pour chaque MWh
            d&apos;électricité verte produite par votre installation. La durée d&apos;octroi est de 10 ans
            à partir de la mise en service.
          </p>
          <p>
            La valeur d&apos;un certificat vert wallon est d&apos;environ 65€. Pour une installation
            résidentielle typique de 6 kWc, cela représente environ 450€ par an de revenus
            complémentaires.
          </p>

          <h2>La TVA à 6% pour les logements de plus de 10 ans</h2>
          <p>
            Si votre logement a plus de 10 ans, vous bénéficiez d&apos;un taux de TVA réduit à 6% au
            lieu de 21% sur l&apos;installation de panneaux solaires. Sur une installation de 8 000€ HTVA,
            cela représente une économie d&apos;environ 1 200€.
          </p>

          <h2>Le tarif prosumer</h2>
          <p>
            Depuis 2020, les propriétaires de panneaux solaires en Wallonie doivent payer le tarif
            prosumer. Ce tarif est calculé sur base de la puissance de votre installation et vise à
            couvrir les frais d&apos;utilisation du réseau de distribution.
          </p>
          <p>
            Pour une installation de 6 kWc, le tarif prosumer s&apos;élève à environ 350-500€ par an.
            Ce coût est partiellement compensé par les revenus des certificats verts.
          </p>

          <h2>Conditions d&apos;éligibilité</h2>
          <div className="checklist" style={{ marginTop: 16, marginBottom: 32 }}>
            {wallonie.conditions.map((c, i) => (
              <div key={i} className="checklist__item">
                <div className="checklist__icon">✓</div>
                <div className="checklist__text">{c}</div>
              </div>
            ))}
          </div>

          <h2>Communes wallonnes populaires</h2>
          <div className="grid-4" style={{ marginTop: 16 }}>
            {communesWal.map((c) => (
              <Link
                key={c.slug}
                href={`/primes-solaires/${c.slug}/`}
                className="guide-card"
                style={{ padding: 12 }}
              >
                <div className="guide-card__title" style={{ fontSize: "0.875rem" }}>
                  {c.name}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {c.postCode}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href="/devis/" className="btn btn-accent btn-lg">
              ✦ Demander mes devis gratuits en Wallonie
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
