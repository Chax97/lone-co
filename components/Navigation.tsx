"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/audit", label: "Free Audit" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScroll = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 30);
      if (Math.abs(y - lastScroll.current) < 10) return;
      setVisible(y < lastScroll.current || y < 80);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const font = {
    serif: { fontFamily: "var(--font-playfair), Georgia, serif" },
    mono: { fontFamily: "var(--font-montserrat), 'Helvetica Neue', Arial, sans-serif" },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${atTop ? "bg-transparent" : "bg-obsidian/95 backdrop-blur-md"}`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="group">
            <span className="text-xl font-bold tracking-wide text-white" style={font.serif}>
              Lone{" "}
              <span className="text-gold group-hover:text-gold-light transition-colors">&amp;</span>{" "}
              Co
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[.8rem] tracking-wide transition-colors duration-200 ${
                  pathname === link.href ? "text-gold" : "text-white/50 hover:text-white"
                }`}
                style={font.mono}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2 bg-gold hover:bg-gold-light text-navy text-[.8rem] font-semibold tracking-wide rounded transition-colors"
              style={font.mono}
            >
              Let&apos;s talk
            </Link>
          </div>

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

        {mobileOpen && (
          <div className="md:hidden bg-obsidian border-t border-white/[.06] py-6 px-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 text-sm tracking-wide rounded transition-colors ${
                  pathname === link.href ? "text-gold bg-gold/5" : "text-white/50 hover:text-white"
                }`}
                style={font.mono}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 px-4">
              <Link href="/contact" className="block w-full text-center px-5 py-3 bg-gold hover:bg-gold-light text-navy text-sm font-semibold tracking-wide rounded transition-colors" style={font.mono}>
                Let&apos;s talk
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
