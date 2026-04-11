import Link from "next/link";

export default function Footer() {
  const font = {
    serif: { fontFamily: "var(--font-playfair), Georgia, serif" },
    sans: { fontFamily: "var(--font-inter), 'Helvetica Neue', Arial, sans-serif" },
    mono: { fontFamily: "var(--font-montserrat), 'Helvetica Neue', Arial, sans-serif" },
  };

  return (
    <footer className="bg-obsidian text-white/40">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12">
          <div>
            <Link href="/" className="group inline-block">
              <span className="text-2xl font-bold tracking-wide text-white/80" style={font.serif}>
                Lone <span className="text-gold">&amp;</span> Co
              </span>
            </Link>
            <p className="text-sm text-white/25 mt-3 max-w-[280px] leading-relaxed" style={font.sans}>
              AI consulting for UK businesses. Based in London. We help you figure out where AI makes sense.
            </p>
          </div>

          <div>
            <p className="text-[.7rem] font-semibold tracking-[.15em] uppercase text-gold mb-5" style={font.mono}>Navigate</p>
            <div className="space-y-3">
              {[
                { href: "/services", label: "Services" },
                { href: "/audit", label: "Free Audit" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-white/35 hover:text-white/70 transition-colors" style={font.sans}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[.7rem] font-semibold tracking-[.15em] uppercase text-gold mb-5" style={font.mono}>Contact</p>
            <a href="mailto:hello@loneco.co.uk" className="block text-sm text-white/35 hover:text-gold transition-colors mb-3" style={font.sans}>hello@loneco.co.uk</a>
            <p className="text-sm text-white/25" style={font.sans}>London, United Kingdom</p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/20" style={font.sans}>&copy; 2026 Lone &amp; Co Ltd. All rights reserved.</p>
          <Link href="/privacy" className="text-xs text-white/20 hover:text-white/40 transition-colors" style={font.sans}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
