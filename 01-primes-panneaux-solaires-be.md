# primes-panneaux-solaires.be — Project Spec

## Identité
- **Domaine** : `primes-panneaux-solaires.be`
- **Type** : EMD single-niche
- **Baseline** : Panneaux solaires — Primes, subsides et aides à l'installation en Belgique
- **Ton éditorial** : Conseiller énergie officiel. On parle kWc, certificats verts, tarif prosumer, compteur bidirectionnel, compensation. Ton institutionnel et rassurant, style "guichet énergie en ligne" : "Combien toucherez-vous de primes dans votre commune ?"
- **Persona** : Propriétaire belge maison individuelle, 35-60 ans, facture énergie > 200€/mois, veut comprendre ses AIDES avant de demander un devis. Budget 5 000-12 000€.

## Bobex
| Catégorie | type.id | CPL BEFR | aff |
|-----------|---------|----------|-----|
| Zonnepanelen / Panneaux solaires | `11364` | **25€** | `110530` |

> **25€/lead fixe.** Marché solaire belge en explosion (objectif wallon : +30% d'installations d'ici 2028). Le propriétaire qui cherche "primes panneaux solaires" est ultra-qualifié — il a déjà décidé, il veut juste maximiser son retour. Ticket moyen 6 000-12 000€ pose comprise.

## Stack technique
- **Framework** : Next.js 16 (App Router, TypeScript)
- **Styling** : Vanilla CSS / Tailwind minimal
- **Hébergement** : Cloudflare Pages (Static Export `output: 'export'`)
- **Données** : JSON statique (communes-be.json)
- **Monétisation** : Formulaire natif multi-étapes + Cloudflare Function proxy → Bobex API

---

## 🎨 Design System (UNIQUE — ÉNERGIE SOLAIRE / INSTITUTIONNEL)

### Typographie
- **Headings** : `Outfit` (moderne, géométrique, autoritaire)
- **Body** : `Source Sans 3` (lisible, accessible, gov-style)
- **Data/prix** : `JetBrains Mono` (pour les montants de primes)

### Palette
```css
--primary: #F59E0B;        /* Amber-500 — soleil */
--primary-light: #FFFBEB;  /* Amber-50 */
--secondary: #0EA5E9;      /* Sky-500 — ciel/énergie */
--accent: #10B981;         /* Emerald-500 — éco/validé */
--text: #1E293B;           /* Slate-800 */
--bg: #FFFBEB;             /* Amber-50 — fond solaire chaud */
--card-bg: #FFFFFF;
--region-wal: #E11D48;     /* Rose-600 — Wallonie */
--region-bxl: #6366F1;     /* Indigo-500 — Bruxelles */
--region-vl: #F59E0B;      /* Amber — Flandre */
```

### Layout Homepage
- **Hero** : Toit de maison belge avec panneaux solaires brillants sous un ciel bleu. Compteur de primes animé qui tourne (ex: "3 247€ de primes disponibles"). Fond ambre chaud, CTA vert proéminent.
- **Style** : Institutionnel et rassurant. Cards avec icônes solaires (soleil, certificat, calculatrice). Style "portail officiel redesigné", propre et factuel.
- **Icônes** : Heroicons outline, ambre + vert
- **Section separators** : Ligne dégradée ambre → transparent horizontale

### Style des composants
- **Cards** : `border-radius: 12px`, fond white, border-left 4px ambre, shadow-sm
- **Boutons CTA** : Rounded-lg, fond amber-500, text noir, hover bg-amber-600, icône Calculator
- **Badges** : "Wallonie" en rose, "Bruxelles" en indigo, "Flandre" en amber
- **Simulateur** : Widget "Combien de primes pour votre commune ?" (sélecteur code postal)
- **Footer** : Fond slate-900, accent amber-400, liens vers sources officielles (energie.wallonie.be)

---

## 📄 Template Page Commune (UNIQUE wording)

### Pattern titre H1
```
Primes panneaux solaires à {VILLE} ({CODE_POSTAL}) — Montants et conditions 2025
```

