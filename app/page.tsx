import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Lone & Co — AI Consulting for UK Businesses",
  description: "We help UK businesses figure out where AI actually makes sense — and then we build it. Based in London.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lone & Co",
  url: "https://loneco.co.uk",
  description: "AI consultancy helping UK SMEs implement practical AI solutions.",
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  contactPoint: { "@type": "ContactPoint", email: "hello@loneandco.co.uk", contactType: "customer service" },
  foundingDate: "2026",
  areaServed: "GB",
};

const services = [
  {
    num: "01",
    title: "AI Chatbot Integration",
    desc: "We build chatbots trained on your actual business. Your products, your FAQs, your tone. They answer questions at 2am, capture leads, and book appointments. The ones we build typically handle 60 to 70% of incoming queries without a human getting involved.",
    price: "From £1,950",
    href: "/services#chatbot",
  },
  {
    num: "02",
    title: "Website Optimisation",
    desc: "Before any AI tools work properly, the foundations need to be right. We fix performance, sort out SEO, set up structured data, and make sure your site works on every device. Then we make it ready for AI integration.",
    price: "From £2,500",
    href: "/services#optimisation",
  },
  {
    num: "03",
    title: "AI Strategy & Custom Solutions",
    desc: "You know AI could help somewhere but you are not sure where. We spend time understanding how your business runs, find the places where AI saves the most time or money, and give you a plan you can act on. No jargon. No 80 page decks.",
    price: "Bespoke",
    href: "/contact",
  },
];

const steps = [
  { num: "01", title: "We talk", desc: "30 minutes. You tell us about your business, we listen. No pitch, no obligation." },
  { num: "02", title: "We scope it", desc: "A proposal with a fixed price and clear timeline. If it does not make sense, no hard feelings." },
  { num: "03", title: "We build it", desc: "Short sprints, weekly check ins. You see progress as it happens." },
  { num: "04", title: "We hand it over", desc: "Documentation, training, and three months of support. You own everything." },
];

