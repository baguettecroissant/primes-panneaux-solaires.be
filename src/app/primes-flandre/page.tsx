import type { Metadata } from "next";
import Link from "next/link";
import { primesByRegion } from "@/data/primes";

export const metadata: Metadata = {
  title: "Primes Panneaux Solaires Flandre 2026 — Aides et Subsides",
  description: "Guide des aides en Flandre pour vos panneaux solaires : MijnVerbouwLening, tarif d'injection, prime de compensation. Conditions 2026.",
};

export default function PrimesFlandrePage() {
  const flandre = primesByRegion.find((r) => r.region === "flandre")!;

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span className="breadcrumb__sep">›</span>
          <span>Primes Flandre</span>
        </div>

        <span className="badge badge--vl">Flandre</span>
        <h1 style={{ marginTop: 12 }}>Primes panneaux solaires Flandre 2026 : aides et subsides</h1>

        <div className="article">
          <p>La Région flamande a supprimé la prime directe Fluvius. Le soutien au photovoltaïque se concentre désormais sur le tarif d&apos;injection, le prêt MijnVerbouwLening et la TVA réduite à 6%.</p>

          <h2>MijnVerbouwLening</h2>
          <p>La Région flamande propose le prêt MijnVerbouwLening pour financer des projets de rénovation énergétique, y compris les panneaux solaires. Montant maximum : 60 000€, sous conditions de revenus.</p>

          <h2>Tarif d&apos;injection</h2>
          <p>Le système de compteur inversé a été remplacé par un tarif d&apos;injection : vous recevez une rémunération de 3 à 5 centimes par kWh d&apos;électricité excédentaire injectée sur le réseau.</p>

          <h2>Prime de compensation</h2>
          <p>Pour les installations antérieures à fin 2023, une prime de compensation est encore accessible jusqu&apos;à fin 2025 pour garantir un certain rendement sur l&apos;investissement.</p>

          <div className="grid-2" style={{ margin: "32px 0" }}>
            {flandre.mecanismes.map((m) => (
              <div key={m.nom} className="card card--region-vl">
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{m.icon}</div>
                <h3>{m.nom}</h3>
                <p style={{ color: "var(--text-light)", margin: "8px 0" }}>{m.description}</p>
                <div className="data-value">{m.montant}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link href="/devis/" className="btn btn-accent btn-lg">✦ Demander mes devis gratuits</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
