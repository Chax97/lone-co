"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";
import FloatingElements from "@/components/FloatingElements";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const heroSlides = [
  {
    text: "answers your calls at 2am",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&h=900&fit=crop&q=80",
    position: { x: "0%", y: "0%", align: "center" as const },
    animation: "slideUp",
  },
  {
    text: "books appointments while you sleep",
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&h=900&fit=crop&q=80",
    position: { x: "-20%", y: "15%", align: "left" as const },
    animation: "slideRight",
  },
  {
    text: "captures every single lead",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop&q=80",
    position: { x: "20%", y: "-10%", align: "right" as const },
    animation: "fadeScale",
  },
  {
    text: "your customers actually like",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop&q=80",
    position: { x: "0%", y: "10%", align: "center" as const },
    animation: "slideUp",
  },
];


const industries = [
  {
    title: "Estate Agents",
    body: "AI answers property enquiries, qualifies buyers, and books viewings around the clock. Your team focuses on closing deals.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=900&fit=crop&q=80",
  },
  {
    title: "Dental Practices",
    body: "Patients book, reschedule, and ask about treatments through your chatbot. No more missed calls during procedures.",
    img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=900&fit=crop&q=80",
  },
  {
    title: "Trades Businesses",
    body: "Your AI handles enquiries from the van, collects job details, and gives quotes for standard work. Every lead captured.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=900&fit=crop&q=80",
  },
  {
    title: "Solicitors",
    body: "AI gathers case details, checks basics, and routes enquiries to the right department before they reach your desk.",
    img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=900&fit=crop&q=80",
  },
];

const features = [
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />, title: "AI Chatbots", body: "Trained on your business. Handles enquiries, captures leads, books appointments." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />, title: "Site Speed & SEO", body: "Performance fixes and technical foundations that make everything else work." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />, title: "Strategy & Roadmaps", body: "Where AI helps, where it does not, and what to do first." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />, title: "GDPR Compliant", body: "Built for UK businesses with data protection from day one." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />, title: "Fixed Pricing", body: "You know what it costs before we start. No surprises." },
  { icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />, title: "Ongoing Support", body: "Three months included. We do not disappear after launch." },
];

const services = [
  { num: "01", title: "AI Chatbot Integration", price: "From £1,950", href: "/services#chatbot" },
  { num: "02", title: "Website Optimisation", price: "From £2,500", href: "/services#optimisation" },
  { num: "03", title: "AI Strategy & Custom Solutions", price: "Bespoke", href: "/contact" },
];

/* ── Fonts shorthand ── */
const fd = { fontFamily: "var(--font-display), sans-serif" };
const fh = { fontFamily: "var(--font-heading), sans-serif" };
const fb = { fontFamily: "var(--font-body), sans-serif" };

