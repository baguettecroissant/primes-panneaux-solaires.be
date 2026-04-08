import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { guides } from "@/data/guides";
import { guideContents } from "@/data/guide-contents";
import LeadForm from "@/components/LeadForm";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide non trouvé" };
  return {
    title: guide.title,
    description: guide.excerpt,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  const content = guideContents[slug];
  if (!guide) return <div className="container section"><h1>Guide non trouvé</h1></div>;

  const regionLabel = guide.region === "wallonie" ? "Wallonie" : guide.region === "bruxelles" ? "Bruxelles" : guide.region === "flandre" ? "Flandre" : null;

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span className="breadcrumb__sep">›</span>
          <Link href="/guides/">Guides</Link>
          <span className="breadcrumb__sep">›</span>
          <span>{guide.title.split(":")[0]}</span>
        </div>

        {regionLabel && (
          <span className={`badge badge--${guide.region === "wallonie" ? "wal" : guide.region === "bruxelles" ? "bxl" : "vl"}`}>
            {regionLabel}
          </span>
        )}

        <h1 style={{ marginTop: 12 }}>{guide.title}</h1>
        <p style={{ color: "var(--text-light)", marginTop: 8, marginBottom: 40, fontSize: "1.0625rem" }}>
          {guide.excerpt}
        </p>

        <div style={{ position: "relative", width: "100%", height: 350, marginBottom: 48, borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
          <Image 
            src="/guide-hero.png" 
            alt="Panneaux solaires guide" 
            fill 
            style={{ objectFit: "cover" }} 
            priority
          />
        </div>

        <div className="article" dangerouslySetInnerHTML={{ __html: content || "<p>Contenu en cours de rédaction.</p>" }} />

        <hr className="section-separator" />

        {/* Embedded Lead Form */}
        <div style={{ marginTop: 48 }}>
          <div className="text-center mb-4">
            <h2>Recevez vos devis gratuits</h2>
            <p className="section-subtitle">
              Comparez les offres d&apos;installateurs certifiés près de chez vous. 100% gratuit, sans engagement.
            </p>
          </div>
          <LeadForm />
        </div>

        <hr className="section-separator" />

        {/* Commune links for SEO mesh */}
        <div style={{ marginTop: 48 }}>
          <h3>Où installer des panneaux solaires ?</h3>
          <p style={{ color: "var(--text-light)", marginBottom: 16, fontSize: "0.9375rem" }}>
            Consultez les primes et aides disponibles dans votre commune :
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {[
              { s: "namur", n: "Namur" }, { s: "liege", n: "Liège" }, { s: "charleroi", n: "Charleroi" },
              { s: "mons", n: "Mons" }, { s: "bruxelles", n: "Bruxelles" }, { s: "ixelles", n: "Ixelles" },
              { s: "tournai", n: "Tournai" }, { s: "wavre", n: "Wavre" }, { s: "waterloo", n: "Waterloo" },
              { s: "uccle", n: "Uccle" }, { s: "schaerbeek", n: "Schaerbeek" }, { s: "arlon", n: "Arlon" },
            ].map((c) => (
              <Link key={c.s} href={`/primes-solaires/${c.s}/`}
                style={{ padding: "6px 14px", background: "var(--primary-light)", color: "var(--text)", borderRadius: "var(--radius-sm)", fontSize: "0.875rem", textDecoration: "none", border: "1px solid var(--border)" }}>
                {c.n}
              </Link>
            ))}
          </div>
        </div>

        {/* Other guides */}
        <div style={{ marginTop: 32 }}>
          <h3>Autres guides</h3>
          <div className="grid-3" style={{ marginTop: 16 }}>
            {guides.filter((g) => g.slug !== slug).slice(0, 6).map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}/`} className="guide-card">
                <div className="guide-card__icon">{g.icon}</div>
                <div className="guide-card__title">{g.title}</div>
                <div className="guide-card__excerpt">{g.excerpt.slice(0, 80)}…</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
