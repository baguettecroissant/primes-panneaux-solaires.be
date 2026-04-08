export interface Marque {
  slug: string;
  name: string;
  country: string;
  type: 'panneau' | 'onduleur';
  description: string;
  priceRange: string;
  warranty: string;
  efficiency: string;
}

export const marques: Marque[] = [
  {
    slug: 'sunpower',
    name: 'SunPower',
    country: 'États-Unis',
    type: 'panneau',
    description: 'Leader mondial du panneau haut rendement avec la technologie Maxeon à cellules back-contact.',
    priceRange: '350–500 €/panneau',
    warranty: '25 ans produit + 25 ans performance',
    efficiency: '22,8%',
  },
  {
    slug: 'lg-solar',
    name: 'LG Solar',
    country: 'Corée du Sud',
    type: 'panneau',
    description: 'Panneaux premium NeON avec technologie CELLO offrant un excellent rendement par temps nuageux.',
    priceRange: '280–400 €/panneau',
    warranty: '25 ans produit + 25 ans performance',
    efficiency: '22,0%',
  },
  {
    slug: 'trina-solar',
    name: 'Trina Solar',
    country: 'Chine',
    type: 'panneau',
    description: 'Géant mondial du photovoltaïque offrant un excellent rapport qualité-prix avec la gamme Vertex.',
    priceRange: '150–250 €/panneau',
    warranty: '15 ans produit + 25 ans performance',
    efficiency: '21,6%',
  },
  {
    slug: 'jinko-solar',
    name: 'Jinko Solar',
    country: 'Chine',
    type: 'panneau',
    description: 'Plus grand fabricant mondial de panneaux solaires avec la technologie Tiger Neo N-type.',
    priceRange: '140–230 €/panneau',
    warranty: '15 ans produit + 30 ans performance',
    efficiency: '22,3%',
  },
  {
    slug: 'canadian-solar',
    name: 'Canadian Solar',
    country: 'Canada',
    type: 'panneau',
    description: 'Fabricant fiable proposant une large gamme de panneaux pour le résidentiel et le commercial.',
    priceRange: '140–220 €/panneau',
    warranty: '12 ans produit + 25 ans performance',
    efficiency: '21,4%',
  },
  {
    slug: 'rec',
    name: 'REC',
    country: 'Norvège',
    type: 'panneau',
    description: 'Panneaux européens haut de gamme avec technologie TwinPeak et garantie secteur la plus solide.',
    priceRange: '250–380 €/panneau',
    warranty: '25 ans produit + 25 ans performance',
    efficiency: '21,9%',
  },
  {
    slug: 'longi',
    name: 'LONGi',
    country: 'Chine',
    type: 'panneau',
    description: 'Leader mondial du monocristallin avec la série Hi-MO offrant des performances exceptionnelles.',
    priceRange: '150–250 €/panneau',
    warranty: '15 ans produit + 30 ans performance',
    efficiency: '22,5%',
  },
  {
    slug: 'enphase',
    name: 'Enphase',
    country: 'États-Unis',
    type: 'onduleur',
    description: 'Référence mondiale des micro-onduleurs avec monitoring intelligent par panneau individuel.',
    priceRange: '150–200 €/micro-onduleur',
    warranty: '25 ans',
    efficiency: '97,5% conversion',
  },
];
