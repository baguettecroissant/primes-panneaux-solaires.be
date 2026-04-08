import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description: "Mentions légales du site primes-panneaux-solaires.be.",
};

export default function MentionsLegalesPage() {
  return (
    <div className="legal-page">
      <div className="breadcrumb">
        <Link href="/">Accueil</Link>
        <span className="breadcrumb__sep">›</span>
        <span>Mentions légales</span>
      </div>

      <h1>Mentions légales</h1>

      <h2>Éditeur du site</h2>
      <p>Le site primes-panneaux-solaires.be est un site d&apos;information sur les primes et aides à l&apos;installation de panneaux solaires en Belgique.</p>

      <h2>Hébergement</h2>
      <p>Ce site est hébergé par Cloudflare, Inc. — 101 Townsend St, San Francisco, CA 94107, États-Unis.</p>

      <h2>Propriété intellectuelle</h2>
      <p>L&apos;ensemble du contenu de ce site (textes, images, graphismes) est protégé par le droit d&apos;auteur. Toute reproduction, même partielle, est soumise à autorisation préalable.</p>

      <h2>Protection des données</h2>
      <p>Les données personnelles collectées via le formulaire de demande de devis sont transmises à nos partenaires installateurs dans le seul but de vous fournir des offres personnalisées. Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données.</p>

      <h2>Cookies</h2>
      <p>Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie de tracking publicitaire n&apos;est utilisé.</p>

      <h2>Limitation de responsabilité</h2>
      <p>Les informations fournies sur ce site le sont à titre indicatif. Les montants des primes et conditions d&apos;éligibilité peuvent évoluer. Nous vous recommandons de vérifier les informations auprès des sources officielles régionales.</p>

      <h2>Liens externes</h2>
      <p>Ce site contient des liens vers des sites tiers (sites officiels régionaux). Nous ne sommes pas responsables du contenu de ces sites.</p>
    </div>
  );
}
