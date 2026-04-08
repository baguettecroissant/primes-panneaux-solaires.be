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
    primeDirecte: 'Il n\'existe plus de prime régionale directe pour l\'installation de panneaux photovoltaïques en Wallonie depuis 2014.',
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
        nom: 'Certificats verts',
        description: 'Système de certificats verts wallon : 1 CV pour chaque MWh produit pendant 10 ans. Valeur d\'un CV : ~65€.',
        montant: '~450€/an (6 kWc)',
        icon: '📜',
      },
      {
        nom: 'Tarif prosumer',
        description: 'Vous payez le tarif prosumer sur la base de votre puissance installée. Compensé partiellement par les certificats verts.',
        montant: '~350–500€/an',
        icon: '⚡',
      },
    ],
    conditions: [
      'Être propriétaire d\'un logement en Wallonie',
      'Installation réalisée par un installateur certifié Rescert',
      'Logement de plus de 10 ans pour TVA à 6%',
      'Puissance maximale : 10 kWc pour les certificats verts résidentiels',
      'Compteur communicant obligatoire',
    ],
    lienOfficiel: 'https://energie.wallonie.be',
  },
  {
    region: 'bruxelles',
    label: 'Bruxelles',
    color: 'var(--region-bxl)',
    primeDirecte: 'Bruxelles ne propose pas de prime directe à l\'installation mais offre un système de certificats verts très avantageux.',
    mecanismes: [
      {
        nom: 'Certificats verts Brugel',
        description: 'Système très généreux : facteur de multiplication selon la puissance. Revente des CV aux fournisseurs d\'énergie obligés de les racheter.',
        montant: '~800–1 400€/an (6 kWc)',
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
        description: 'Mécanisme de compensation : l\'électricité injectée est déduite de votre consommation sur une base annuelle.',
        montant: 'Économie nette ~500€/an',
        icon: '🔄',
      },
    ],
    conditions: [
      'Être situé en Région de Bruxelles-Capitale',
      'Installation réalisée par un installateur agréé',
      'Certification BRUGEL obligatoire',
      'Puissance max 10 kWc pour le résidentiel',
      'Demande de certificats verts à introduire auprès de BRUGEL',
    ],
    lienOfficiel: 'https://renolution.brussels',
  },
  {
    region: 'flandre',
    label: 'Flandre',
    color: 'var(--region-vl)',
    primeDirecte: 'La Flandre a supprimé la prime directe Fluvius. Le soutien se fait via le tarif d\'injection et le prêt MijnVerbouwLening.',
    mecanismes: [
      {
        nom: 'MijnVerbouwLening',
        description: 'Prêt à taux avantageux de la Région flamande pour projets de rénovation énergétique incluant le solaire. Max 60 000€.',
        montant: 'Prêt avantageux',
        icon: '🏦',
      },
      {
        nom: 'Tarif d\'injection',
        description: 'Rémunération pour l\'électricité excédentaire injectée sur le réseau. Remplace le compteur qui tourne à l\'envers.',
        montant: '~3-5 ct€/kWh injecté',
        icon: '⚡',
      },
      {
        nom: 'Prime de compensation',
        description: 'Pour les installations antérieures à fin 2023, une prime de compensation est encore accessible jusque fin 2025.',
        montant: 'Variable',
        icon: '💶',
      },
      {
        nom: 'TVA à 6%',
        description: 'Comme en Wallonie, TVA réduite à 6% pour les logements de plus de 10 ans.',
        montant: '~1 200€ d\'économie',
        icon: '📉',
      },
    ],
    conditions: [
      'Être situé en Région flamande',
      'Installation par un installateur certifié',
      'Logement de plus de 10 ans pour TVA à 6%',
      'Compteur digital obligatoire',
      'Demande via le site de Fluvius',
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
