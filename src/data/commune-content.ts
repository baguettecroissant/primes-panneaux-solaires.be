/**
 * commune-content.ts
 * Moteur de contenu unique pour chaque page commune.
 * Utilise les données enrichies pour générer du texte contextuel, 
 * des FAQ différenciées et des sections "Le saviez-vous ?"
 * 
 * AUCUN copier-coller entre communes : le contenu est assemblé 
 * à partir de ~40 blocs combinatoires sélectionnés par hash.
 */

import type { CommuneEnriched } from "./commune-enrichment";
import { hashString, getAllPostCodes } from "./commune-enrichment";

/* ─── INTRODUCTIONS (sélection par hash de province × typeHabitat × pop tranche) ─── */

const INTROS: ((c: CommuneEnriched) => string)[] = [
  (c) => `Avec une irradiance solaire de ${c.irradianceKwh} kWh/m²/an, ${c.name} bénéficie de conditions favorables pour le photovoltaïque résidentiel. Chaque installation de 6 kWc peut y produire environ ${c.productionAnnuelle6kWc.toLocaleString("fr-BE")} kWh par an, soit l'équivalent de la consommation d'un ménage belge moyen.`,

  (c) => `À ${c.name}, commune ${c.typeHabitat === "urbain" ? "densément peuplée" : c.typeHabitat === "periurbain" ? "périurbaine dynamique" : "au caractère rural préservé"} de ${c.province || "la Région de Bruxelles-Capitale"}, le solaire représente un levier concret pour réduire votre facture énergétique. Les ${c.population.toLocaleString("fr-BE")} habitants de la commune ont tout intérêt à profiter des mécanismes d'aide en vigueur.`,

  (c) => `Installer des panneaux solaires à ${c.name} (${c.postCode}), c'est miser sur un retour sur investissement estimé à ${c.roiAnnees} ans grâce aux aides régionales et à un ensoleillement annuel de ${c.irradianceKwh} kWh/m². Après amortissement, votre toiture produit de l'électricité gratuite pendant 18 à 22 ans.`,

  (c) => `En ${c.province || "Région bruxelloise"}, la transition énergétique passe par le photovoltaïque. ${c.name} et ses environs offrent un potentiel solaire de ${c.irradianceKwh} kWh/m²/an — suffisant pour qu'une installation standard de 6 kWc génère une économie nette de ${c.economieAnnuelle.toLocaleString("fr-BE")}€ par an sur votre facture.`,

  (c) => `La commune de ${c.name}, située ${c.typeHabitat === "rural" ? "au cœur de la campagne" : c.typeHabitat === "periurbain" ? "dans un cadre semi-urbain" : "en milieu urbain"} ${c.province ? `de la province de ${c.province.replace(/\(.*\)/, "").trim()}` : "bruxellois"}, enregistre un rayonnement solaire annuel de ${c.irradianceKwh} kWh/m². Un chiffre qui place votre toiture parmi les investissements les plus rentables à moyen terme.`,

  (c) => `Pourquoi investir dans le solaire à ${c.name} ? Parce qu'avec ${c.irradianceKwh} kWh/m²/an d'ensoleillement et des aides cumulables allant de votre gestionnaire de réseau ${c.grd.nom} aux mécanismes régionaux, le photovoltaïque reste l'investissement énergétique au ROI le plus rapide en Belgique.`,

  (c) => `Les propriétaires de ${c.name} ont une opportunité concrète de réduire leur empreinte carbone tout en améliorant la valeur de leur bien immobilier. Une installation photovoltaïque de 6 kWc y produit en moyenne ${c.productionAnnuelle6kWc.toLocaleString("fr-BE")} kWh/an, couvrant l'essentiel de la consommation d'un foyer de 4 personnes.`,

  (c) => `${c.name} (${c.postCode}) fait partie des communes ${c.region === "bruxelles" ? "bruxelloises éligibles au système de certificats verts BRUGEL (actif en 2026)" : "wallonnes couvertes par le Rénoprêt à taux 0% et la TVA à 6% — les certificats verts ont été supprimés pour les nouvelles installations depuis janvier 2024"}. Pour un ménage moyen, l'économie annuelle estimée est de ${c.economieAnnuelle.toLocaleString("fr-BE")}€ après installation.`,

  (c) => `Le marché du solaire résidentiel est en plein essor à ${c.name}. Avec un coût moyen passé sous la barre des 1 500€/kWc et un retour sur investissement de ${c.roiAnnees} ans dans votre commune, les panneaux photovoltaïques s'imposent comme la solution énergétique la plus accessible pour les ${c.population.toLocaleString("fr-BE")} habitants.`,

  (c) => `Située à une altitude favorisant un bon ensoleillement, ${c.name} reçoit ${c.irradianceKwh} kWh/m²/an de rayonnement solaire. ${c.grd.nom}, votre gestionnaire de réseau de distribution, assure le raccordement et le suivi de votre production via un compteur communicant.`,

  (c) => `Vous résidez à ${c.name} ou dans les environs de ${c.communesVoisines[0]?.name || "la commune"} ? Le photovoltaïque est aujourd'hui l'investissement le plus rentable pour les propriétaires belges : ${c.roiAnnees} ans de retour sur investissement, 25 ans de durée de vie garantie, et une économie annuelle estimée à ${c.economieAnnuelle.toLocaleString("fr-BE")}€.`,

  (c) => `Chaque toiture de ${c.name} représente un potentiel solaire inexploité. Sur une surface de ${c.superficieKm2} km², la commune compte ${c.population.toLocaleString("fr-BE")} habitants — autant de foyers qui pourraient bénéficier d'une réduction significative de leur facture d'énergie grâce au photovoltaïque.`,
];

