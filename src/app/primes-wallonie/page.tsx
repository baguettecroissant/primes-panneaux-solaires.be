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
            En 2026, la Wallonie ne propose plus de prime directe ni de certificats verts pour les nouvelles installations de panneaux
            photovoltaïques résidentielles. Depuis le <strong>1er janvier 2024</strong>, le système du compteur réversible
            a été supprimé et les certificats verts ne sont plus octroyés aux nouvelles petites installations (≤ 10 kWc).
            La rentabilité repose désormais entièrement sur l&apos;<strong>autoconsommation</strong> et le <strong>Rénoprêt à taux 0%</strong>.
          </p>
          <div className="card card--region-wal" style={{ background: '#FEF2F2', border: '2px solid #FECACA', marginBottom: 24 }}>
            <p style={{ fontWeight: 600, color: '#991B1B', marginBottom: 4 }}>⚠️ Information importante</p>
            <p style={{ margin: 0, color: '#7F1D1D' }}>
              Les certificats verts wallons et la réduction du tarif prosumer <strong>ne s&apos;appliquent plus aux installations mises
              en service après le 31 décembre 2023</strong>. Si vous possédez déjà des panneaux (avant cette date), vos droits acquis sont maintenus.
            </p>
          </div>

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

          <h2>Le Rénoprêt : votre levier principal</h2>
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

          <h2>Qu&apos;est-il arrivé aux certificats verts wallons ?</h2>
          <p>
            Le système de certificats verts pour les petites installations résidentielles (≤ 10 kWc) a été
            progressivement démantélé. Depuis le <strong>1er janvier 2024</strong> (source : CWaPE / energie.wallonie.be) :
          </p>
          <ul>
            <li>Les nouvelles installations ne bénéficient <strong>plus de certificats verts</strong></li>
            <li>Le <strong>compteur qui tourne à l&apos;envers</strong> est supprimé pour les nouvelles installations</li>
            <li>Le <strong>tarif prosumer</strong> et la prime au compteur double flux ont pris fin le 31/12/2023</li>
            <li>Les installations <strong>antérieures à fin 2023</strong> conservent leurs droits acquis</li>
          </ul>
          <p>
            La rentabilité repose donc entièrement sur l&apos;<strong>autoconsommation</strong>
            (chaque kWh autoconsommé = ~0,35€ évité) et le tarif d&apos;injection pour le surplus
            injecté (~3–6 ct€/kWh selon fournisseur).
          </p>

          <h2>La TVA à 6% pour les logements de plus de 10 ans</h2>
          <p>
            Si votre logement a plus de 10 ans, vous bénéficiez d&apos;un taux de TVA réduit à 6% au
            lieu de 21% sur l&apos;installation de panneaux solaires. Sur une installation de 8 000€ HTVA,
            cela représente une économie d&apos;environ 1 200€.
          </p>

          <h2>Rentabilité : l&apos;autoconsommation comme clé de voûte</h2>
          <p>
            Sans certificats verts, la rentabilité des panneaux solaires en Wallonie repose sur deux leviers :
          </p>
          <ul>
            <li><strong>Autoconsommation</strong> : utiliser sa propre production (0h–16h) pour alimenter ses appareils. Valeur : ~0,35€/kWh évités.</li>
            <li><strong>Tarif d&apos;injection</strong> : valoriser le surplus injecté en prénégociant un contrat avec votre fournisseur (~3–6 ct€/kWh).</li>
          </ul>
          <p>
            Pour une installation bien dimensionnée de 5–6 kWc avec 60% d&apos;autoconsommation, les économies annuelles estimées
            se situent entre <strong>800€ et 1 200€/an</strong>, soit un retour sur investissement de
            <strong>8 à 10 ans</strong>. La TVA à 6% réduit le coût initial d&apos;environ 1 200€.
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
