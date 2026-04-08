import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export const metadata: Metadata = {
  title: {
    default: "Primes Panneaux Solaires Belgique — Aides, Subsides & Installation 2026",
    template: "%s | Primes Panneaux Solaires Belgique",
  },
  description:
    "Découvrez toutes les primes, subsides et aides pour l'installation de panneaux solaires en Belgique. Wallonie, Bruxelles, Flandre : montants, conditions et démarches 2026.",
  keywords: [
    "primes panneaux solaires",
    "panneaux solaires Belgique",
    "subsides photovoltaique",
    "primes Wallonie",
    "certificats verts",
    "installation solaire",
  ],
  authors: [{ name: "Primes Panneaux Solaires Belgique" }],
  openGraph: {
    type: "website",
    locale: "fr_BE",
    siteName: "Primes Panneaux Solaires Belgique",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCTA />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Primes Panneaux Solaires Belgique",
              url: "https://primes-panneaux-solaires.be",
              description:
                "Portail d'information sur les primes et aides à l'installation de panneaux solaires en Belgique.",
            }),
          }}
        />
      </body>
    </html>
  );
}
