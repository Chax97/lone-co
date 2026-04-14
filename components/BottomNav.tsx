"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const fh = { fontFamily: "var(--font-heading), sans-serif" };

const links = [
  {
    href: "/",
    label: "Home",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />,
  },
  { href: "/services", label: "Services" },
  { href: "/audit", label: "Free Audit" },
  { href: "/contact", label: "Contact" },
];

export default function BottomNav() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-12 opacity-0 pointer-events-none"
      }`}
    >
      <nav className="flex items-center gap-1 bg-obsidian/90 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 shadow-2xl shadow-black/30">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 sm:px-5 py-2.5 text-[.7rem] sm:text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-gold text-navy"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
              style={fh}
            >
              {link.icon ? (
                <>
                  <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {link.icon}
                  </svg>
                  <span className="hidden sm:inline">{link.label}</span>
                </>
              ) : (
                <span>{link.label}</span>
              )}
            </Link>
          );
        })}
        <a
          href="https://calendly.com/loneandco/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 px-5 sm:px-6 py-2.5 bg-gold text-navy text-[.7rem] sm:text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold-light transition-all"
          style={fh}
        >
          Let&apos;s talk
        </a>
      </nav>
    </div>
  );
}
