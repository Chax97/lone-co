"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/audit", label: "Free Website Audit" },
  { href: "/contact", label: "Contact" },
];

const fh = { fontFamily: "var(--font-heading), sans-serif" };

export default function Navigation() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setHidden(window.scrollY > window.innerHeight * 0.8);
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
          : "translate-y-0 opacity-100"
      }`}
    >
      <nav className="max-w-[1300px] mx-auto px-6 sm:px-10">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo — left */}
          <Link href="/" className="relative z-10 flex-shrink-0">
            <span className="brand-logo text-lg sm:text-xl text-white">
              L O N E{" "}
              <span className="brand-ampersand">&amp;</span>
              {" "}C O
              <span className="brand-dot" />
            </span>
          </Link>

          {/* Center pill — desktop nav */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-white/[.07] backdrop-blur-xl border border-white/[.08] rounded-2xl px-3 py-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-roll px-6 py-2 text-[.7rem] tracking-wider uppercase rounded-xl transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-white bg-white/[.08]"
                      : "text-white/50 hover:text-white"
                  }`}
                  style={fh}
                >
                  <span className="nav-roll-clip">
                    <span className="nav-roll-inner" data-text={link.label}>
                      {link.label}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right — CTA */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <a
              href="https://calendly.com/loneandco/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-5 py-2.5 bg-white text-navy text-[.7rem] font-semibold tracking-wider uppercase rounded-full hover:bg-gold transition-all"
              style={fh}
            >
              Let&apos;s talk
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors relative z-10"
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
          <div className="md:hidden bg-obsidian/95 backdrop-blur-xl border-t border-white/[.06] rounded-b-2xl py-6 px-2 -mx-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-5 py-3 text-sm tracking-wide rounded-xl transition-colors ${
                  pathname === link.href ? "text-gold bg-white/[.04]" : "text-white/50 hover:text-white"
                }`}
                style={fh}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <a
                href="https://calendly.com/loneandco/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-white text-navy text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold transition-colors"
                style={fh}
              >
                Let&apos;s talk
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
