import HeroHome from "@/components/HeroHome";
import CommuneSearch from "@/components/CommuneSearch";
import LeadForm from "@/components/LeadForm";
import Link from "next/link";
import { guides } from "@/data/guides";
import { primesByRegion } from "@/data/primes";

export default function Home() {
  return (
    <>
      <HeroHome />

      {/* Search Section */}
      <section className="section section--white">
        <div className="container">
          <h2 className="section-title">Trouvez les primes dans votre commune</h2>
          <p className="section-subtitle">
            Entrez votre code postal ou le nom de votre commune pour découvrir
            les aides disponibles dans votre zone.
          </p>
          <CommuneSearch />
        </div>
      </section>

      <hr className="section-separator" />

      {/* Region Cards */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Aides par région</h2>
          <p className="section-subtitle">
            Chaque région belge offre ses propres mécanismes de soutien au
            photovoltaïque. Comparez les avantages.
          </p>
          <div className="grid-3">
            {primesByRegion.map((r) => (
              <div
                key={r.region}
                className={`card card--region-${r.region === "wallonie" ? "wal" : r.region === "bruxelles" ? "bxl" : "vl"}`}
              >
                <span
                  className={`badge badge--${r.region === "wallonie" ? "wal" : r.region === "bruxelles" ? "bxl" : "vl"}`}
                >
                  {r.label}
                </span>
                <h3 style={{ margin: "16px 0 8px" }}>Primes {r.label}</h3>
                <p style={{ color: "var(--text-light)", fontSize: "0.9375rem", marginBottom: 16 }}>
                  {r.primeDirecte.slice(0, 120)}...
                </p>
                <ul style={{ marginBottom: 16 }}>
                  {r.mecanismes.slice(0, 3).map((m) => (
                    <li
                      key={m.nom}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 0",
                        fontSize: "0.9375rem",
                      }}
                    >
                      <span>{m.icon}</span>
                      <span>
                        <strong>{m.nom}</strong> — <span className="data-value">{m.montant}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/primes-${r.region}/`}
                  className="btn btn-outline btn-sm btn-full"
                >
                  Voir le détail →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-separator" />

      {/* Region Comparison Table */}
      <section className="section section--white">
        <div className="container">
          <h2 className="section-title">Comparatif régional</h2>
          <p className="section-subtitle">
            Wallonie vs Bruxelles vs Flandre : les chiffres clés pour une installation de 6 kWc.
          </p>
          <div style={{ overflowX: "auto" }}>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>🔴 Wallonie</th>
                  <th>🟣 Bruxelles</th>
                  <th>🟡 Flandre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Prime directe</strong></td>
                  <td>Aucune</td>
                  <td>Aucune</td>
                  <td>Aucune</td>
                </tr>
                <tr>
                  <td><strong>Certificats verts</strong></td>
                  <td>Non (nouvelles inst. 2024+)</td>
                  <td className="data-value">~810€/an (5 kWc)</td>
                  <td>Non</td>
                </tr>
                <tr>
                  <td><strong>Prêt avantageux</strong></td>
                  <td>Rénoprêt (0%)</td>
                  <td>Ecoreno</td>
                  <td>MijnVerbouwLening</td>
                </tr>
                <tr>
                  <td><strong>TVA réduite (6%)</strong></td>
                  <td>Oui (&gt;10 ans)</td>
                  <td>Oui (&gt;10 ans)</td>
                  <td>Oui (&gt;10 ans)</td>
                </tr>
                <tr>
                  <td><strong>Compensation réseau</strong></td>
                  <td>Autoconsommation + tarif injection</td>
                  <td>Compensation annuelle</td>
                  <td>Tarif d&apos;injection</td>
                </tr>
                <tr>
                  <td><strong>ROI moyen</strong></td>
                  <td className="data-value">6-8 ans</td>
                  <td className="data-value">5-7 ans</td>
                  <td className="data-value">7-9 ans</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <hr className="section-separator" />

      {/* Trust Badges */}
      <section className="section">
        <div className="container">
          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-badge__icon">🆓</div>
              <div className="trust-badge__text">100% gratuit</div>
            </div>
            <div className="trust-badge">
              <div className="trust-badge__icon">📋</div>
              <div className="trust-badge__text">Sans engagement</div>
            </div>
            <div className="trust-badge">
              <div className="trust-badge__icon">🏆</div>
              <div className="trust-badge__text">Installateurs certifiés</div>
            </div>
            <div className="trust-badge">
              <div className="trust-badge__icon">⚡</div>
              <div className="trust-badge__text">Réponse en 48h</div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="section section--white">
        <div className="container">
          <h2 className="section-title">Nos guides pratiques</h2>
          <p className="section-subtitle">
            Tout ce que vous devez savoir avant d&apos;installer des panneaux
            solaires en Belgique.
          </p>
          <div className="grid-3">
            {guides.slice(0, 6).map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}/`}
                className="guide-card"
              >
                <div className="guide-card__icon">{g.icon}</div>
                <div className="guide-card__title">{g.title}</div>
                <div className="guide-card__excerpt">{g.excerpt}</div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/guides/" className="btn btn-outline">
              Voir tous les guides →
            </Link>
          </div>
        </div>
      </section>

      <hr className="section-separator" />

      {/* Devis Form Section */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Prêt à passer au solaire ?</h2>
            <p className="section-subtitle">
              Recevez jusqu&apos;à 3 devis gratuits d&apos;installateurs certifiés
              dans votre région. Comparez les prix et économisez.
            </p>
          </div>
          <div className="trust-badges" style={{ marginBottom: 32 }}>
            <div className="trust-badge">
              <div className="trust-badge__icon">🆓</div>
              <div className="trust-badge__text">100% gratuit</div>
            </div>
            <div className="trust-badge">
              <div className="trust-badge__icon">✅</div>
              <div className="trust-badge__text">Sans engagement</div>
            </div>
            <div className="trust-badge">
              <div className="trust-badge__icon">🏆</div>
              <div className="trust-badge__text">Installateurs certifiés</div>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <hr className="section-separator" />

      {/* Top communes internal linking mesh */}
      <section className="section section--white">
        <div className="container">
          <h2 className="section-title">Primes solaires par commune</h2>
          <p className="section-subtitle">
            Retrouvez les aides spécifiques à votre commune parmi les principales villes belges francophones.
          </p>

          <div style={{ marginTop: 32 }}>
            <h3 style={{ fontSize: "1.125rem", marginBottom: 16 }}>🔴 Wallonie</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {[
                { s: "namur", n: "Namur" }, { s: "liege", n: "Liège" }, { s: "charleroi", n: "Charleroi" },
                { s: "mons", n: "Mons" }, { s: "tournai", n: "Tournai" }, { s: "la-louviere", n: "La Louvière" },
                { s: "seraing", n: "Seraing" }, { s: "verviers", n: "Verviers" }, { s: "mouscron", n: "Mouscron" },
                { s: "wavre", n: "Wavre" }, { s: "arlon", n: "Arlon" }, { s: "waterloo", n: "Waterloo" },
                { s: "nivelles", n: "Nivelles" }, { s: "gembloux", n: "Gembloux" }, { s: "dinant", n: "Dinant" },
                { s: "bastogne", n: "Bastogne" }, { s: "spa", n: "Spa" }, { s: "durbuy", n: "Durbuy" },
                { s: "fleurus", n: "Fleurus" }, { s: "herstal", n: "Herstal" },
              ].map((c) => (
                <Link key={c.s} href={`/primes-solaires/${c.s}/`}
                  style={{ padding: "6px 14px", background: "#FEF2F2", color: "#991B1B", borderRadius: "var(--radius-sm)", fontSize: "0.875rem", textDecoration: "none", border: "1px solid #FECACA" }}>
                  {c.n}
                </Link>
              ))}
            </div>

            <h3 style={{ fontSize: "1.125rem", marginBottom: 16 }}>🟣 Bruxelles</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {[
                { s: "bruxelles", n: "Bruxelles" }, { s: "schaerbeek", n: "Schaerbeek" }, { s: "anderlecht", n: "Anderlecht" },
                { s: "ixelles", n: "Ixelles" }, { s: "uccle", n: "Uccle" }, { s: "forest", n: "Forest" },
                { s: "etterbeek", n: "Etterbeek" }, { s: "saint-gilles", n: "Saint-Gilles" }, { s: "jette", n: "Jette" },
                { s: "woluwe-saint-lambert", n: "Woluwe-Saint-Lambert" }, { s: "woluwe-saint-pierre", n: "Woluwe-Saint-Pierre" },
                { s: "auderghem", n: "Auderghem" }, { s: "watermael-boitsfort", n: "Watermael-Boitsfort" },
                { s: "evere", n: "Evere" }, { s: "molenbeek", n: "Molenbeek" },
              ].map((c) => (
                <Link key={c.s} href={`/primes-solaires/${c.s}/`}
                  style={{ padding: "6px 14px", background: "#F5F3FF", color: "#5B21B6", borderRadius: "var(--radius-sm)", fontSize: "0.875rem", textDecoration: "none", border: "1px solid #DDD6FE" }}>
                  {c.n}
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-4">
            <CommuneSearch />
          </div>
        </div>
      </section>
    </>
  );
}