/* ─── SECTION CONTEXTE LOCAL ─── */

export function generateContexteLocal(c: CommuneEnriched): string {
  const parts: string[] = [];

  // Paragraphe géographique
  if (c.typeHabitat === "rural") {
    parts.push(`${c.name} est une commune à dominante rurale ${c.province ? `de la province de ${c.province.replace(/\(.*\)/, "").trim()}` : ""}. Le tissu pavillonnaire y offre un avantage majeur pour le solaire : les toitures individuelles, souvent à deux pans, permettent d'optimiser l'orientation et l'inclinaison des panneaux. L'absence d'ombrage par des bâtiments mitoyens améliore le rendement de 10 à 15% par rapport aux configurations urbaines.`);
  } else if (c.typeHabitat === "periurbain") {
    parts.push(`Commune périurbaine ${c.province ? `de ${c.province.replace(/\(.*\)/, "").trim()}` : ""}, ${c.name} combine une densité de population modérée (${c.densiteHabKm2} hab/km²) et un habitat principalement composé de maisons individuelles et de mitoyennes. Ce type de bâti se prête particulièrement bien à l'installation de panneaux solaires, avec des toitures souvent bien orientées sud ou sud-ouest.`);
  } else {
    parts.push(`${c.name} est une commune urbaine ${c.province ? `de ${c.province.replace(/\(.*\)/, "").trim()}` : "de la Région bruxelloise"} avec une densité de ${c.densiteHabKm2} hab/km². En milieu urbain, l'installation de panneaux solaires sur toitures plates (pose en inclinaison avec ballast) ou sur toitures à versants reste tout à fait réalisable. Les installateurs certifiés de la zone maîtrisent les contraintes spécifiques : accès en hauteur, permis éventuels et raccordement au réseau dense de ${c.grd.nom}.`);
  }

  // Données d'ensoleillement
  parts.push(`D'après les données du service européen PVGIS, ${c.name} bénéficie d'un rayonnement global horizontal moyen de **${c.irradianceKwh} kWh/m²/an**. Pour une installation résidentielle standard de 6 kWc (environ 16 panneaux monocristallins), cela se traduit par une production annuelle estimée à **${c.productionAnnuelle6kWc.toLocaleString("fr-BE")} kWh**, en tenant compte d'un ratio de performance de 85%.`);

  return parts.join("\n\n");
}

/* ─── SECTION GRD ─── */

export function generateSectionGRD(c: CommuneEnriched): string {
  const grd = c.grd;
  if (grd.nom === "Sibelga") {
    return `À ${c.name}, votre gestionnaire de réseau de distribution est **Sibelga**. C'est Sibelga qui gère le raccordement de votre installation photovoltaïque au réseau, l'installation du compteur bidirectionnel et le suivi de votre production. La demande de raccordement se fait directement via le portail Sibelga. En Région bruxelloise, le système de compensation nette est encore en vigueur : l'électricité injectée sur le réseau est déduite de votre consommation sur base annuelle.`;
  }
  if (grd.nom === "RESA") {
    return `En province de Liège, votre gestionnaire de réseau est **RESA** (anciennement REW). RESA assure le raccordement de votre installation, la pose du compteur double flux et le relevé de votre production. Vous devez introduire votre demande de raccordement avant l'installation. Pour ${c.name}, les délais de raccordement sont généralement de 4 à 8 semaines après la mise en service. Note : depuis le 1er janvier 2024, les nouvelles installations wallonnes ne bénéficient plus des certificats verts — la rentabilité repose sur l'autoconsommation et le tarif d'injection.`;
  }
  return `À ${c.name}, votre gestionnaire de réseau de distribution est **ORES**. ORES couvre la majorité des communes wallonnes et gère le raccordement de votre installation photovoltaïque, l'installation du compteur double flux et le suivi de votre production. La procédure de demande de raccordement se fait en ligne via le portail ORES. En Wallonie (nouvelles installations depuis jan. 2024), la rentabilité repose sur l'autoconsommation et le tarif d'injection — les certificats verts ne sont plus octroyés aux nouvelles installations résidentielles.`;
}

