export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  region?: 'wallonie' | 'bruxelles' | 'flandre' | null;
  icon: string;
}

export const guides: Guide[] = [
  {
    slug: 'primes-panneaux-solaires-wallonie-2025',
    title: 'Primes panneaux solaires Wallonie 2026 : montants, conditions et démarches',
    excerpt: 'Guide complet des aides disponibles en Wallonie pour votre installation photovoltaïque : Rénoprêt, TVA réduite, certificats verts et avantages fiscaux.',
    region: 'wallonie',
    icon: '🏛️',
  },
  {
    slug: 'primes-panneaux-solaires-bruxelles-2025',
    title: 'Primes panneaux solaires Bruxelles 2026 : guide complet',
    excerpt: 'Certificats verts, prêt Ecoreno, primes communales : tout savoir sur les aides bruxelloises pour installer des panneaux solaires.',
    region: 'bruxelles',
    icon: '🏙️',
  },
  {
    slug: 'certificats-verts-belgique',
    title: 'Certificats verts en Belgique : fonctionnement et revenus',
    excerpt: 'Comment fonctionnent les certificats verts ? Combien rapportent-ils ? Différences entre régions et calcul de vos revenus annuels.',
    region: null,
    icon: '📜',
  },
  {
    slug: 'compteur-tourne-envers-fin-alternatives',
    title: 'Compteur qui tourne à l\'envers : fin du système, alternatives',
    excerpt: 'Le compteur qui tourne à l\'envers, c\'est fini. Découvrez les alternatives : batterie domestique, autoconsommation et tarif d\'injection.',
    region: null,
    icon: '🔄',
  },
  {
    slug: 'batterie-domestique-belgique-prix-primes',
    title: 'Batterie domestique en Belgique : prix, primes et rentabilité',
    excerpt: 'Prix d\'une batterie domestique, aides disponibles, marques recommandées et calcul du temps de retour sur investissement.',
    region: null,
    icon: '🔋',
  },
  {
    slug: 'autoconsommation-solaire-maximiser-economies',
    title: 'Autoconsommation solaire : maximiser ses économies',
    excerpt: 'Conseils pratiques pour augmenter votre taux d\'autoconsommation et réduire votre facture d\'électricité au maximum.',
    region: null,
    icon: '⚡',
  },
  {
    slug: 'tarif-prosumer-wallonie-impact-facture',
    title: 'Tarif prosumer Wallonie : impact réel sur votre facture',
    excerpt: 'Qu\'est-ce que le tarif prosumer ? Comment est-il calculé ? Stratégies pour en minimiser l\'impact sur votre budget énergétique.',
    region: 'wallonie',
    icon: '💰',
  },
  {
    slug: 'demarches-administratives-panneaux-solaires',
    title: 'Démarches administratives panneaux solaires : du permis au raccordement',
    excerpt: 'Toutes les étapes administratives pour installer des panneaux solaires en Belgique : permis, raccordement, certification et déclaration.',
    region: null,
    icon: '📋',
  },
];
