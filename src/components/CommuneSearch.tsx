"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import communes from "@/data/communes-be.json";

interface Commune {
  slug: string;
  name: string;
  postCode: number;
  municipality: string;
  province: string;
  region: string;
}

export default function CommuneSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const results = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase();
    return (communes as Commune[])
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.postCode.toString().startsWith(q) ||
          c.municipality.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  const handleSelect = (commune: Commune) => {
    setQuery("");
    setFocused(false);
    router.push(`/primes-solaires/${commune.slug}/`);
  };

  return (
    <div className="commune-search">
      <div className="commune-search__input-wrap">
        <span className="commune-search__icon">🔍</span>
        <input
          type="text"
          className="commune-search__input"
          placeholder="Votre code postal ou commune..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          id="commune-search"
          aria-label="Rechercher votre commune"
        />
      </div>
      {focused && results.length > 0 && (
        <div className="commune-search__results">
          {results.map((c) => (
            <button
              key={`${c.slug}-${c.postCode}`}
              className="commune-search__result"
              onMouseDown={() => handleSelect(c)}
            >
              <span className="commune-search__result-name">{c.name}</span>
              <span className="commune-search__result-code">{c.postCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
