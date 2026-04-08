import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Devis Panneaux Solaires Gratuit — Recevez 3 Offres",
  description:
    "Demandez gratuitement jusqu'à 3 devis d'installateurs certifiés pour vos panneaux solaires en Belgique. Sans engagement, réponse en 48h.",
};

export default function DevisPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Accueil</a>
            <span className="breadcrumb__sep">›</span>
            <span>Devis gratuit</span>
          </div>

          <div className="text-center mb-4">
            <h1>Recevez 3 devis gratuits pour vos panneaux solaires</h1>
            <p className="section-subtitle">
              Comparez les offres d&apos;installateurs certifiés dans votre
              région. 100% gratuit, sans engagement.
            </p>
          </div>

          <div className="trust-badges">
            <div className="trust-badge">
              <div className="trust-badge__icon">🆓</div>
              <div className="trust-badge__text">Service gratuit</div>
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
    </>
  );
}
