import Link from "next/link";

const fd = { fontFamily: "var(--font-display), sans-serif" };
const fh = { fontFamily: "var(--font-heading), sans-serif" };
const fb = { fontFamily: "var(--font-body), sans-serif" };

const columns = [
  {
    title: "Services",
    links: [
      { href: "/services#strategy", label: "AI Consulting" },
      { href: "/services#agents", label: "AI Agents" },
      { href: "/services#development", label: "Custom AI Dev" },
      { href: "/services#websites", label: "Website Design" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/audit", label: "Free Website Audit" },
      { href: "/services", label: "How We Work" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-obsidian overflow-hidden">
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-20 lg:pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_1fr] gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span className="text-xl font-extrabold text-white tracking-tight" style={fd}>
                Lone <span className="text-gold">&amp;</span> Co
              </span>
            </Link>
            <p className="text-xs text-white/25 mt-3 leading-relaxed max-w-[200px]" style={fb}>
              AI consulting for UK businesses. Based in London.
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-[.6rem] font-semibold tracking-[.2em] uppercase text-gold mb-5" style={fh}>
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/35 hover:text-white transition-colors"
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

      {/* Giant text */}
      <div className="border-t border-white/[.06] py-10 lg:py-14 text-center pointer-events-none select-none">
        <p
          className="whitespace-nowrap text-[2rem] sm:text-[3rem] lg:text-[4.5rem] font-extrabold leading-none tracking-tighter text-gold/50 heading-upper"
          style={fd}
        >
          AI for the rest of us
        </p>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[.06]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20" style={fb}>
            &copy; 2026 Lone &amp; Co Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/20 hover:text-white/40 transition-colors" style={fb}>
              Terms and Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
