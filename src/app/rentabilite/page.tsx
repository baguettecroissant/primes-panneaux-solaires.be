"use client";
import { useState } from "react";
import Link from "next/link";

export default function RentabilitePage() {
  const [power, setPower] = useState(6);
  const [region, setRegion] = useState("wallonie");
  const [consumption, setConsumption] = useState(4000);
  const [orientation, setOrientation] = useState("sud");

  const orientationFactor = orientation === "sud" ? 1 : orientation === "sud-est" || orientation === "sud-ouest" ? 0.9 : orientation === "est" || orientation === "ouest" ? 0.8 : 0.7;
  const productionAnnuelle = Math.round(power * 950 * orientationFactor);
  const prixElec = 0.35;
  const economieSelf = Math.round(Math.min(productionAnnuelle, consumption) * prixElec);
  const coutInstall = power * 1200;
  
  let aideAnnuelle = 0;
  if (region === "wallonie") aideAnnuelle = Math.round(productionAnnuelle / 1000 * 65); // CV
  else if (region === "bruxelles") aideAnnuelle = Math.round(productionAnnuelle / 1000 * 180); // CV multiplié
  
  const economieTotaleAn = economieSelf + aideAnnuelle;
  const roiAns = Math.round(coutInstall / economieTotaleAn * 10) / 10;
  const gain25ans = Math.round(economieTotaleAn * 25 - coutInstall);

  return (
    <section className="section">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Accueil</Link>
          <span className="breadcrumb__sep">›</span>
          <span>Simulateur de rentabilité</span>
        </div>

        <h1>Simulateur de rentabilité solaire</h1>
        <p style={{ color: "var(--text-light)", marginTop: 8, marginBottom: 40, maxWidth: 640 }}>
          Estimez vos économies et votre retour sur investissement en fonction de votre situation.
        </p>

        <div className="calculator">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="power">Puissance (kWc)</label>
              <input id="power" type="range" min={2} max={15} step={0.5} value={power} onChange={(e) => setPower(Number(e.target.value))} />
              <div className="data-value" style={{ textAlign: "center", marginTop: 4 }}>{power} kWc</div>
            </div>
            <div className="form-group">
              <label htmlFor="conso">Consommation annuelle (kWh)</label>
              <input id="conso" type="range" min={1000} max={12000} step={500} value={consumption} onChange={(e) => setConsumption(Number(e.target.value))} />
              <div className="data-value" style={{ textAlign: "center", marginTop: 4 }}>{consumption.toLocaleString("fr-BE")} kWh</div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="regionCalc">Région</label>
              <select id="regionCalc" value={region} onChange={(e) => setRegion(e.target.value)}>
                <option value="wallonie">Wallonie</option>
                <option value="bruxelles">Bruxelles</option>
                <option value="flandre">Flandre</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="orient">Orientation toiture</label>
              <select id="orient" value={orientation} onChange={(e) => setOrientation(e.target.value)}>
                <option value="sud">Sud</option>
                <option value="sud-est">Sud-Est</option>
                <option value="sud-ouest">Sud-Ouest</option>
                <option value="est">Est</option>
                <option value="ouest">Ouest</option>
              </select>
            </div>
          </div>

          <div className="calculator__result">
            <div className="grid-3" style={{ textAlign: "center", gap: 16 }}>
              <div>
                <div className="calculator__result-label">Production annuelle</div>
                <div className="calculator__result-value" style={{ fontSize: "1.5rem" }}>{productionAnnuelle.toLocaleString("fr-BE")} kWh</div>
              </div>
              <div>
                <div className="calculator__result-label">Économie annuelle</div>
                <div className="calculator__result-value" style={{ fontSize: "1.5rem" }}>{economieTotaleAn.toLocaleString("fr-BE")}€</div>
              </div>
              <div>
                <div className="calculator__result-label">Retour sur invest.</div>
                <div className="calculator__result-value" style={{ fontSize: "1.5rem" }}>{roiAns} ans</div>
              </div>
            </div>

            <div style={{ marginTop: 24, padding: "16px 0", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
              <div className="calculator__result-label">Gain sur 25 ans</div>
              <div className="calculator__result-value">{gain25ans.toLocaleString("fr-BE")}€</div>
            </div>

            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: 12 }}>
              * Estimation indicative basée sur un prix d&apos;électricité de {prixElec}€/kWh et un coût d&apos;installation de ~1 200€/kWc.
            </p>
          </div>

          <div className="text-center mt-4">
            <Link href="/devis/" className="btn btn-accent btn-lg">✦ Obtenir un devis précis</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
