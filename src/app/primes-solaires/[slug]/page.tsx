import type { Metadata } from "next";
import Link from "next/link";
import communes from "@/data/communes-be.json";
import { getEnrichedCommune, getAllPostCodes } from "@/data/commune-enrichment";
import {
  getIntro,
  generateContexteLocal,
  generateSectionGRD,
  getSaviezVous,
  getFAQItems,
  getEstimationSolaire,
  getPostCodesLabel,
} from "@/data/commune-content";
import { getPrimeForRegion } from "@/data/primes";
import { guides } from "@/data/guides";
import FAQ, { FAQSchema } from "@/components/FAQ";
import LeadForm from "@/components/LeadForm";

interface CommuneRaw {
  slug: string;
  name: string;
  postCode: number;
  municipality: string;
  province: string;
  region: string;
  lat: number;
  lon: number;
}

export function generateStaticParams() {
  const seen = new Set<string>();
  return (communes as CommuneRaw[])
    .filter((c) => {
      if (seen.has(c.slug)) return false;
      seen.add(c.slug);
      return true;
    })
    .map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getEnrichedCommune(slug);
  if (!c) return { title: "Commune non trouvée" };
  const postLabel = getPostCodesLabel(slug);
  return {
    title: `Primes panneaux solaires à ${c.name} (${postLabel}) — Montants, aides et conditions 2026`,
    description: `Toutes les primes, subsides et aides pour installer des panneaux solaires à ${c.name} (${postLabel}). Certificats verts, TVA 6%, prêts avantageux. Production estimée : ${c.productionAnnuelle6kWc} kWh/an. ROI : ${c.roiAnnees} ans.`,
  };
}

