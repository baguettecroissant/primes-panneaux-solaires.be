"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="header__logo">
          <span className="header__logo-icon">☀️</span>
          Primes <span>Solaires</span>
        </Link>

        <button
          className="header__mobile-btn"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>

        <nav className={`header__nav${open ? " open" : ""}`}>
          <Link href="/primes-wallonie/" onClick={() => setOpen(false)}>
            Wallonie
          </Link>
          <Link href="/primes-bruxelles/" onClick={() => setOpen(false)}>
            Bruxelles
          </Link>
          <Link href="/guides/" onClick={() => setOpen(false)}>
            Guides
          </Link>
          <Link href="/marques/" onClick={() => setOpen(false)}>
            Marques
          </Link>
          <Link href="/faq/" onClick={() => setOpen(false)}>
            FAQ
          </Link>
          <Link
            href="/devis/"
            className="btn btn-primary btn-sm header__cta"
            onClick={() => setOpen(false)}
          >
            ✦ Devis Gratuit
          </Link>
        </nav>
      </div>
    </header>
  );
}