/* ─── SECTION LE SAVIEZ-VOUS (par province/habitat) ─── */

const SAVIEZ_VOUS_POOL: ((c: CommuneEnriched) => string)[] = [
  (c) => `En ${c.province || "Région bruxelloise"}, la durée d'ensoleillement effective dépasse 1 550 heures par an. Contrairement aux idées reçues, les panneaux solaires produisent même par temps couvert : jusqu'à 25% de leur capacité nominale grâce à la lumière diffuse.`,

  (c) => `Un panneau solaire installé en Belgique produit entre 5 et 8 fois l'énergie qui a été nécessaire à sa fabrication. Après seulement 2 à 3 ans, votre installation a compensé sa propre empreinte carbone.`,

  (c) => `À ${c.name}, ${c.typeHabitat === "rural" ? "les habitations rurales avec leur orientation souvent favorable et l'absence d'ombrage offrent un rendement jusqu'à 15% supérieur aux zones urbaines." : c.typeHabitat === "urbain" ? "les toitures plates en milieu urbain permettent d'orienter les panneaux de manière optimale grâce à des supports inclinés, compensant l'orientation du bâtiment." : "le tissu résidentiel à dominante pavillonnaire est idéal pour le photovoltaïque, avec des surfaces de toiture généralement suffisantes pour une installation de 6 à 10 kWc."}`,

  (c) => `Le prix des panneaux solaires a chuté de 89% en 10 ans en Belgique. Une installation qui coûtait 30 000€ en 2012 revient aujourd'hui à environ 8 500€ pour la même puissance de 6 kWc. À ${c.name}, cela représente un retour sur investissement de seulement ${c.roiAnnees} ans.`,

  (c) => `Saviez-vous que la revente de votre habitation à ${c.name} peut bénéficier d'une plus-value de 3 à 6% grâce à la présence de panneaux solaires ? Une installation photovoltaïque améliore le certificat PEB de votre logement, un critère de plus en plus scruté par les acquéreurs.`,

  (c) => `La Belgique compte plus de 700 000 installations photovoltaïques résidentielles. En ${c.province || "Région bruxelloise"}, le taux d'équipement progresse de 12% par an. ${c.name} suit cette tendance grâce aux conditions de financement avantageuses.`,

  (c) => `L'autoconsommation est la clé de la rentabilité solaire à ${c.name}${c.region === "wallonie" ? ", surtout depuis la suppression des certificats verts pour les nouvelles installations en 2024" : ""}. En consommant directement l'électricité produite (lave-linge, chauffe-eau, véhicule électrique), vous maximisez votre économie. L'installation d'une batterie domestique peut porter l'autoconsommation de 30% à plus de 70%.`,

  (c) => `Votre commune de ${c.name} est raccordée au réseau de distribution de ${c.grd.nom}. Ce gestionnaire assure la qualité de la tension et la fiabilité du réseau local. En cas de surplus de production solaire, l'énergie est réinjectée proprement dans le réseau pour alimenter vos voisins.`,

  (c) => `${c.region === "bruxelles" ? "À Bruxelles, le système de certificats verts BRUGEL reste actif en 2026 : 2,055 CV/MWh pour les installations ≤ 5 kWc. Pour une installation de 5 kWc, cela représente ~700 à 1 000€ de revenus annuels pendant 10 ans." : "En Wallonie, les certificats verts ont été supprimés pour les nouvelles installations résidentielles depuis le 1er janvier 2024 (source : CWaPE). La rentabilité à " + c.name + " repose désormais sur l'autoconsommation (~0,35€/kWh évité) et le Rénoprêt à taux 0%."}`,

  (c) => `La neige sur les panneaux solaires ? À ${c.name}, la couverture neigeuse ne dépasse en moyenne que 15 à 20 jours par an. L'impact sur la production annuelle est inférieur à 2%. De plus, les panneaux inclinés se déneigent naturellement grâce à leur surface lisse et à la chaleur résiduelle des cellules.`,
];