export default async function CommunePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getEnrichedCommune(slug);
  if (!c) return <div className="container section"><h1>Commune non trouvée</h1></div>;

  const regionPrime = getPrimeForRegion(c.region);
  const regionLabel = c.region === "bruxelles" ? "Bruxelles" : c.region === "wallonie" ? "Wallonie" : "Flandre";
  const badgeClass = c.region === "bruxelles" ? "bxl" : c.region === "wallonie" ? "wal" : "vl";
  const postLabel = getPostCodesLabel(slug);
  const allPostCodes = getAllPostCodes(slug);

  const intro = getIntro(c);
  const contexte = generateContexteLocal(c);
  const sectionGRD = generateSectionGRD(c);
  const saviezVous = getSaviezVous(c);
  const faqItems = getFAQItems(c);
  const estimation = getEstimationSolaire(c);

  return (
    <>
      {/* ─── Hero / Intro ─── */}
      <section className="section">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Accueil</Link>
            <span className="breadcrumb__sep">›</span>
            <Link href={`/primes-${c.region}/`}>Primes {regionLabel}</Link>
            <span className="breadcrumb__sep">›</span>
            <span>{c.name}</span>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
            <span className={`badge badge--${badgeClass}`}>{regionLabel}</span>
            <span className="badge" style={{ background: "#F0FDF4", color: "#166534" }}>
              {c.typeHabitat === "urbain" ? "🏙️ Zone urbaine" : c.typeHabitat === "periurbain" ? "🏘️ Zone périurbaine" : "🌿 Zone rurale"}
            </span>
          </div>

          <h1 style={{ marginTop: 12 }}>
            Primes panneaux solaires à {c.name} ({postLabel}) — Montants et conditions 2026
          </h1>

          <p style={{ marginTop: 16, fontSize: "1.0625rem", color: "var(--text-light)", lineHeight: 1.8 }}>
            {intro}
          </p>

          {/* Chiffres clés */}
          <div className="grid-4" style={{ marginTop: 32 }}>
            <div className="card" style={{ textAlign: "center", padding: 16 }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Production 6 kWc</div>
              <div className="data-value" style={{ fontSize: "1.5rem", margin: "4px 0" }}>{estimation.production6kWc.toLocaleString("fr-BE")} kWh/an</div>
            </div>
            <div className="card" style={{ textAlign: "center", padding: 16 }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Économie annuelle</div>
              <div className="data-value" style={{ fontSize: "1.5rem", margin: "4px 0" }}>{estimation.economie.toLocaleString("fr-BE")}€</div>
            </div>
            <div className="card" style={{ textAlign: "center", padding: 16 }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Retour invest.</div>
              <div className="data-value" style={{ fontSize: "1.5rem", margin: "4px 0" }}>{estimation.roi} ans</div>
            </div>
            <div className="card" style={{ textAlign: "center", padding: 16 }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>CO₂ évité</div>
              <div className="data-value" style={{ fontSize: "1.5rem", margin: "4px 0" }}>{estimation.co2Evite} kg/an</div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-separator" />

      {/* ─── Contexte local & ensoleillement ─── */}
      <section className="section section--white">
        <div className="container">
          <h2>☀️ Potentiel solaire à {c.name}</h2>
          <div className="article" style={{ marginTop: 24 }}>
            {contexte.split("\n\n").map((p, i) => (
              <p key={i} style={{ marginBottom: 16, lineHeight: 1.8, color: "var(--text-light)" }}
                 dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text)">$1</strong>') }} />
            ))}
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: 16 }}>
            Source :{" "}
            <a href={c.pvgisUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--secondary)" }}>
              PVGIS — Commission européenne
            </a>
            {" "}| Coordonnées : {c.lat.toFixed(3)}°N, {c.lon.toFixed(3)}°E
          </p>
        </div>
      </section>

      {/* ─── Aides disponibles ─── */}
      <section className="section">
        <div className="container">
          <h2>💰 Aides financières disponibles à {c.name}</h2>
          <p style={{ color: "var(--text-light)", marginBottom: 32, lineHeight: 1.7 }}>
            {regionPrime?.primeDirecte} Voici le détail des mécanismes de soutien accessibles
            aux {c.population.toLocaleString("fr-BE")} habitants de {c.name}.
          </p>

          <div className="grid-2">
            {regionPrime?.mecanismes.map((m) => (
              <div key={m.nom} className={`card card--region-${badgeClass}`}>
                <div style={{ fontSize: "1.5rem", marginBottom: 8 }}>{m.icon}</div>
                <h3>{m.nom}</h3>
                <p style={{ color: "var(--text-light)", margin: "8px 0", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                  {m.description}
                </p>
                <div className="data-value" style={{ fontSize: "1.125rem" }}>{m.montant}</div>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 24, fontSize: "0.9375rem" }}>
            📌 Plus d&apos;informations sur le site officiel :{" "}
            <a href={c.regulateurUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--secondary)" }}>
              {c.region === "bruxelles" ? "BRUGEL" : "CWaPE"}
            </a>
            {" "}|{" "}
            <a href={regionPrime?.lienOfficiel} target="_blank" rel="noopener noreferrer" style={{ color: "var(--secondary)" }}>
              {c.region === "bruxelles" ? "Renolution.brussels" : "Énergie Wallonie"}
            </a>
          </p>
        </div>
      </section>

      <hr className="section-separator" />

      {/* ─── Votre GRD ─── */}
      <section className="section section--white">
        <div className="container">
          <h2>⚡ Votre gestionnaire de réseau à {c.name} : {c.grd.nom}</h2>
          <div className="article" style={{ marginTop: 24 }}>
            <p style={{ lineHeight: 1.8, color: "var(--text-light)" }}
               dangerouslySetInnerHTML={{ __html: sectionGRD.replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--text)">$1</strong>') }} />
          </div>
          <div style={{ marginTop: 24 }}>
            <a href={c.grd.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              🔗 Site officiel de {c.grd.nom}
            </a>
          </div>
        </div>
      </section>

      {/* ─── Conditions d'éligibilité ─── */}
      <section className="section">
        <div className="container">
          <h2>✅ Conditions d&apos;éligibilité à {c.name}</h2>
          <div className="checklist" style={{ marginTop: 24 }}>
            {regionPrime?.conditions.map((cond, i) => (
              <div key={i} className="checklist__item">
                <div className="checklist__icon">✓</div>
                <div className="checklist__text">{cond}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <a href={c.mairieUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              🏛️ Site de la commune de {c.municipality || c.name}
            </a>
          </div>
        </div>
      </section>

      <hr className="section-separator" />

      {/* ─── Le saviez-vous ? ─── */}
      <section className="section section--white">
        <div className="container">
          <h2>💡 Le saviez-vous ?</h2>
          <div className="article" style={{ marginTop: 24 }}>
            {saviezVous.split("\n\n").map((p, i) => (
              <div key={i} style={{
                padding: 20,
                background: i === 0 ? "var(--primary-light)" : "#F0F9FF",
                borderRadius: "var(--radius-md)",
                marginBottom: 16,
                borderLeft: `4px solid ${i === 0 ? "var(--primary)" : "var(--secondary)"}`,
              }}>
                <p style={{ lineHeight: 1.7, margin: 0, color: "var(--text)" }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Les étapes ─── */}
      <section className="section">
        <div className="container">
          <h2>📋 Les étapes pour installer des panneaux solaires à {c.name}</h2>
          <div className="timeline" style={{ marginTop: 32, maxWidth: 650 }}>
            {[
              { t: "Demande de devis", d: `Comparez les offres de 3 installateurs certifiés dans la zone ${allPostCodes[0] || c.postCode}. Utilisez notre formulaire pour recevoir des devis gratuits et sans engagement.` },
              { t: "Visite technique", d: `Un technicien se déplace à ${c.name} pour évaluer votre toiture : orientation, inclinaison, surface disponible, état de la charpente et raccordement électrique.` },
              { t: "Installation", d: `Pose des panneaux en 1 à 2 jours par un installateur ${c.region === "bruxelles" ? "agréé Bruxelles" : "certifié Rescert"}. Mise en service et test de production sur place.` },
              { t: `Raccordement ${c.grd.nom}`, d: `Demande de raccordement auprès de ${c.grd.nom}. Installation du compteur communicant bidirectionnel. Délai moyen : 4 à 8 semaines.` },
              { t: "Demande d'aides", d: `Introduction de votre dossier auprès de ${c.region === "bruxelles" ? "BRUGEL pour les certificats verts" : "la CWaPE pour les certificats verts et du Rénoprêt auprès de la SWCS si applicable"}.` },
            ].map((step, i) => (
              <div key={i} className="timeline__item">
                <div className="timeline__dot">{i + 1}</div>
                <div className="timeline__title">{step.t}</div>
                <div className="timeline__desc">{step.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-separator" />

      {/* ─── FAQ ─── */}
      <section className="section section--white">
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 className="text-center mb-4">Questions fréquentes — Panneaux solaires à {c.name}</h2>
          <FAQ items={faqItems} />
          <FAQSchema items={faqItems} />
        </div>
      </section>

      {/* ─── Communes voisines (maillage interne) ─── */}
      <section className="section">
        <div className="container">
          <h2>🗺️ Communes voisines de {c.name}</h2>
          <p style={{ color: "var(--text-light)", marginBottom: 24 }}>
            Découvrez les primes et aides solaires disponibles dans les communes proches de {c.name} :
          </p>
          <div className="grid-3">
            {c.communesVoisines.slice(0, 6).map((v) => (
              <Link
                key={v.slug}
                href={`/primes-solaires/${v.slug}/`}
                className="card"
                style={{ textDecoration: "none", color: "var(--text)", display: "block" }}
              >
                <h4 style={{ margin: 0 }}>{v.name}</h4>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    {v.postCode}
                  </span>
                  <span style={{ fontSize: "0.8125rem", color: "var(--secondary)" }}>
                    à {v.distanceKm} km →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-separator" />

      {/* ─── Guides connexes (maillage interne) ─── */}
      <section className="section section--white">
        <div className="container">
          <h2>📚 Guides utiles pour votre projet à {c.name}</h2>
          <p style={{ color: "var(--text-light)", marginBottom: 24 }}>
            Approfondissez vos connaissances avant de vous lancer :
          </p>
          <div className="grid-2">
            {guides
              .filter(g => !g.region || g.region === c.region)
              .slice(0, 4)
              .map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}/`}
                  className="guide-card"
                >
                  <div className="guide-card__icon">{g.icon}</div>
                  <div className="guide-card__title">{g.title}</div>
                  <div className="guide-card__excerpt">{g.excerpt.slice(0, 100)}…</div>
                </Link>
              ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <Link href="/guides/" style={{ color: "var(--secondary)", fontWeight: 600 }}>
              Voir tous les guides →
            </Link>
          </div>
        </div>
      </section>

      <hr className="section-separator" />

      {/* ─── Formulaire de devis intégré ─── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Demandez vos devis gratuits à {c.name}</h2>
            <p className="section-subtitle">
              Recevez jusqu&apos;à 3 devis d&apos;installateurs certifiés
              dans la zone {postLabel}. Comparaison rapide, sans engagement.
            </p>
          </div>
          <LeadForm commune={c.name} postCode={c.postCode} />
        </div>
      </section>

      {/* ─── Schema.org LocalBusiness ─── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Primes panneaux solaires à ${c.name}`,
            description: `Guide des primes et aides pour l'installation de panneaux solaires à ${c.name} (${postLabel}), ${regionLabel}.`,
            url: `https://primes-panneaux-solaires.be/primes-solaires/${slug}/`,
            about: {
              "@type": "GovernmentService",
              name: `Aides photovoltaïques ${regionLabel}`,
              serviceArea: {
                "@type": "AdministrativeArea",
                name: c.name,
                containedInPlace: {
                  "@type": "AdministrativeArea",
                  name: c.province || "Région de Bruxelles-Capitale",
                },
              },
            },
          }),
        }}
      />
    </>
  );
}
