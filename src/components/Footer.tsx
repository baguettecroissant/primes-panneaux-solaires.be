import Link from "next/link";
import { guides } from "@/data/guides";

const topCommunesWallonie = [
  { s: "namur", n: "Namur" }, { s: "liege", n: "Liège" }, { s: "charleroi", n: "Charleroi" },
  { s: "mons", n: "Mons" }, { s: "tournai", n: "Tournai" }, { s: "la-louviere", n: "La Louvière" },
  { s: "wavre", n: "Wavre" }, { s: "waterloo", n: "Waterloo" }, { s: "nivelles", n: "Nivelles" },
  { s: "arlon", n: "Arlon" }, { s: "verviers", n: "Verviers" }, { s: "seraing", n: "Seraing" },
];

const topCommunesBxl = [
  { s: "bruxelles", n: "Bruxelles" }, { s: "schaerbeek", n: "Schaerbeek" }, { s: "ixelles", n: "Ixelles" },
  { s: "uccle", n: "Uccle" }, { s: "etterbeek", n: "Etterbeek" }, { s: "forest", n: "Forest" },
  { s: "jette", n: "Jette" }, { s: "anderlecht", n: "Anderlecht" }, { s: "molenbeek", n: "Molenbeek" },
  { s: "woluwe-saint-lambert", n: "Woluwe-S-L" }, { s: "auderghem", n: "Auderghem" }, { s: "evere", n: "Evere" },
];

const marques = [
  { s: "sunpower", n: "SunPower" }, { s: "lg-solar", n: "LG Solar" }, { s: "trina-solar", n: "Trina Solar" },
  { s: "jinko-solar", n: "Jinko Solar" }, { s: "longi", n: "LONGi" }, { s: "canadian-solar", n: "Canadian Solar" },
  { s: "ja-solar", n: "JA Solar" }, { s: "rec-solar", n: "REC Solar" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {/* Main Footer Grid */}
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__brand-name">
              ☀️ Primes <span>Solaires</span>
            </div>
            <p>
              Votre guide complet sur les primes, subsides et aides à
              l&apos;installation de panneaux solaires en Belgique. Informations
              actualisées pour la Wallonie, Bruxelles et la Flandre.
            </p>
            <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link href="/devis/" className="btn btn-accent btn-sm">
                ✦ Devis gratuit
              </Link>
              <Link href="/rentabilite/" className="btn btn-outline btn-sm" style={{ borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}>
                Simulateur →
              </Link>
            </div>
          </div>

          <div className="footer__col">
            <h4>Primes par région</h4>
            <ul>
              <li><Link href="/primes-wallonie/">Primes Wallonie</Link></li>
              <li><Link href="/primes-bruxelles/">Primes Bruxelles</Link></li>
              <li><Link href="/primes-flandre/">Primes Flandre</Link></li>
              <li><Link href="/rentabilite/">Simulateur rentabilité</Link></li>
              <li><Link href="/devis/">Demander un devis</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Guides pratiques</h4>
            <ul>
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}/`}>{g.title.split(" : ")[0]}</Link>
                </li>
              ))}
              <li><Link href="/guides/">Tous les guides</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Marques</h4>
            <ul>
              {marques.map((m) => (
                <li key={m.s}>
                  <Link href={`/marques/${m.s}/`}>{m.n}</Link>
                </li>
              ))}
              <li><Link href="/marques/">Toutes les marques</Link></li>
            </ul>
          </div>
        </div>

        {/* Mega internal linking — Communes */}
        <div className="footer__communes">
          <div className="footer__communes-section">
            <h4>Primes solaires Wallonie</h4>
            <div className="footer__commune-links">
              {topCommunesWallonie.map((c) => (
                <Link key={c.s} href={`/primes-solaires/${c.s}/`}>{c.n}</Link>
              ))}
            </div>
          </div>
          <div className="footer__communes-section">
            <h4>Primes solaires Bruxelles</h4>
            <div className="footer__commune-links">
              {topCommunesBxl.map((c) => (
                <Link key={c.s} href={`/primes-solaires/${c.s}/`}>{c.n}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* External resources */}
        <div className="footer__resources">
          <h4>Ressources officielles</h4>
          <div className="footer__commune-links">
            <a href="https://energie.wallonie.be" target="_blank" rel="noopener noreferrer">Énergie Wallonie ↗</a>
            <a href="https://renolution.brussels" target="_blank" rel="noopener noreferrer">Renolution Brussels ↗</a>
            <a href="https://www.cwape.be" target="_blank" rel="noopener noreferrer">CWaPE ↗</a>
            <a href="https://www.brugel.brussels" target="_blank" rel="noopener noreferrer">BRUGEL ↗</a>
            <a href="https://www.ores.be" target="_blank" rel="noopener noreferrer">ORES ↗</a>
            <a href="https://www.sibelga.be" target="_blank" rel="noopener noreferrer">Sibelga ↗</a>
            <a href="https://www.resa.be" target="_blank" rel="noopener noreferrer">RESA ↗</a>
            <a href="https://re.jrc.ec.europa.eu/pvg_tools/fr/" target="_blank" rel="noopener noreferrer">PVGIS ↗</a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} primes-panneaux-solaires.be — Tous droits réservés</span>
          <div style={{ display: "flex", gap: 16 }}>
            <Link href="/mentions-legales/">Mentions légales</Link>
            <Link href="/faq/">FAQ</Link>
            <Link href="/sitemap.xml">Plan du site</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
