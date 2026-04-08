"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileCTA() {
  const pathname = usePathname();
  
  // Don't show the sticky CTA on the devis page itself since they are already there
  if (pathname === "/devis" || pathname === "/devis/") {
    return null;
  }

  return (
    <div className="mobile-sticky-cta">
      <Link href="/devis/" className="btn btn-accent btn-full" style={{ padding: "12px 16px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)", fontSize: "1rem" }}>
        ✦ Demander mes devis gratuits
      </Link>
    </div>
  );
}
