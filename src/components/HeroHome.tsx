"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span ref={ref}>{count.toLocaleString("fr-BE")}</span>;
}

export default function HeroHome() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__badge">🇧🇪 Guide officiel 2026</div>
          <h1 className="hero__title">
            Panneaux solaires en Belgique :<br />
            <em>toutes vos primes</em> en un coup d&apos;œil
          </h1>
          <p className="hero__subtitle">
            Wallonie, Bruxelles, Flandre : découvrez les aides, certificats verts
            et subsides disponibles dans votre commune. Comparez et recevez
            jusqu&apos;à 3 devis gratuits.
          </p>

          <div className="hero__counter">
            <div>
              <div className="hero__counter-label">Primes moyennes disponibles</div>
              <div className="hero__counter-value">
                <AnimatedCounter target={3247} />€
              </div>
            </div>
          </div>

          <div className="hero__actions">
            <Link href="/devis/" className="btn btn-accent btn-lg">
              ✦ Calculer mes primes
            </Link>
            <Link href="/guides/" className="btn btn-outline">
              📖 Nos guides
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <div
            className="hero__image"
            style={{
              width: "100%",
              maxWidth: 520,
              height: 380,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image 
              src="/home-hero.png" 
              alt="Maison avec panneaux solaires" 
              fill
              style={{ objectFit: "cover", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-xl)" }}
              priority
            />
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-value">5-7 ans</div>
              <div className="hero__stat-label">Retour sur invest.</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value">25 ans</div>
              <div className="hero__stat-label">Durée de vie</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