/* ─── FAQ POOL (8+ questions, 4 sélectionnées par hash) ─── */

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_POOL: ((c: CommuneEnriched) => FAQItem)[] = [
  (c) => ({
    question: `Quelles sont les aides financières pour le solaire à ${c.name} ?`,
    answer: `Les habitants de ${c.name} (${c.postCode}) ont accès à ${c.region === "bruxelles" ? "des certificats verts BRUGEL (2,055 CV/MWh pour ≤ 5 kWc, soit ~700–1 000€/an), au prêt vert Ecoreno (max 25 000€ à taux réduit), et potentiellement à des primes communales supplémentaires" : "au Rénoprêt à taux 0% (max 60 000€), à la TVA réduite à 6% pour les logements de plus de 10 ans, et à un tarif d'injection négocié avec leur fournisseur pour l'électricité injectée — les CV sont supprimés pour les nouvelles installations wallonnes depuis jan. 2024"}. La priorité est de maximiser l'autoconsommation pour rentabiliser votre installation.`,
  }),

  (c) => ({
    question: `Combien produit une installation solaire à ${c.name} ?`,
    answer: `Avec une irradiance de ${c.irradianceKwh} kWh/m²/an à ${c.name}, une installation standard de 6 kWc (16 panneaux) produit environ **${c.productionAnnuelle6kWc.toLocaleString("fr-BE")} kWh par an**. C'est suffisant pour couvrir 80 à 100% de la consommation annuelle d'un ménage de 4 personnes (3 500-4 500 kWh/an). La production varie selon l'orientation de votre toiture (idéalement plein sud) et son inclinaison (30-35° optimal).`,
  }),

  (c) => ({
    question: `Quel est le retour sur investissement du solaire à ${c.name} ?`,
    answer: `À ${c.name}, le retour sur investissement moyen pour une installation de 6 kWc est de **${c.roiAnnees} ans**, en tenant compte des aides régionales disponibles ${c.region === "bruxelles" ? "(certificats verts BRUGEL + compensation réseau)" : "(Rénoprêt, TVA 6%, autoconsommation)"} et de l'économie sur votre facture (~${c.economieAnnuelle.toLocaleString("fr-BE")}€/an). Après cette période, l'électricité produite est gratuite pendant encore 17 à 20 ans (durée de vie garantie des panneaux : 25 ans minimum).`,
  }),

  (c) => ({
    question: `Faut-il un permis d'urbanisme à ${c.name} pour installer des panneaux solaires ?`,
    answer: `Dans la grande majorité des cas, l'installation de panneaux solaires sur un toit existant à ${c.name} ne nécessite **aucun permis d'urbanisme**. ${c.region === "bruxelles" ? "En Région bruxelloise" : "En Wallonie"}, cette dispense s'applique tant que les panneaux sont intégrés ou posés en surimposition sans dépasser le faîte du toit. Exception : les bâtiments classés ou situés dans un périmètre protégé nécessitent un avis préalable.`,
  }),

  (c) => ({
    question: `Qui est le gestionnaire de réseau à ${c.name} ?`,
    answer: `Le gestionnaire de réseau de distribution (GRD) à ${c.name} est **${c.grd.nom}**. C'est ${c.grd.nom} qui assure le raccordement de votre installation au réseau électrique, l'installation du compteur bidirectionnel et le suivi de votre production. Vous pouvez contacter ${c.grd.nom} directement via leur site web pour initier la demande de raccordement.`,
  }),

  (c) => ({
    question: `Quelle est la meilleure orientation pour les panneaux solaires à ${c.name} ?`,
    answer: `À ${c.name} (latitude ${c.lat.toFixed(1)}°N), l'orientation optimale des panneaux est **plein sud** avec une inclinaison de **30 à 35°**. Cependant, les orientations sud-est et sud-ouest restent très performantes (90-95% du rendement optimal). Même une orientation est ou ouest offre encore 80-85% du rendement maximal, ce qui reste rentable. Les toitures plates permettent d'utiliser des supports orientables pour atteindre l'inclinaison idéale.`,
  }),

  (c) => ({
    question: `Combien coûte une installation solaire à ${c.name} en 2026 ?`,
    answer: `En 2026, le prix moyen d'une installation photovoltaïque résidentielle à ${c.name} est de **1 200 à 1 600€ par kWc installé**, pose comprise. Pour une installation standard de 6 kWc (16 panneaux), comptez entre **7 200€ et 9 600€ TTC** (TVA 6% si logement > 10 ans). Ce montant est à mettre en perspective avec l'économie annuelle de ${c.economieAnnuelle.toLocaleString("fr-BE")}€ et le retour sur investissement de ${c.roiAnnees} ans.`,
  }),

  (c) => ({
    question: `Les panneaux solaires fonctionnent-ils en hiver à ${c.name} ?`,
    answer: `Oui, les panneaux solaires produisent de l'électricité toute l'année à ${c.name}, y compris en hiver et par temps nuageux. La production hivernale est certes plus faible (environ 15-20% de la production annuelle se fait entre novembre et février), mais elle n'est jamais nulle. Les panneaux fonctionnent grâce à la luminosité, pas à la chaleur. Paradoxalement, les cellules photovoltaïques sont même légèrement plus efficaces par temps froid.`,
  }),

  (c) => ({
    question: `Puis-je installer une batterie domestique à ${c.name} ?`,
    answer: `Oui, l'installation d'une batterie domestique à ${c.name} est tout à fait possible et de plus en plus courante. Une batterie de 5-10 kWh (budget : 4 000-8 000€) permet de stocker l'excédent de production solaire de la journée pour le consommer le soir. À ${c.name}, cela peut faire passer votre taux d'autoconsommation de 30% à plus de 70%. ${c.region === "wallonie" ? "En Wallonie, l'ajout d'une batterie permet aussi de réduire l'impact du tarif prosumer." : "À Bruxelles, la batterie optimise la valeur de votre production au-delà du mécanisme de compensation."}`,
  }),

  (c) => ({
    question: `Comment choisir un installateur de panneaux solaires à ${c.name} ?`,
    answer: `Pour votre installation à ${c.name}, privilégiez un installateur **certifié ${c.region === "bruxelles" ? "RESCert PV agréé par la Région bruxelloise (obligatoire depuis jan. 2026 pour les certificats verts BRUGEL)" : "Rescert (label recommandé en Wallonie)"}**. Comparez systématiquement au moins 3 devis. Vérifiez : l'ancienneté de l'entreprise, les avis clients, la garantie décennale, et le SAV proposé. Les installateurs locaux de la zone ${c.postCode} connaissent les spécificités du réseau ${c.grd.nom} et les démarches administratives locales.`,
  }),
];

