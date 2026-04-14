export interface RegionPrime {
  region: 'wallonie' | 'bruxelles' | 'flandre';
  label: string;
  color: string;
  primeDirecte: string;
  mecanismes: PrimeMecanisme[];
  conditions: string[];
  lienOfficiel: string;
}

export interface PrimeMecanisme {
  nom: string;
  description: string;
  montant: string;
  icon: string;
}

export const primesByRegion: RegionPrime[] = [
  {
    region: 'wallonie',
    label: 'Wallonie',
    color: 'var(--region-wal)',
    primeDirecte: 'Il n\'existe plus de prime régionale directe en Wallonie. Les certificats verts et le compteur réversible ont été supprimés pour les nouvelles installations depuis le 1er janvier 2024.',
    mecanismes: [
      {
        nom: 'Rénoprêt',
        description: 'Prêt à taux 0% de la Société Wallonne du Crédit Social (SWCS) pour financer vos panneaux solaires. Montant max : 60 000€.',
        montant: 'Prêt à taux 0%',
        icon: '🏦',
      },
      {
        nom: 'TVA à 6%',
        description: 'Taux de TVA réduit à 6% au lieu de 21% pour les logements de plus de 10 ans. Économie de ~1 200€ sur une installation de 8 000€.',
        montant: '~1 200€ d\'économie',
        icon: '📉',
      },
      {
        nom: 'Tarif d\'injection',
        description: 'Votre fournisseur rémunère l\'électricité excédentaire injectée sur le réseau. La rentabilité repose désormais principalement sur l\'autoconsommation.',
        montant: '~3–6 ct€/kWh injecté',
        icon: '⚡',
      },
      {
        nom: 'Autoconsommation',
        description: 'Chaque kWh autoconsommé évite un achat réseau (~0,35€). Maximiser l\'autoconsommation est la stratégie clé en Wallonie depuis 2024.',
        montant: '~800–1 200€ économisés/an',
        icon: '☀️',
      },
    ],
    conditions: [
      'Être propriétaire d\'un logement en Wallonie',
      'Installation réalisée par un installateur certifié Rescert',
      'Logement de plus de 10 ans pour TVA à 6%',
      'Compteur communicant (double flux) obligatoire',
      'Les certificats verts ne s\'appliquent plus aux nouvelles installations résidentielles',
    ],
    lienOfficiel: 'https://energie.wallonie.be',
  },
  {
    region: 'bruxelles',
    label: 'Bruxelles',
    color: 'var(--region-bxl)',
    primeDirecte: 'Bruxelles maintient le système de certificats verts BRUGEL, le plus avantageux de Belgique. Taux maintenu à 2,055 CV/MWh pour les installations ≤ 5 kWc (taux révisé au 1er avril 2026).',
    mecanismes: [
      {
        nom: 'Certificats verts BRUGEL',
        description: 'Taux de 2,055 CV/MWh pour les installations ≤ 5 kWc (inchangé au 1er avril 2026). Certification RESCert PV obligatoire depuis le 1er janvier 2026.',
        montant: '~700–1 000€/an (5 kWc)',
        icon: '📜',
      },
      {
        nom: 'Prêt Ecoreno',
        description: 'Prêt vert à taux avantageux pour travaux d\'efficacité énergétique incluant les panneaux solaires.',
        montant: 'Prêt avantageux max 25 000€',
        icon: '🏦',
      },
      {
        nom: 'Primes communales',
        description: 'Certaines communes bruxelloises offrent des primes locales supplémentaires. Renseignez-vous auprès de votre administration.',
        montant: 'Variable selon commune',
        icon: '🏘️',
      },
      {
        nom: 'Compensation réseau',
        description: 'Mécanisme de compensation annuelle : l\'électricité injectée est déduite de votre consommation sur base annuelle.',
        montant: 'Économie nette ~400–600€/an',
        icon: '🔄',
      },
    ],
    conditions: [
      'Être situé en Région de Bruxelles-Capitale',
      'Installation réalisée par un installateur certifié RESCert PV (obligatoire depuis jan. 2026)',
      'Puissance max 100 kWc pour bénéficier des CV (résidentiel : ≤ 5 kWc recommandé)',
      'Demande de certificats verts à introduire auprès de BRUGEL après mise en service',
      'Installations > 100 kWc : aucun certificat vert octroyé depuis le 1er avril 2026',
    ],
    lienOfficiel: 'https://renolution.brussels',
  },
  {
    region: 'flandre',
    label: 'Flandre',
    color: 'var(--region-vl)',
    primeDirecte: 'La Flandre a supprimé toutes les primes directes (Fluvius, prime de compensation). La rentabilité repose sur l\'autoconsommation, le tarif d\'injection et le prêt MijnVerbouwLening.',
    mecanismes: [
      {
        nom: 'MijnVerbouwLening',
        description: 'Prêt à taux avantageux de la Région flamande pour projets de rénovation énergétique incluant le solaire. Max 60 000€.',
        montant: 'Prêt avantageux',
        icon: '🏦',
      },
      {
        nom: 'Tarif d\'injection',
        description: 'Rémunération pour l\'électricité excédentaire injectée sur le réseau. La rentabilité repose avant tout sur l\'autoconsommation maximisée.',
        montant: '~3–5 ct€/kWh injecté',
        icon: '⚡',
      },
      {
        nom: 'TVA à 6%',
        description: 'Comme en Wallonie, TVA réduite à 6% pour les logements de plus de 10 ans.',
        montant: '~1 200€ d\'économie',
        icon: '📉',
      },
      {
        nom: 'Compteur numérique',
        description: 'Compteur numérique Fluvius obligatoire. Il mesure séparément la production injectée et la consommation prélevée du réseau.',
        montant: 'Installé gratuitement par Fluvius',
        icon: '🔢',
      },
    ],
    conditions: [
      'Être situé en Région flamande',
      'Installation par un installateur certifié Fluvius',
      'Logement de plus de 10 ans pour TVA à 6%',
      'Compteur numérique (digital) obligatoire',
      'Aucune prime directe ni certificat vert disponible en 2026',
    ],
    lienOfficiel: 'https://www.vlaanderen.be/energie',
  },
];

export function getPrimeForRegion(region: string): RegionPrime | undefined {
  return primesByRegion.find(p => p.region === region);
}

export function getPrimeRange(region: string): { min: number; max: number } {
  switch (region) {
    case 'wallonie':
      return { min: 1200, max: 3500 };
    case 'bruxelles':
      return { min: 2500, max: 5500 };
    case 'flandre':
      return { min: 800, max: 2000 };
    default:
      return { min: 1000, max: 4000 };
  }
}
