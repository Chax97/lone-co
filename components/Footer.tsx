import Link from "next/link";

const fd = { fontFamily: "var(--font-display), sans-serif" };
const fh = { fontFamily: "var(--font-heading), sans-serif" };
const fb = { fontFamily: "var(--font-body), sans-serif" };

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services#chatbot", label: "AI Chatbots" },
      { href: "/services#optimisation", label: "Website Optimisation" },
      { href: "/services#strategy", label: "AI Strategy" },
      { href: "/audit", label: "Free Website Audit" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/audit", label: "Website Audit Tool" },
      { href: "/services", label: "How We Work" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "mailto:hello@loneco.co.uk", label: "hello@loneco.co.uk" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-light-gray">
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12 lg:gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-xl font-extrabold text-obsidian tracking-tight" style={fd}>
                Lone <span className="text-gold">&amp;</span> Co
              </span>
            </Link>
            <p className="text-xs text-warm-gray mt-3 leading-relaxed max-w-[240px]" style={fb}>
              AI consulting for UK businesses.<br />
              Based in London.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[.65rem] font-semibold tracking-[.2em] uppercase text-obsidian mb-5" style={fh}>
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-warm-gray hover:text-obsidian transition-colors"
                      style={fb}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-light-gray">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-xs text-warm-gray" style={fb}>
              &copy; 2026 Lone &amp; Co Ltd. All rights reserved.
            </p>
            <Link href="/privacy" className="text-xs text-warm-gray hover:text-obsidian transition-colors" style={fb}>
              Privacy Policy
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            <a href="https://www.linkedin.com/company/loneandco" target="_blank" rel="noopener noreferrer" className="text-warm-gray hover:text-obsidian transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://twitter.com/loneandco" target="_blank" rel="noopener noreferrer" className="text-warm-gray hover:text-obsidian transition-colors" aria-label="X">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
