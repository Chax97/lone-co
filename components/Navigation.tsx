"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/audit", label: "Free Audit" },
  { href: "/contact", label: "Contact" },
];

const fd = { fontFamily: "var(--font-display), sans-serif" };
const fh = { fontFamily: "var(--font-heading), sans-serif" };

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        hidden
          ? "-translate-y-full opacity-0"
          : scrolled
          ? "bg-obsidian/95 backdrop-blur-md shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="group">
            <span className="text-xl font-extrabold tracking-tight text-white" style={fd}>
              Lone{" "}
              <span className="text-gold group-hover:text-gold-light transition-colors">&amp;</span>{" "}
              Co
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-wider uppercase transition-colors duration-200 ${
                  pathname === link.href ? "text-gold" : "text-white/50 hover:text-white"
                }`}
                style={fh}
              >
                {link.label}
              </Link>
            ))}

            {/* Highlighted CTA pill */}
            <div className={`ml-2 flex items-center gap-1 rounded-full border transition-all duration-300 ${
              scrolled
                ? "bg-white/5 border-white/10 p-1"
                : "bg-transparent border-transparent p-1"
            }`}>
              <Link
                href="/contact"
                className="px-5 py-2 bg-gold hover:bg-gold-light text-navy text-xs font-semibold tracking-wider uppercase rounded-full transition-all"
                style={fh}
              >
                Let&apos;s talk
              </Link>
              <Link
                href="/audit"
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all ${
                  scrolled
                    ? "text-white/50 hover:text-white"
                    : "text-white/30 hover:text-white/60"
                }`}
                style={fh}
              >
                Free audit
              </Link>
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-obsidian border-t border-white/[.06] py-6 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm tracking-wide rounded transition-colors ${
                  pathname === link.href ? "text-gold bg-gold/5" : "text-white/50 hover:text-white"
                }`}
                style={fh}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 px-4 flex gap-2">
              <Link href="/contact" className="flex-1 text-center px-5 py-3 bg-gold hover:bg-gold-light text-navy text-xs font-semibold tracking-wider uppercase rounded-full transition-colors" style={fh}>
                Let&apos;s talk
              </Link>
              <Link href="/audit" className="flex-1 text-center px-5 py-3 border border-white/15 text-white/50 text-xs font-semibold tracking-wider uppercase rounded-full transition-colors hover:text-white" style={fh}>
                Free audit
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