export default function HomePage() {
  const f = {
    serif: { fontFamily: "var(--font-playfair), Georgia, serif" },
    sans: { fontFamily: "var(--font-inter), 'Helvetica Neue', Arial, sans-serif" },
    mono: { fontFamily: "var(--font-montserrat), 'Helvetica Neue', Arial, sans-serif" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      {/* ═══ HERO ═══ */}
      <section className="relative bg-navy min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0 opacity-[.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />

        <ScrollReveal className="relative max-w-[1200px] mx-auto px-6 sm:px-10 pb-20 pt-48 lg:pb-28 lg:pt-56 w-full">
          <p className="sr text-[.7rem] font-semibold tracking-[.2em] uppercase text-gold mb-8" style={f.mono}>
            AI Consulting · London
          </p>
          <h1 className="sr text-[2.8rem] sm:text-[4rem] lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight max-w-[900px]" style={f.serif}>
            We help small businesses make sense of AI.
          </h1>
          <div className="sr flex flex-col sm:flex-row sm:items-end justify-between gap-8 mt-16 lg:mt-24">
            <p className="text-[1rem] text-white/40 leading-relaxed max-w-[380px]" style={f.sans}>
              Most AI advice is built for companies with 500 employees. Yours has twelve. We bridge that gap.
            </p>
            <Link href="/contact" className="arrow-link inline-flex items-center gap-3 text-gold hover:text-gold-light transition-colors group" style={f.mono}>
              <span className="text-sm font-semibold tracking-wide">Let&apos;s talk</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l10 10M7 17h10V7" /></svg>
            </Link>
          </div>
        </ScrollReveal>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10" />
      </section>

      {/* ═══ INTRO ═══ */}
      <section className="bg-cream py-28 lg:py-40">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="max-w-[640px] ml-auto">
            <p className="sr text-[1.5rem] sm:text-[1.9rem] text-obsidian leading-[1.5] font-normal" style={f.serif}>
              We are a small AI consultancy in London. We work with businesses that have between 5 and 200 people. The ones that get overlooked by the big firms but still need proper advice.
            </p>
            <p className="sr text-sm text-warm-gray leading-relaxed mt-8" style={f.sans}>
              We do not sell AI for the sake of it. Sometimes we tell clients not to bother. That honesty is why they come back.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="bg-white border-t border-light-gray">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10 py-28 lg:py-40">
          <p className="sr text-[.7rem] font-semibold tracking-[.2em] uppercase text-gold mb-16" style={f.mono}>Services</p>

          <div className="sr-stagger">
            {services.map((s, i) => (
              <Link
                key={s.num}
                href={s.href}
                className={`sr service-row group block py-10 lg:py-14 ${i < services.length - 1 ? "border-b border-light-gray" : ""} ${i === 0 ? "border-t border-light-gray" : ""}`}
              >
                <div className="flex items-start gap-6 lg:gap-10">
                  <span className="text-sm text-gold font-semibold pt-1 flex-shrink-0" style={f.mono}>{s.num}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-12">
                      <h3 className="text-2xl lg:text-3xl font-bold text-obsidian group-hover:text-navy transition-colors" style={f.serif}>
                        {s.title}
                      </h3>
                      <span className="text-sm text-gold font-semibold flex-shrink-0 lg:pt-2" style={f.mono}>{s.price}</span>
                    </div>
                    <p className="text-sm text-warm-gray leading-relaxed mt-4 max-w-[560px]" style={f.sans}>
                      {s.desc}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-light-gray group-hover:text-gold transition-colors flex-shrink-0 mt-2 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7l10 10M7 17h10V7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ TICKER ═══ */}
      <section className="bg-navy py-6 overflow-hidden border-t border-gold/10">
        <div className="ticker-track flex whitespace-nowrap gap-16 items-center">
          {[...Array(2)].map((_, repeat) => (
            <div key={repeat} className="flex gap-16 items-center pr-16">
              {["Fixed prices", "Plain English", "No jargon", "UK focused", "GDPR compliant", "Honest advice", "Fixed prices", "Plain English", "No jargon", "UK focused", "GDPR compliant", "Honest advice"].map((text, i) => (
                <span key={`${repeat}-${i}`} className="flex items-center gap-4">
                  <span className="text-sm text-white/30 tracking-wide" style={f.mono}>{text}</span>
                  <span className="w-1 h-1 rounded-full bg-gold/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FREE AUDIT ═══ */}
      <section className="bg-cream py-28 lg:py-40 border-t border-light-gray">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="sr text-[.7rem] font-semibold tracking-[.2em] uppercase text-gold mb-5" style={f.mono}>Free tool</p>
              <h2 className="sr text-3xl sm:text-4xl lg:text-5xl font-bold text-obsidian leading-[1.1]" style={f.serif}>
                Not sure where you stand?
              </h2>
              <p className="sr text-sm text-warm-gray leading-relaxed mt-6 max-w-[380px]" style={f.sans}>
                Our free website audit runs 21 checks and tells you what is working, what is broken, and what is costing you customers. Takes about a minute.
              </p>
              <Link href="/audit" className="sr arrow-link inline-flex items-center gap-3 text-gold hover:text-gold-light transition-colors mt-8" style={f.mono}>
                <span className="text-sm font-semibold tracking-wide">Run your free audit</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l10 10M7 17h10V7" /></svg>
              </Link>
            </div>
            <div className="sr">
              <div className="border border-light-gray rounded-xl overflow-hidden bg-white">
                {["Security & compliance", "Search visibility", "Code health", "Loading speed", "Accessibility", "Modern standards"].map((item, i) => (
                  <div key={item} className={`flex items-center justify-between px-6 py-4 ${i < 5 ? "border-b border-light-gray" : ""}`}>
                    <span className="text-sm text-charcoal" style={f.sans}>{item}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/30" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section className="bg-white py-28 lg:py-40 border-t border-light-gray">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <p className="sr text-[.7rem] font-semibold tracking-[.2em] uppercase text-gold mb-5" style={f.mono}>How it works</p>
          <h2 className="sr text-3xl sm:text-4xl font-bold text-obsidian mb-20" style={f.serif}>
            Four steps. No surprises.
          </h2>
          <div className="sr-stagger grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-16">
            {steps.map((step) => (
              <div key={step.num} className="sr">
                <span className="text-sm text-gold font-semibold" style={f.mono}>{step.num}</span>
                <h3 className="text-xl font-bold text-obsidian mt-2 mb-3" style={f.serif}>{step.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed" style={f.sans}>{step.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ QUOTE ═══ */}
      <section className="bg-cream border-t border-light-gray">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10 py-24 lg:py-32">
          <div className="sr max-w-[520px]">
            <div className="w-10 h-[2px] bg-gold mb-10" />
            <p className="text-xl sm:text-2xl text-obsidian leading-relaxed italic" style={f.serif}>
              &ldquo;They recommended a smaller solution than we had budgeted for. It worked better than anything more expensive would have.&rdquo;
            </p>
            <p className="text-sm text-warm-gray mt-8" style={f.sans}>
              Marcus Trelawney, Director, Trelawney &amp; Sons Ltd
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ LET'S TALK CTA ═══ */}
      <section className="bg-navy py-32 lg:py-44 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />
        <ScrollReveal className="relative max-w-[1200px] mx-auto px-6 sm:px-10">
          <Link href="/contact" className="sr arrow-link group block">
            <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white leading-[1.05] group-hover:text-gold transition-colors duration-500" style={f.serif}>
              Let&apos;s talk.
              <svg className="inline-block w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 ml-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7l10 10M7 17h10V7" /></svg>
            </h2>
          </Link>
          <p className="sr text-sm text-white/30 mt-8 max-w-[340px]" style={f.sans}>
            30 minutes. No pressure. We will tell you honestly whether we think we can help.
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
