import type { Metadata } from "next";
import Link from "next/link";
import FAQ, { FAQSchema } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "FAQ Panneaux Solaires Belgique — Questions Fréquentes",
  description: "Réponses aux questions les plus fréquentes sur les panneaux solaires en Belgique : primes, coûts, rentabilité, installation et démarches.",
};

const faqItems = [
  { question: "Combien coûte une installation de panneaux solaires en Belgique ?", answer: "Pour une installation résidentielle standard de 6 kWc (environ 15 panneaux), comptez entre 6 000€ et 12 000€ pose comprise. Le prix varie selon la marque des panneaux, le type d'onduleur et la complexité de l'installation." },
  { question: "Quelles sont les primes disponibles en 2026 ?", answer: "Il n'existe plus de prime directe à l'installation dans les trois régions. À Bruxelles, les certificats verts BRUGEL restent actifs (2,055 CV/MWh pour ≤ 5 kWc). En Wallonie, les CV ont été supprimés pour les nouvelles installations depuis le 1er janvier 2024. Partout, les aides se concentrent sur les prêts avantageux (Rénoprêt en Wallonie, Ecoreno à Bruxelles, MijnVerbouwLening en Flandre) et la TVA réduite à 6%." },
  { question: "Quel est le temps de retour sur investissement ?", answer: "En moyenne, le retour sur investissement se situe entre 5 et 8 ans en Belgique. Ce délai varie selon votre région, votre consommation, l'orientation de votre toiture et les aides dont vous bénéficiez. À Bruxelles, grâce aux certificats verts, le ROI peut être de 5 à 7 ans." },
  { question: "Faut-il un permis d'urbanisme ?", answer: "Dans la plupart des cas, l'installation de panneaux solaires sur un toit existant ne nécessite pas de permis d'urbanisme. Des exceptions existent pour les bâtiments classés, en zone protégée ou les installations au sol. Consultez votre administration communale en cas de doute." },
  { question: "Les panneaux solaires fonctionnent-ils en Belgique avec le climat ?", answer: "Oui ! La Belgique reçoit en moyenne 1 000 à 1 100 kWh/m²/an d'ensoleillement, suffisant pour un bon rendement. Les panneaux modernes fonctionnent également par temps nuageux (lumière diffuse). L'Allemagne, avec un ensoleillement similaire, est le plus grand marché solaire d'Europe." },
  { question: "Quelle puissance installer pour ma maison ?", answer: "Pour un ménage moyen belge consommant 3 500 kWh/an, une installation de 4 à 6 kWc est généralement recommandée. Avec une voiture électrique ou une pompe à chaleur, 8 à 10 kWc peuvent être nécessaires. Votre installateur dimensionnera l'installation en fonction de votre consommation réelle." },
  { question: "Que se passe-t-il la nuit ou par mauvais temps ?", answer: "La nuit et par mauvais temps, vos panneaux produisent peu ou pas d'électricité. Vous consommez alors de l'électricité du réseau. L'excédent produit en journée est soit stocké dans une batterie domestique, soit injecté sur le réseau (avec compensation ou tarif d'injection selon votre région)." },
  { question: "Combien de temps durent les panneaux solaires ?", answer: "Les panneaux solaires ont une durée de vie de 25 à 30 ans. La plupart des fabricants garantissent au moins 80% de la puissance initiale après 25 ans. L'onduleur a généralement une durée de vie de 10 à 15 ans et devra être remplacé une fois." },
  { question: "Puis-je installer des panneaux solaires sur un toit plat ?", answer: "Oui, les panneaux peuvent être installés sur un toit plat grâce à des supports inclinés (généralement à 35°). C'est une solution courante en Belgique. L'avantage est de pouvoir orienter les panneaux plein sud pour un rendement optimal." },
  { question: "Que sont les certificats verts ?", answer: "Les certificats verts sont des titres attestant la production d'électricité verte. À Bruxelles, le système BRUGEL est actif en 2026 : 2,055 CV/MWh pour les installations ≤ 5 kWc (taux maintenu au 1er avril 2026), soit ~700–1 000€/an. En Wallonie, les CV ont été supprimés pour les nouvelles installations résidentielles depuis le 1er janvier 2024. En Flandre, ils n'existent plus." },
  { question: "Le compteur qui tourne à l'envers existe-t-il encore ?", answer: "Le compteur réversible a été supprimé pour les nouvelles installations dans les trois régions. En Flandre, il est remplacé par le tarif d'injection depuis 2021. En Wallonie, le compteur réversible et le tarif prosumer ont été supprimés pour les nouvelles installations depuis le 1er janvier 2024 (compteur double flux obligatoire, rentabilité via autoconsommation + tarif d'injection). À Bruxelles, la compensation annuelle est encore en vigueur." },
  { question: "Comment choisir un bon installateur ?", answer: "Vérifiez que l'installateur est certifié Rescert (Wallonie) ou agréé dans votre région. Demandez au moins 3 devis pour comparer. Vérifiez les avis en ligne, l'expérience et les garanties proposées. Un bon installateur vous accompagne dans les démarches administratives." },
  { question: "Dois-je nettoyer mes panneaux solaires ?", answer: "La pluie suffit généralement à nettoyer vos panneaux. Un nettoyage professionnel peut être utile tous les 2-3 ans si vos panneaux sont peu inclinés ou situés près d'une source de pollution (usine, route fréquentée, arbres). Le coût est d'environ 100-200€." },
  { question: "Puis-je vendre mon excédent d'électricité ?", answer: "Oui, selon votre région. En Flandre, vous recevez un tarif d'injection de 3–5 ct€/kWh. À Bruxelles, la compensation annuelle vous permet de déduire l'injection de votre consommation. En Wallonie (nouvelles installations 2024+), l'électricité injectée est rémunérée au tarif d'injection de votre fournisseur (~3–6 ct€/kWh) — la priorité absolue est l'autoconsommation." },
  { question: "Une batterie domestique est-elle rentable ?", answer: "La rentabilité d'une batterie domestique dépend de votre région et de votre profil de consommation. En Flandre, où le compteur numérique est obligatoire et le tarif d'injection faible, une batterie peut être intéressante. Le coût moyen est de 4 000-8 000€ pour 5-10 kWh de capacité." },
];

export default function FAQPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 800 }}>
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span className="breadcrumb__sep">›</span>
          <span>FAQ</span>
        </div>

        <h1>Questions fréquentes — Panneaux solaires en Belgique</h1>
        <p style={{ color: "var(--text-light)", marginTop: 8, marginBottom: 40 }}>
          Les réponses aux questions les plus posées sur l&apos;installation de panneaux solaires, les primes et la rentabilité en Belgique.
        </p>

        <FAQ items={faqItems} />
        <FAQSchema items={faqItems} />

        <div className="text-center mt-4">
          <p style={{ color: "var(--text-light)", marginBottom: 16 }}>Vous avez d&apos;autres questions ? Nos installateurs sont là pour vous répondre.</p>
          <Link href="/devis/" className="btn btn-accent btn-lg">✦ Demander un devis gratuit</Link>
        </div>
      </div>
    </section>
  );
}
