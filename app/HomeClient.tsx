"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}



const industries = [
  {
    title: "Estate Agents",
    body: "AI that answers property enquiries, qualifies buyers, and books viewings. Your team closes deals, not answers phones.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=1000&fit=crop&q=80",
    cta: "AI for estate agents",
  },
  {
    title: "Dental Practices",
    body: "Patients book, reschedule, and ask about treatments 24/7. No more missed calls during procedures.",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=1000&fit=crop&q=80",
    cta: "AI for dental practices",
  },
  {
    title: "Trades & Construction",
    body: "Capture leads from the van, collect job details, send quotes for standard work. Every enquiry handled.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1000&fit=crop&q=80",
    cta: "AI for trades businesses",
  },
  {
    title: "Professional Services",
    body: "Automate intake, qualify enquiries, update your CRM, and draft responses. Hours of admin handled in minutes.",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=1000&fit=crop&q=80",
    cta: "AI for professional services",
  },
];

const features = [
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />, title: "AI Agents", body: "Custom AI agents that handle enquiries, follow up leads, and run tasks 24/7." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />, title: "Workflow Automation", body: "Connect the tools you already use. Automate reports, emails, CRM updates, and scheduling." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />, title: "Custom AI Development", body: "Bespoke AI applications and integrations built around your specific business processes." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />, title: "Website Design & Build", body: "Fast, modern websites that convert visitors into customers. Built to be AI ready from day one." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />, title: "GDPR & Security First", body: "Every build follows UK data protection standards. Your data, your servers, your control." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />, title: "Rapid Delivery", body: "AI agents live in days. Websites in weeks. Strategy sessions with actionable outcomes same week." },
];

const services = [
  { num: "01", title: "AI Consulting & Strategy", price: "From £750", href: "/services#strategy" },
  { num: "02", title: "AI Agents & Automation", price: "From £1,950", href: "/services#agents" },
  { num: "03", title: "Custom AI Development", price: "Bespoke", href: "/services#development" },
  { num: "04", title: "Website Design & Development", price: "From £2,500", href: "/services#websites" },
];

/* ── Fonts shorthand ── */
const fd = { fontFamily: "var(--font-display), sans-serif" };
const fh = { fontFamily: "var(--font-heading), sans-serif" };
const fb = { fontFamily: "var(--font-body), sans-serif" };

/* ── Honeycomb video placeholder ── */
function HoneycombVideo() {
  return (
    <div className="relative w-[420px] h-[340px] rounded-2xl overflow-hidden border border-white/10 bg-white/[.03] flex items-center justify-center">
      <p className="text-xs text-white/20 tracking-widest uppercase" style={fh}>
        Video coming soon
      </p>
    </div>
  );
}

