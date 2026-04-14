import Link from "next/link";

const fd = { fontFamily: "var(--font-display), serif" };
const fh = { fontFamily: "var(--font-heading), sans-serif" };
const fb = { fontFamily: "var(--font-body), sans-serif" };

export default function Footer() {
  return (
    <footer className="bg-obsidian">
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-20 lg:pt-28 pb-12">
        {/* Single card spanning full width */}
        <div className="bg-white/[.03] border border-white/[.06] rounded-2xl px-10 sm:px-12 lg:px-16 py-10 lg:py-14 relative overflow-hidden">
          {/* Diagonal accent shapes */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-[20%] -right-[15%] w-[70%] h-[70%] bg-slate/[.04] rotate-[25deg] rounded-3xl" />
            <div className="absolute -bottom-[25%] -right-[10%] w-[60%] h-[60%] bg-slate/[.03] rotate-[25deg] rounded-3xl" />
            <div className="absolute -bottom-[15%] -left-[20%] w-[50%] h-[40%] bg-white/[.02] rotate-[-15deg] rounded-3xl" />
          </div>

          {/* Content row */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 h-full">
            {/* Left — CTA */}
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold text-white leading-[1.08]" style={fd}>
                  Chat with an
                  <br />
                  AI <span className="text-slate">expert</span>
                </h2>
                <p className="text-sm sm:text-base text-white/40 leading-relaxed mt-6 max-w-[360px]" style={fb}>
                  Transform your business operations with intelligent AI systems built for the way you work.
                </p>
              </div>
              <div className="mt-10">
                <a
                  href="https://calendly.com/loneandco/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 bg-slate text-white text-sm font-semibold tracking-wide rounded-full hover:bg-slate/80 transition-all shadow-lg shadow-slate/20"
                  style={fh}
                >
                  Book a Demo
                  <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            {/* Right — Navigation */}
            <div className="flex items-start">
              <div>
                <p className="text-[.6rem] font-semibold tracking-[.2em] uppercase text-white/30 mb-6" style={fh}>
                  Navigation
                </p>
                <ul className="space-y-4">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/services", label: "Services" },
                    { href: "/audit", label: "Free Audit" },
                    { href: "/contact", label: "Contact" },
                    { href: "/privacy", label: "Privacy" },
                    { href: "/terms", label: "Terms" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-base font-medium text-white hover:text-gold transition-colors"
                        style={fb}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[.06]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="brand-logo text-sm text-white/60">
              L O N E{" "}
              <span className="brand-ampersand">&amp;</span>
              {" "}C O
              <span className="brand-dot" />
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-xs text-white/30" style={fb}>
            2026 Lone &amp; Co Ltd.
          </p>

          {/* Legal links */}
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors" style={fb}>
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors" style={fb}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