### Pattern intro (spintax)
```
Vous envisagez d'installer des panneaux solaires à {VILLE} ? {VARIANTE_INTRO}.
En {PROVINCE}, les propriétaires bénéficient de primes allant de {PRIME_MIN}€ à {PRIME_MAX}€
selon leur certificat PEB et la puissance installée.
```

Variantes intro :
1. "La Région Wallonne offre encore les primes les plus généreuses de Belgique pour le photovoltaïque"
2. "Avec le tarif prosumer et la fin du compteur qui tourne à l'envers, maximiser vos primes est plus important que jamais"
3. "Les installateurs certifiés de la zone {CODE_POSTAL} posent en moyenne 6 kWc par toiture résidentielle"
4. "Le solaire reste l'investissement énergétique au ROI le plus rapide : 5-7 ans en Belgique"

### Pattern CTA
```
Calculez vos primes solaires à {VILLE}
```

### Modules spécifiques
- **Calculateur primes** : "Votre code postal → montant estimé des primes disponibles"
- **Comparatif régions** : "Wallonie vs Bruxelles vs Flandre" (montants, conditions, délais)
- **Ensoleillement** : Carte d'ensoleillement de la zone avec kWh/m²/an
- **Checklist éligibilité** : "5 conditions pour obtenir vos primes solaires"
- **Timeline** : "De la demande au versement : les étapes administratives"

---

## Structure des pages

```
/                                  → Homepage (hero maison avec panneaux)
/devis                             → Formulaire natif Bobex (type.id 11364)
/primes-solaires/[slug]            → Pages communes (271)
/primes-wallonie                   → Guide primes Wallonie
/primes-bruxelles                  → Guide primes Bruxelles
/primes-flandre                    → Guide primes Flandre (FR)
/rentabilite                       → Simulateur de rentabilité
/guides + /guides/[slug]
/marques + /marques/[slug]
/faq · /mentions-legales
/sitemap.xml · /robots.txt · /llms.txt
```

## Guides piliers (8)
1. Primes panneaux solaires Wallonie 2025 : montants, conditions et démarches
2. Primes panneaux solaires Bruxelles 2025 : guide complet
3. Certificats verts en Belgique : fonctionnement et revenus
4. Compteur qui tourne à l'envers : fin du système, alternatives
5. Batterie domestique en Belgique : prix, primes et rentabilité
6. Autoconsommation solaire : maximiser ses économies
7. Tarif prosumer Wallonie : impact réel sur votre facture
8. Démarches administratives panneaux solaires : du permis au raccordement

## Marques
SunPower, LG Solar, Trina Solar, Jinko Solar, Canadian Solar, REC, Longi, Enphase (onduleurs)

## Maillage externe
- `prix-panneaux-belgique.be` → "comparez les prix d'installation dans votre commune"
- `comparatif-panneaux.be` → "quel panneau choisir ? Notre comparatif indépendant"
- `devis-photovoltaique-be.be` → "recevez 3 devis gratuits en 2 minutes"

---

## ⚡ Optimisation Cloudflare Pages

| Page | Route | Rendu | Config |
|------|-------|-------|--------|
| Homepage, Devis, FAQ, Mentions | statiques | **Statique** | `output: 'export'` |
| Guides + Marques | `/guides/[slug]`, `/marques/[slug]` | **SSG** | `generateStaticParams()` |
| **Pages communes** | `/primes-solaires/[slug]` | **SSG** | `generateStaticParams()` |

```tsx
// Toutes les pages sont statiques (export)
// next.config.ts
export default { output: 'export', images: { unoptimized: true } }
```

### Cloudflare Setup
```
DNS : CNAME @ → pages.dev | Proxy: ON
Custom domain dans Cloudflare Pages dashboard
Functions : /api/submit-lead → proxy Bobex API
```

### Repo : `baguettecroissant/primes-panneaux-solaires.be` → Cloudflare Pages auto-deploy → Coût = 0€
