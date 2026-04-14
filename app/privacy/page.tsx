import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Lone & Co",
  description: "How Lone & Co collects, uses, and protects your personal data.",
};

export default function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const font = {
    serif: { fontFamily: "var(--font-display), serif" },
    sans: { fontFamily: "var(--font-body), sans-serif" },
    mono: { fontFamily: "var(--font-heading), sans-serif" },
  };

  return (
    <>
      <section className="bg-obsidian pt-40 pb-16 lg:pt-52 lg:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />
        <div className="hidden lg:block absolute pointer-events-none" style={{
          top: "-10%", right: "-15%", width: "65%", height: "120%",
          background: "linear-gradient(160deg, var(--slate) 0%, #7B8AF7 40%, var(--slate) 100%)",
          clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          zIndex: 0,
        }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10">
          <p className="text-[.65rem] font-semibold tracking-[.2em] uppercase text-gold mb-4" style={font.mono}>Legal</p>
          <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-white leading-[1.05]" style={font.serif}>Privacy Policy</h1>
          <p className="text-white/40 text-sm mt-3" style={font.sans}>Last updated: {lastUpdated}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10" />
      </section>

      <section className="bg-[#FAF8F4] py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <div className="max-w-[680px] bg-white border border-[#E8E4DE] rounded-xl p-8 lg:p-12 space-y-8" style={font.sans}>

            <div>
              <h2 className="text-xl font-bold text-[#1E1E24] mb-3" style={font.serif}>Who we are</h2>
              <p className="text-sm text-[#404048]/70 leading-relaxed">
                Lone &amp; Co is a trading name of Lone &amp; Co Ltd, an AI consulting business based in London, United Kingdom. Our website is <a href="https://loneco.co.uk" className="text-[#C5A55A] underline">loneco.co.uk</a>. Email us at <a href="mailto:hello@loneco.co.uk" className="text-[#C5A55A] underline">hello@loneco.co.uk</a> with any questions about your data.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1E1E24] mb-3" style={font.serif}>What we collect</h2>
              <p className="text-sm text-[#404048]/70 leading-relaxed mb-2"><strong className="text-[#1E1E24]">Information you give us.</strong> Email address, website URL, and details you provide through our audit tool, contact form, or consultations.</p>
              <p className="text-sm text-[#404048]/70 leading-relaxed mb-2"><strong className="text-[#1E1E24]">Automatically collected.</strong> Pages visited, time on site, device and browser info, approximate location (city level). We use Google Analytics and Vercel Analytics.</p>
              <p className="text-sm text-[#404048]/70 leading-relaxed"><strong className="text-[#1E1E24]">Cookies.</strong> See the Cookies section below.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1E1E24] mb-3" style={font.serif}>Why we collect it</h2>
              <p className="text-sm text-[#404048]/70 leading-relaxed mb-2"><strong className="text-[#1E1E24]">To deliver our services.</strong> We use your email and URL to generate audit reports and send results.</p>
              <p className="text-sm text-[#404048]/70 leading-relaxed mb-2"><strong className="text-[#1E1E24]">Marketing emails.</strong> We may send occasional emails about our services. You can unsubscribe at any time.</p>
              <p className="text-sm text-[#404048]/70 leading-relaxed"><strong className="text-[#1E1E24]">To improve our website.</strong> Analytics data helps us understand what works. This data is aggregated.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1E1E24] mb-3" style={font.serif}>Cookies</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E8E4DE]">
                      <th className="py-2 pr-4 text-[#1E1E24] font-semibold text-xs" style={font.mono}>Cookie</th>
                      <th className="py-2 pr-4 text-[#1E1E24] font-semibold text-xs" style={font.mono}>Purpose</th>
                      <th className="py-2 pr-4 text-[#1E1E24] font-semibold text-xs" style={font.mono}>Type</th>
                      <th className="py-2 text-[#1E1E24] font-semibold text-xs" style={font.mono}>Duration</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#404048]/70">
                    <tr className="border-b border-[#E8E4DE]"><td className="py-2.5 pr-4 font-mono text-xs">lone_co_consent</td><td className="py-2.5 pr-4 text-xs">Remembers your cookie choice</td><td className="py-2.5 pr-4 text-xs">Essential</td><td className="py-2.5 text-xs">1 year</td></tr>
                    <tr className="border-b border-[#E8E4DE]"><td className="py-2.5 pr-4 font-mono text-xs">_ga, _ga_*</td><td className="py-2.5 pr-4 text-xs">Google Analytics</td><td className="py-2.5 pr-4 text-xs">Analytics</td><td className="py-2.5 text-xs">2 years</td></tr>
                    <tr><td className="py-2.5 pr-4 font-mono text-xs">va_*</td><td className="py-2.5 pr-4 text-xs">Vercel Analytics</td><td className="py-2.5 pr-4 text-xs">Analytics</td><td className="py-2.5 text-xs">Session</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-[#404048]/70 leading-relaxed mt-4">Analytics cookies only load after you click Accept. If you click Reject, none are set.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1E1E24] mb-3" style={font.serif}>Who we share data with</h2>
              <p className="text-sm text-[#404048]/70 leading-relaxed">We do not sell your data. We share data only with Google (analytics), Vercel (hosting), and our email platform. We do not share with any other third parties unless required by law.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1E1E24] mb-3" style={font.serif}>Your rights</h2>
              <p className="text-sm text-[#404048]/70 leading-relaxed">Under UK GDPR, you can ask what data we hold, ask us to correct or delete it, withdraw consent for marketing, object to processing, or request a portable copy. Email <a href="mailto:hello@loneco.co.uk" className="text-[#C5A55A] underline">hello@loneco.co.uk</a>. We respond within 30 days. You can also contact the ICO at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#C5A55A] underline">ico.org.uk</a>.</p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#1E1E24] mb-3" style={font.serif}>Changes</h2>
              <p className="text-sm text-[#404048]/70 leading-relaxed">We may update this policy. Significant changes will be made clear on our website.</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
