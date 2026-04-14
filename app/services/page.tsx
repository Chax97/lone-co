import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Services — Lone & Co",
  description: "AI chatbot integration, website optimisation, and AI strategy for UK businesses. Fixed prices, plain English.",
};

const serviceDetails = [
  {
    id: "chatbot",
    num: "01",
    title: "AI Chatbot Integration",
    price: "From £1,950 · fixed price",
    dark: false,
    body: "A chatbot built around your business. Trained on your products, your policies, and the questions your customers actually ask. It handles enquiries, captures leads, and books appointments without anyone on your team needing to do a thing.",
    includes: ["Custom design and build", "Integrated into your existing website", "Lead capture and CRM connection", "Appointment booking", "Knowledge base setup", "30 day post launch support"],
  },
  {
    id: "optimisation",
    num: "02",
    title: "Website Optimisation",
    price: "From £2,500 · fixed price",
    dark: true,
    body: "Your website needs solid foundations before any AI tools will work properly. We fix what is broken, speed things up, and make sure Google can actually find and understand your business.",
    includes: ["Core Web Vitals performance fixes", "On page SEO audit and improvements", "Schema markup implementation", "Mobile first design review", "AI readiness technical setup", "Competitor benchmark report"],
  },
  {
    id: "strategy",
    num: "03",
    title: "AI Strategy & Custom Solutions",
    price: "Bespoke · scoped to your needs",
    dark: false,
    body: "You know AI could help your business somewhere, but you are not sure where. We spend time understanding your operations, find where AI would have the most impact, and build a plan that makes commercial sense.",
    includes: ["Business and process mapping", "AI opportunity assessment", "Prioritised roadmap with ROI estimates", "Vendor and technology recommendations", "Implementation support (optional)", "Ongoing advisory retainer (optional)"],
  },
];

const processSteps = [
  { num: "01", title: "Discovery Call", desc: "45 minutes to understand your business, goals, and where you think AI can help. Free, no obligation." },
  { num: "02", title: "Scoping & Proposal", desc: "A focused proposal with a fixed scope, fixed price, and clear timeline." },
  { num: "03", title: "Build & Iterate", desc: "Short sprints with regular check ins. You see progress weekly." },
  { num: "04", title: "Launch & Support", desc: "Full handover with documentation, training, and three months of post launch support." },
];

export default function ServicesPage() {
  const f = {
    serif: { fontFamily: "var(--font-display), serif" },
    sans: { fontFamily: "var(--font-body), sans-serif" },
    mono: { fontFamily: "var(--font-heading), sans-serif" },
  };

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="bg-obsidian pt-40 pb-24 lg:pt-52 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />
        <div className="hidden lg:block absolute pointer-events-none" style={{
          top: "-10%", right: "-15%", width: "65%", height: "120%",
          background: "linear-gradient(160deg, var(--slate) 0%, #7B8AF7 40%, var(--slate) 100%)",
          clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
          zIndex: 0,
        }} />
        <ScrollReveal className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10">
          <p className="sr-child text-[.7rem] font-semibold tracking-[.2em] uppercase text-gold mb-8" style={f.mono}>Services</p>
          <h1 className="sr-child text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05]" style={f.serif}>
            Three services.<br />Fixed prices.
          </h1>
          <p className="sr-child text-base text-white/40 leading-relaxed mt-8 max-w-[400px]" style={f.sans}>
            We keep things simple. You pick what you need, we tell you what it costs, and then we get on with it.
          </p>
        </ScrollReveal>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10" />
      </section>

      {/* ═══ SERVICE SECTIONS ═══ */}
      {serviceDetails.map((svc, idx) => (
        <section key={svc.id} id={svc.id} className={`${svc.dark ? "bg-obsidian" : idx % 2 === 0 ? "bg-cream" : "bg-white"} py-24 lg:py-36 border-t ${svc.dark ? "border-white/[.06]" : "border-light-gray"}`}>
          <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-24">
              <div>
                <span className="sr-child text-sm text-gold font-semibold" style={f.mono}>{svc.num}</span>
                <h2 className={`sr text-3xl sm:text-4xl font-bold mt-3 mb-3 leading-tight ${svc.dark ? "text-white" : "text-obsidian"}`} style={f.serif}>{svc.title}</h2>
                <p className="sr-child text-sm text-gold font-semibold" style={f.mono}>{svc.price}</p>
                <Link href="/contact" className="sr-child arrow-link inline-flex items-center gap-3 text-gold hover:text-gold-light transition-colors mt-8" style={f.mono}>
                  <span className="text-sm font-semibold tracking-wide">Enquire</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l10 10M7 17h10V7" /></svg>
                </Link>
              </div>
              <div>
                <p className={`sr text-sm leading-relaxed mb-8 ${svc.dark ? "text-white/60" : "text-charcoal"}`} style={f.sans}>{svc.body}</p>
                <div className="sr-stagger space-y-3">
                  {svc.includes.map((item) => (
                    <div key={item} className="sr-child flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      <span className={`text-sm ${svc.dark ? "text-white/40" : "text-warm-gray"}`} style={f.sans}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      ))}

      {/* ═══ PROCESS ═══ */}
      <section className="bg-navy py-28 lg:py-40">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <p className="sr-child text-[.7rem] font-semibold tracking-[.2em] uppercase text-gold mb-5" style={f.mono}>How we work</p>
          <h2 className="sr-child text-3xl sm:text-4xl font-bold text-white mb-20" style={f.serif}>Our Process</h2>
          <div className="sr-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((step) => (
              <div key={step.num} className="sr-child">
                <span className="text-sm text-gold font-semibold" style={f.mono}>{step.num}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3" style={f.serif}>{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed" style={f.sans}>{step.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

    </>
  );
}
