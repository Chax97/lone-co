import Link from "next/link";

const fd = { fontFamily: "var(--font-display), serif" };
const fh = { fontFamily: "var(--font-heading), sans-serif" };
const fb = { fontFamily: "var(--font-body), sans-serif" };

export default function Footer() {
  return (
    <footer className="bg-obsidian">
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-20 lg:pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-20">
          {/* Left — CTA card */}
          <div className="bg-white/[.03] border border-white/[.06] rounded-2xl p-8 sm:p-10 lg:p-12">
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-semibold text-white leading-[1.12]" style={fd}>
              Chat with an
              <br />
              AI <span className="text-slate">expert</span>
            </h2>
            <p className="text-sm text-white/40 leading-relaxed mt-5 max-w-[340px]" style={fb}>
              Transform your business operations with intelligent AI systems built for the way you work.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 bg-slate text-white text-sm font-semibold tracking-wide rounded-full hover:bg-slate/80 transition-all shadow-lg shadow-slate/20"
                style={fh}
              >
                Book a Demo
                <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* Right — nav + connect */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {/* Navigation */}
            <div>
              <p className="text-[.6rem] font-semibold tracking-[.2em] uppercase text-white/30 mb-6" style={fh}>
                Navigation
              </p>
              <ul className="space-y-3.5">
                {[
                  { href: "/", label: "Home" },
                  { href: "/services", label: "Services" },
                  { href: "/audit", label: "Free Audit" },
                  { href: "/contact", label: "Contact" },
                  { href: "/privacy", label: "Privacy" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                      style={fb}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <p className="text-[.6rem] font-semibold tracking-[.2em] uppercase text-white/30 mb-6" style={fh}>
                Connect
              </p>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href="https://www.linkedin.com/company/loneandco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors"
                    style={fb}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/loneandco"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors"
                    style={fb}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@loneco.co.uk"
                    className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors"
                    style={fb}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    Email
                  </a>
                </li>
              </ul>
            </div>

            {/* Let's talk pill — top right on larger screens */}
            <div className="hidden sm:flex justify-end">
              <Link
                href="/contact"
                className="group self-start inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-navy text-[.7rem] font-semibold tracking-wider uppercase rounded-full hover:bg-gold-light transition-all"
                style={fh}
              >
                Let&apos;s talk
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[.06]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="brand-logo text-xs text-white/40">
              L O N E{" "}
              <span className="brand-ampersand">&amp;</span>
              {" "}C O
              <span className="brand-dot" />
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-[.65rem] text-white/20" style={fb}>
            &copy; 2026 Lone &amp; Co Ltd. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex gap-5">
            <Link href="/privacy" className="text-[.65rem] text-white/20 hover:text-white/40 transition-colors" style={fb}>
              Privacy
            </Link>
            <Link href="/privacy" className="text-[.65rem] text-white/20 hover:text-white/40 transition-colors" style={fb}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
