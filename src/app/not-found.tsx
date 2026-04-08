import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page introuvable — Primes Solaires Belgique",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFound() {
  return (
    <section className="section" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="container text-center">
        <h1 style={{ fontSize: "6rem", margin: "0", color: "var(--primary)", lineHeight: 1 }}>404</h1>
        <h2 style={{ marginTop: "1rem", marginBottom: "2rem" }}>Oups ! Cette page s&apos;est éclipsée...</h2>
        <p style={{ color: "var(--text-light)", maxWidth: "500px", margin: "0 auto 2rem", fontSize: "1.125rem" }}>
          La page que vous recherchez semble introuvable. Elle a peut-être été déplacée ou supprimée. Ne perdez pas le nord, retournez à l&apos;accueil pour découvrir vos primes solaires.
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