/* ── Hero carousel ── */
function HeroCarousel() {
  const [active, setActive] = useState(0);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const rotatingRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdTime = 2800;

  const animateIn = useCallback((el: HTMLElement, type: string) => {
    gsap.set(el, { opacity: 0 });
    switch (type) {
      case "slideUp":
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        break;
      case "slideRight":
        gsap.fromTo(el, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        break;
      case "fadeScale":
        gsap.fromTo(el, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.4)" });
        break;
      default:
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
    }
  }, []);

  const goToSlide = useCallback(
    (next: number) => {
      const rotating = rotatingRef.current;
      const block = textBlockRef.current;
      if (!rotating || !block) return;
      if (intervalRef.current) clearTimeout(intervalRef.current);

      const nextSlide = heroSlides[next];

      gsap.to(rotating, {
        y: -40, opacity: 0, duration: 0.3, ease: "power3.in",
        onComplete: () => {
          setActive(next);
          animateIn(rotating, nextSlide.animation);
        },
      });

      gsap.to(block, {
        xPercent: parseFloat(nextSlide.position.x),
        yPercent: parseFloat(nextSlide.position.y),
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
    [animateIn]
  );

  useEffect(() => {
    intervalRef.current = setTimeout(() => {
      goToSlide((active + 1) % heroSlides.length);
    }, holdTime);
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current); };
  }, [active, goToSlide]);

  useEffect(() => {
    const block = textBlockRef.current;
    if (!block) return;
    gsap.set(block, {
      xPercent: parseFloat(heroSlides[0].position.x),
      yPercent: parseFloat(heroSlides[0].position.y),
    });
  }, []);

  const alignClass = heroSlides[active].position.align === "left"
    ? "text-left items-start"
    : heroSlides[active].position.align === "right"
    ? "text-right items-end"
    : "text-center items-center";

  return (
    <>
      {/* Background images */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => (
          <div key={i} className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out" style={{ opacity: i === active ? 1 : 0 }}>
            <Image
              src={slide.img}
              alt=""
              fill
              className={`object-cover transition-transform duration-[5000ms] ease-out ${i === active ? "scale-110" : "scale-100"}`}
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-obsidian/40" />
      </div>

      {/* Text block - blended on top of images */}
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 sm:px-10 py-32">
        <div ref={textBlockRef} className={`flex flex-col ${alignClass} transition-[text-align] duration-500`}>
          <h1
            className="text-[3.5rem] sm:text-[5.5rem] lg:text-[8rem] font-extrabold leading-[0.9] tracking-tight heading-upper mix-blend-difference text-white"
            style={fd}
          >
            AI that
          </h1>
          <div className="overflow-hidden min-h-[3rem] sm:min-h-[4.5rem] lg:min-h-[6.5rem] flex items-start mt-1">
            <div ref={rotatingRef}>
              <span
                className="text-[1.8rem] sm:text-[3rem] lg:text-[4.5rem] font-extrabold text-gold leading-[1] tracking-tight heading-upper block"
                style={fd}
              >
                {heroSlides[active].text}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


/* ── Main ── */
export default function HomeClient() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.from(cardsRef.current.querySelectorAll(".card-item"), {
      scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
      opacity: 0, y: 60, duration: 0.8, stagger: 0.12, ease: "power3.out",
    });
    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  useEffect(() => {
    if (!featureCardsRef.current) return;
    gsap.from(featureCardsRef.current.querySelectorAll(".card-item"), {
      scrollTrigger: { trigger: featureCardsRef.current, start: "top 85%" },
      opacity: 0, y: 60, duration: 0.8, stagger: 0.12, ease: "power3.out",
    });
  }, []);

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroCarousel />
        <FloatingElements />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10 z-10" />
      </section>

      {/* ═══ WHAT SETS US APART ═══ */}
      <section className="bg-navy py-20 lg:py-28 border-t border-gold/10">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <p className="sr text-xs font-semibold tracking-[.25em] uppercase text-gold/70 mb-10" style={fh}>
                What sets us apart
              </p>
              <h2 className="sr text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.02] heading-upper" style={fd}>
                Lone & Co.<br />
                AI that makes sense.
              </h2>
            </div>
            <div className="flex flex-col justify-center">
              <p className="sr text-sm text-white/60 leading-relaxed mb-5" style={fb}>
                Most AI consultancies are built for enterprises with big budgets and bigger teams. We exist for the businesses they overlook. The estate agents, dental practices, trades companies, and solicitors who need proper advice without the complexity.
              </p>
              <p className="sr text-sm text-white/40 leading-relaxed mb-10" style={fb}>
                We work with you to find where AI genuinely helps, build it properly, and make sure it actually works. Fixed prices, plain English, no nonsense.
              </p>
              <div className="sr">
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
        </ScrollReveal>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="bg-obsidian py-24 lg:py-36">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <ScrollReveal>
            <div className="sr text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white heading-upper" style={fd}>
                Tailored for your industry
              </h2>
              <p className="text-sm text-white/40 leading-relaxed mt-4 max-w-[500px] mx-auto" style={fb}>
                Whether you run an estate agency, a dental practice, a trades business, or a law firm, we build AI that fits how you actually work.
              </p>
            </div>
          </ScrollReveal>
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {industries.map((ind, i) => (
              <Link
                key={i}
                href="/contact"
                className={`card-item ${i >= 2 ? "sr-once" : ""} group relative rounded-2xl overflow-hidden min-h-[420px] flex flex-col justify-end p-8 cursor-pointer`}
              >
                <Image
                  src={ind.img}
                  alt={ind.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent" />
                <div className="relative z-10">
                  <h3
                    className="text-xl sm:text-2xl font-extrabold text-white mb-3 heading-upper"
                    style={fd}
                  >
                    {ind.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-[380px]" style={fb}>
                    {ind.body}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURE GRID ═══ */}
      <section className="bg-white border-t border-light-gray py-24 lg:py-36">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <ScrollReveal>
            <div className="sr text-center mb-16">
              <p className="text-xs font-semibold tracking-[.25em] uppercase text-gold mb-4" style={fh}>Why Lone & Co</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian heading-upper" style={fd}>What you get</h2>
            </div>
          </ScrollReveal>
          <div ref={featureCardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div key={i} className="card-item card-lift bg-cream rounded-2xl border border-light-gray p-8 text-center">
                <div className="feature-icon bg-navy text-gold mx-auto mb-5 rounded-xl">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">{feat.icon}</svg>
                </div>
                <h3 className="text-sm font-bold text-obsidian mb-2 uppercase tracking-wider" style={fh}>{feat.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed" style={fb}>{feat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SPLIT ═══ */}
      <section className="bg-cream border-t border-light-gray">
        <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2">
          <div className="sr relative min-h-[400px] lg:min-h-0 overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=800&fit=crop" alt="Business consultation" fill className="object-cover" sizes="50vw" />
          </div>
          <div className="sr px-6 sm:px-10 lg:px-16 py-20 lg:py-32 flex flex-col justify-center max-w-[520px]">
            <p className="text-xs font-semibold tracking-[.25em] uppercase text-gold mb-5" style={fh}>Our approach</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-obsidian leading-tight mb-5 heading-upper" style={fd}>
              Problem first. Technology second.
            </h2>
            <p className="text-sm text-warm-gray leading-relaxed" style={fb}>
              We understand your business before recommending anything. Sometimes AI is the answer. Sometimes it is not.
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
                <div className="flex items-center gap-6 lg:gap-10">
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
            <div className="sr-once relative flex items-center justify-center min-h-[350px] sm:min-h-[450px]">
              {/* Back text layer — sits behind the image */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-[1]">
                <span
                  className="text-[4rem] sm:text-[6rem] lg:text-[8rem] font-extrabold text-white leading-[0.85] tracking-tight heading-upper block"
                  style={fd}
                >
                  Build
                </span>
              </div>

              {/* Image layer — middle */}
              <div className="relative z-[2] w-[55%] sm:w-[45%] aspect-[4/3] rounded-xl overflow-hidden shadow-2xl shadow-black/40 mt-4">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=450&fit=crop&q=80"
                  alt="Business professional"
                  fill
                  className="object-cover"
                  sizes="400px"
                />
              </div>

              {/* Front text layer — sits on top of the image */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 sm:pb-6 z-[3] pointer-events-none">
                <span
                  className="text-[3rem] sm:text-[4.5rem] lg:text-[6rem] font-extrabold text-gold leading-[0.85] tracking-tight heading-upper block"
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
                Get in touch
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-8" style={fb}>
                Find out how UK businesses are using AI to save time, capture more leads, and grow. We will show you exactly where it makes sense for yours.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-white text-obsidian text-xs font-semibold tracking-wider uppercase rounded-full hover:bg-gold transition-all hover:-translate-y-0.5"
                style={fh}
              >
                Contact us
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