/* ── Hero with brand slide-in ── */
function HeroSection() {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const honeycombRef = useRef<HTMLDivElement>(null);
  const rotatingRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTime = 2800;
  const hasAnimated = useRef(false);

  const slides = [
    { text: "never clocks out", animation: "slideUp" },
    { text: "handles every call", animation: "slideUp" },
    { text: "qualifies every lead", animation: "slideUp" },
    { text: "scales without hiring", animation: "slideUp" },
  ];

  const animateIn = useCallback((el: HTMLElement, type: string) => {
    switch (type) {
      case "slideUp":
        gsap.fromTo(el, { y: 30, opacity: 0, scale: 1 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
        break;
      case "slideRight":
        gsap.fromTo(el, { y: 30, opacity: 0, scale: 1 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
        break;
      case "fadeScale":
        gsap.fromTo(el, { scale: 0.85, opacity: 0, y: 0 }, { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.4)" });
        break;
      default:
        gsap.fromTo(el, { y: 30, opacity: 0, scale: 1 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" });
    }
  }, []);

  const goToSlide = useCallback(
    (next: number) => {
      const rotating = rotatingRef.current;
      if (!rotating) return;
      if (intervalRef.current) clearTimeout(intervalRef.current);
      gsap.to(rotating, {
        y: -40, opacity: 0, duration: 0.3, ease: "power3.in",
        onComplete: () => {
          setActive(next);
          animateIn(rotating, slides[next].animation);
        },
      });
    },
    [animateIn, slides]
  );

  useEffect(() => {
    intervalRef.current = setTimeout(() => {
      goToSlide((active + 1) % slides.length);
    }, holdTime);
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
  }, [active, goToSlide, slides.length]);

  // Brand slide-in animation on mount
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const content = contentRef.current;
    const honeycomb = honeycombRef.current;
    if (!content) return;

    gsap.set(content, { y: 40, opacity: 0 });
    if (honeycomb) gsap.set(honeycomb, { x: 60, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(content, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
    if (honeycomb) {
      tl.to(honeycomb, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.6");
    }
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 bg-obsidian" />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 sm:px-10 pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
        {/* Two column: text + honeycomb */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-8 items-end">
          {/* Left: tagline + CTAs */}
          <div ref={contentRef}>
            <h2
              className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] font-extrabold text-white leading-[1.05] tracking-tight heading-upper"
              style={fd}
            >
              Your hardest worker
            </h2>
            <div className="overflow-hidden mt-1 min-h-[1.6rem] sm:min-h-[2rem] lg:min-h-[2.5rem]">
              <div ref={rotatingRef}>
                <span
                  className="text-[1.2rem] sm:text-[1.6rem] lg:text-[2rem] font-extrabold text-gold leading-[1] tracking-tight heading-upper whitespace-nowrap block"
                  style={fd}
                >
                  {slides[active].text}
                </span>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed mt-6 max-w-[400px]" style={fb}>
              AI agents that answer calls, qualify leads, book appointments, and follow up. Every enquiry handled. Every time.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-navy text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold transition-all hover:-translate-y-0.5"
                style={fh}
              >
                See how it works
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 border border-gold text-gold text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold hover:text-navy transition-all hover:-translate-y-0.5"
                style={fh}
              >
                Book free audit
              </Link>
            </div>
          </div>

          {/* Right: honeycomb video */}
          <div ref={honeycombRef} className="hidden lg:flex justify-end items-end">
            <HoneycombVideo />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10 z-10" />
    </section>
  );
}


/* ── Industry accordion ── */
function IndustryAccordion() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTime = 5000;

  const startTimer = useCallback(
    (index: number) => {
      if (intervalRef.current) clearTimeout(intervalRef.current);

      intervalRef.current = setTimeout(() => {
        const next = (index + 1) % industries.length;
        setActive(next);
        startTimer(next);
      }, holdTime);
    },
    []
  );

  useEffect(() => {
    startTimer(0);
    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [startTimer]);

  const handleClick = (i: number) => {
    setActive(i);
    startTimer(i);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">
      {/* Left: accordion */}
      <div>
        {industries.map((ind, i) => {
          const isActive = active === i;
          return (
            <div
              key={i}
              className="border-t border-white/10 last:border-b cursor-pointer"
              onClick={() => handleClick(i)}
            >
              <div className="py-5 flex items-center justify-between group">
                <h3
                  className={`text-base sm:text-lg font-bold transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                  }`}
                  style={fd}
                >
                  {ind.title}
                </h3>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isActive ? "text-gold rotate-180" : "text-white/20"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: isActive ? "200px" : "0px",
                  opacity: isActive ? 1 : 0,
                }}
              >
                <div className="pb-6">
                  <p className="text-sm text-white/50 leading-relaxed mb-5" style={fb}>
                    {ind.body}
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold text-gold text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold hover:text-navy transition-all"
                    style={fh}
                  >
                    {ind.cta}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Right: crossfading image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-obsidian hidden lg:block">
        {industries.map((ind, i) => (
          <Image
            key={i}
            src={ind.img}
            alt={ind.title}
            fill
            className={`object-cover transition-all duration-700 ease-in-out ${
              active === i ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            sizes="50vw"
            priority={i === 0}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Main ── */
export default function HomeClient() {

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <HeroSection />

      {/* ═══ WHAT SETS US APART ═══ */}
      <section className="bg-navy py-28 lg:py-44 border-t border-gold/10">
        <div className="max-w-[900px] mx-auto px-6 sm:px-10">
          <div className="bg-white/[.04] border border-white/[.06] rounded-3xl px-8 sm:px-14 lg:px-20 py-16 sm:py-20 lg:py-28 text-center">
            <TextReveal
              text="You spend hours on work AI handles in minutes. Lead follow ups, email responses, appointment booking, reporting, data entry. We build the AI that takes it off your plate so you focus on what actually grows the business."
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug tracking-tight"
              style={fd}
            />
            <div className="mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-navy text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold transition-all hover:-translate-y-0.5"
                style={fh}
              >
                See what we do
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="bg-obsidian py-24 lg:py-36">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="sr mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white heading-upper" style={fd}>
              The right AI for every industry
            </h2>
          </div>
          <div className="sr">
            <IndustryAccordion />
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="bg-white border-t border-light-gray py-24 lg:py-36 overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <ScrollReveal>
            <div className="sr text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian heading-upper" style={fd}>Smarter tools, less busywork</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className={`card-lift bg-cream rounded-2xl border border-light-gray p-8 text-center ${
                    i % 2 === 0 ? "sr-right" : "sr-left"
                  }`}
                >
                  <div className="feature-icon bg-navy text-gold mx-auto mb-5 rounded-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{feat.icon}</svg>
                  </div>
                  <h3 className="text-sm font-bold text-obsidian mb-2 uppercase tracking-wider" style={fh}>{feat.title}</h3>
                  <p className="text-sm text-warm-gray leading-relaxed" style={fb}>{feat.body}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SPLIT ═══ */}
      <section className="bg-cream border-t border-light-gray overflow-hidden">
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2">
          <div className="sr-left relative min-h-[400px] lg:min-h-0 overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop" alt="Business consultation" fill className="object-cover" sizes="50vw" />
          </div>
          <div className="sr-right px-6 sm:px-10 lg:px-16 py-20 lg:py-32 flex flex-col justify-center max-w-[520px]">
            <p className="text-xs font-semibold tracking-[.25em] uppercase text-gold mb-5" style={fh}>Our approach</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian leading-tight mb-5 heading-upper" style={fd}>
              Discover. Build. Scale.
            </h2>
            <p className="text-sm text-warm-gray leading-relaxed" style={fb}>
              Free 30 minute AI audit. We map your daily tasks, show you which ones AI can handle, and build the system. Live in days, not months. You see results at every step.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="bg-white border-t border-light-gray">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10 py-24 lg:py-36">
          <p className="sr text-xs font-semibold tracking-[.25em] uppercase text-gold mb-14 text-center" style={fh}>Services</p>
          <div className="sr-stagger">
            {services.map((s, i) => (
              <Link key={s.num} href={s.href} className={`sr-child service-row group block py-10 lg:py-12 ${i === 0 ? "border-t " : ""}border-b border-light-gray`}>
                <div className={`flex items-center gap-6 lg:gap-10 ${i % 2 === 0 ? "" : "lg:flex-row-reverse lg:text-right"}`}>
                  <span className="text-sm text-gold font-semibold flex-shrink-0" style={fh}>{s.num}</span>
                  <h3 className="text-lg lg:text-2xl font-bold text-obsidian group-hover:text-navy transition-colors flex-1 heading-upper" style={fd}>{s.title}</h3>
                  <span className="text-xs text-gold font-semibold flex-shrink-0 hidden sm:block tracking-wider uppercase" style={fh}>{s.price}</span>
                  <svg className="w-5 h-5 text-light-gray group-hover:text-gold transition-colors flex-shrink-0 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7l10 10M7 17h10V7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ BUILD WITH AI ═══ */}
      <section className="bg-navy py-24 lg:py-36 overflow-hidden">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-20 items-center">
            {/* Left: layered text + image */}
            <div className="sr-once relative py-6 px-4">
              {/* "BUILD" — behind image */}
              <div className="relative z-[1] text-center -mb-[1.2rem] sm:-mb-[1.5rem]">
                <span
                  className="text-[3rem] sm:text-[4.2rem] lg:text-[5.1rem] font-extrabold text-white leading-[1] tracking-tight heading-upper whitespace-nowrap"
                  style={fd}
                >
                  Build
                </span>
              </div>

              {/* Image — middle layer */}
              <div className="relative z-[2] mx-auto w-[33%] sm:w-[29%] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl shadow-black/40">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=450&fit=crop&q=80"
                  alt="Business professional"
                  fill
                  className="object-cover"
                  sizes="350px"
                />
              </div>

              {/* "WITH AI." — in front of image */}
              <div className="relative z-[3] text-center -mt-[1.2rem] sm:-mt-[1.5rem]">
                <span
                  className="text-[3rem] sm:text-[4.2rem] lg:text-[5.1rem] font-extrabold text-gold leading-[1] tracking-tight heading-upper whitespace-nowrap"
                  style={fd}
                >
                  with AI.
                </span>
              </div>
            </div>

            {/* Right: get in touch */}
            <div className="sr-once">
              <h3
                className="text-2xl sm:text-3xl font-extrabold text-white mb-5 heading-upper"
                style={fd}
              >
                Free AI audit
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-8" style={fb}>
                30 minutes. We map your tasks, calculate what you spend on each, and show you exactly which ones AI can handle. You walk away with a clear plan, whether you work with us or not.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-obsidian text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold transition-all hover:-translate-y-0.5"
                style={fh}
              >
                Book your free audit
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </main>
  );
}