/* ─── FONCTIONS PUBLIQUES ─── */

export function getIntro(c: CommuneEnriched): string {
  const idx = hashString(c.slug + c.postCode.toString()) % INTROS.length;
  return INTROS[idx](c);
}

export function getSaviezVous(c: CommuneEnriched): string {
  // Sélectionner 2 items uniques
  const h = hashString(c.slug + "saviez");
  const idx1 = h % SAVIEZ_VOUS_POOL.length;
  const idx2 = (h + 3) % SAVIEZ_VOUS_POOL.length;
  return SAVIEZ_VOUS_POOL[idx1](c) + "\n\n" + SAVIEZ_VOUS_POOL[idx2 === idx1 ? (idx1 + 1) % SAVIEZ_VOUS_POOL.length : idx2](c);
}

export function getFAQItems(c: CommuneEnriched): FAQItem[] {
  const h = hashString(c.slug + "faq");
  const indices: number[] = [];
  let offset = 0;

  while (indices.length < 5 && offset < 20) {
    const idx = (h + offset * 7) % FAQ_POOL.length;
    if (!indices.includes(idx)) {
      indices.push(idx);
    }
    offset++;
  }

  return indices.map(i => FAQ_POOL[i](c));
}

export function getPostCodesLabel(slug: string): string {
  const codes = getAllPostCodes(slug);
  if (codes.length <= 1) return codes[0]?.toString() || "";
  if (codes.length <= 3) return codes.join(", ");
  return `${codes[0]}–${codes[codes.length - 1]}`;
}

/* ─── SECTION ESTIMATION SOLAIRE ─── */

export function getEstimationSolaire(c: CommuneEnriched) {
  return {
    irradiance: c.irradianceKwh,
    production6kWc: c.productionAnnuelle6kWc,
    economie: c.economieAnnuelle,
    roi: c.roiAnnees,
    co2Evite: Math.round(c.productionAnnuelle6kWc * 0.187), // 187g CO2/kWh mix belge
  };
}
