import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Lone & Co — AI Consulting for UK Businesses",
  description:
    "We help UK businesses figure out where AI actually makes sense — and then we build it. Based in London.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lone & Co",
  url: "https://loneco.co.uk",
  description: "AI consultancy helping UK SMEs implement practical AI solutions.",
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@loneandco.co.uk",
    contactType: "customer service",
  },
  foundingDate: "2026",
  areaServed: "GB",
};

const services = [
  {
    num: "01",
    title: "AI Chatbot Integration",
    desc: "A branded assistant trained on your business data to answer questions, qualify leads, and book appointments.",
    outcome: "Typical outcome: 60–70% fewer repetitive support questions.",
    href: "/services#chatbot",
  },
  {
    num: "02",
    title: "Website Optimisation",
    desc: "Faster load times, stronger SEO structure, cleaner UX, and technical fixes before adding AI layers.",
    outcome: "Typical outcome: better conversion rates and cleaner analytics.",
    href: "/services#optimisation",
  },
  {
    num: "03",
    title: "AI Strategy & Custom Builds",
    desc: "A plain-English implementation plan for where AI will actually save time or money in your operation.",
    outcome: "Typical outcome: fewer tools, clearer priorities, faster execution.",
    href: "/contact",
  },
];

const principles = [
  "No hype.",
  "No black-box retainers.",
  "Fixed prices where possible.",
  "Built for teams of 5–200.",
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

      <section className="relative min-h-screen bg-navy text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(197,165,90,0.22),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(197,165,90,0.1),transparent_40%)]" />

        <ScrollReveal className="relative max-w-[1280px] mx-auto px-6 sm:px-10 pt-36 pb-20 lg:pt-44 lg:pb-28">
          <p className="sr text-[.72rem] tracking-[0.22em] uppercase text-gold mb-10" style={f.mono}>
            Lone &amp; Co · London · AI Consulting
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="sr text-[2.9rem] sm:text-[4.3rem] lg:text-[6.2rem] leading-[0.98] font-semibold" style={f.serif}>
                Rebuilding how
                <br />
                smaller businesses
                <br />
                use AI.
              </h1>
            </div>
            <div className="lg:col-span-4 lg:pb-4">
              <p className="sr text-white/65 leading-relaxed text-[0.98rem] max-w-[360px]" style={f.sans}>
                We recreate enterprise-level thinking for SMEs: practical automation, better websites, and strategy that
                respects budget and headcount.
              </p>
            </div>
          </div>

          <div className="sr mt-16 lg:mt-24 flex flex-wrap items-center gap-4 lg:gap-6">
            <Link
              href="/contact"
              className="px-6 py-3 bg-gold hover:bg-gold-light text-navy rounded font-semibold text-sm tracking-wide transition-colors"
              style={f.mono}
            >
              Book a call
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 border border-white/20 hover:border-gold text-white rounded text-sm tracking-wide transition-colors"
              style={f.mono}
            >
              Explore services
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-cream border-t border-gold/20">
        <ScrollReveal className="max-w-[1280px] mx-auto px-6 sm:px-10 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <p className="sr text-[.72rem] tracking-[0.22em] uppercase text-gold mb-6" style={f.mono}>
                Built differently
              </p>
              <h2 className="sr text-4xl lg:text-5xl text-obsidian leading-[1.05]" style={f.serif}>
                We work like a studio, not a big consultancy.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="sr-stagger space-y-4">
                {principles.map((item, index) => (
                  <div key={item} className="sr border-b border-light-gray pb-4 flex items-start justify-between gap-6">
                    <p className="text-xl text-charcoal" style={f.serif}>
                      {item}
                    </p>
                    <span className="text-xs text-gold pt-2" style={f.mono}>
                      0{index + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-white border-t border-light-gray">
        <ScrollReveal className="max-w-[1280px] mx-auto px-6 sm:px-10 py-24 lg:py-36">
          <p className="sr text-[.72rem] tracking-[0.22em] uppercase text-gold mb-10" style={f.mono}>
            Core services
          </p>

          <div className="sr-stagger divide-y divide-light-gray border-y border-light-gray">
            {services.map((service) => (
              <Link key={service.num} href={service.href} className="sr group block py-10 lg:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  <span className="lg:col-span-1 text-sm text-gold font-semibold" style={f.mono}>
                    {service.num}
                  </span>
                  <div className="lg:col-span-5">
                    <h3 className="text-2xl lg:text-3xl text-obsidian group-hover:text-navy transition-colors" style={f.serif}>
                      {service.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-5 space-y-4">
                    <p className="text-sm text-warm-gray leading-relaxed" style={f.sans}>
                      {service.desc}
                    </p>
                    <p className="text-sm text-charcoal" style={f.sans}>
                      {service.outcome}
                    </p>
                  </div>
                  <div className="lg:col-span-1 flex lg:justify-end">
                    <svg
                      className="w-5 h-5 text-light-gray group-hover:text-gold transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M7 7l10 10M7 17h10V7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      <section className="bg-navy text-white border-t border-gold/20">
        <ScrollReveal className="max-w-[1280px] mx-auto px-6 sm:px-10 py-24 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <p className="sr text-[.72rem] tracking-[0.22em] uppercase text-gold mb-6" style={f.mono}>
                Free audit
              </p>
              <h2 className="sr text-4xl lg:text-6xl leading-[1.02]" style={f.serif}>
                Want a quick read on your current site?
              </h2>
              <p className="sr mt-8 text-white/65 max-w-[560px] leading-relaxed" style={f.sans}>
                Our free checker runs 21 practical tests across performance, SEO, accessibility, and trust signals. You
                get an immediate score and a clear action list.
              </p>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end lg:items-end">
              <Link
                href="/audit"
                className="sr inline-flex items-center gap-3 text-gold hover:text-gold-light transition-colors"
                style={f.mono}
              >
                <span className="text-sm tracking-wide font-semibold">Run your free audit</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l10 10M7 17h10V7" />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
