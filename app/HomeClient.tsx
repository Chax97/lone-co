"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal";
import { Robot, ArrowsClockwise, Code, Monitor, ShieldCheck, Lightning } from "@phosphor-icons/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}




const features = [
  { icon: <Robot size={28} weight="light" />, title: "AI Agents", body: "Custom AI agents that handle enquiries, follow up leads, and run tasks 24/7." },
  { icon: <ArrowsClockwise size={28} weight="light" />, title: "Workflow Automation", body: "Connect the tools you already use. Automate reports, emails, CRM updates, and scheduling." },
  { icon: <Code size={28} weight="light" />, title: "Custom AI Development", body: "Bespoke AI applications and integrations built around your specific business processes." },
  { icon: <Monitor size={28} weight="light" />, title: "Website Design & Build", body: "Fast, modern websites that convert visitors into customers. Built to be AI ready from day one." },
  { icon: <ShieldCheck size={28} weight="light" />, title: "GDPR & Security First", body: "Every build follows UK data protection standards. Your data, your servers, your control." },
  { icon: <Lightning size={28} weight="light" />, title: "Rapid Delivery", body: "AI agents live in days. Websites in weeks. Strategy sessions with actionable outcomes same week." },
];

const services = [
  { num: "01", title: "AI Consulting & Strategy", price: "From £750", href: "/services#strategy" },
  { num: "02", title: "AI Agents & Automation", price: "From £1,950", href: "/services#agents" },
  { num: "03", title: "Custom AI Development", price: "Bespoke", href: "/services#development" },
  { num: "04", title: "Website Design & Development", price: "From £2,500", href: "/services#websites" },
];

/* ── Fonts shorthand ── */
const fd = { fontFamily: "var(--font-display), serif" };
const fh = { fontFamily: "var(--font-heading), sans-serif" };
const fb = { fontFamily: "var(--font-body), sans-serif" };

/* ── Hero slide visuals (photo + floating cards) ── */
function HeroVisual({ active }: { active: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.set(el.querySelectorAll(".float-card"), { x: 0, y: 0, opacity: 0 });
    const cards = Array.from(
      el.querySelectorAll<HTMLElement>(`.slide-v${active} .float-card`)
    );
    cards.forEach((card, i) => {
      const dir = card.dataset.from ?? "bottom";
      const from =
        dir === "left"  ? { x: -36, y: 0, opacity: 0 } :
        dir === "right" ? { x: 36,  y: 0, opacity: 0 } :
        dir === "top"   ? { x: 0, y: -36, opacity: 0 } :
                          { x: 0, y: 36,  opacity: 0 };
      gsap.fromTo(card, from, {
        x: 0, y: 0, opacity: 1,
        duration: 0.9,
        delay: 0.45 + i * 0.22,
        ease: "power3.out",
        overwrite: true,
      });
    });
  }, [active]);

  const card = "float-card bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl shadow-black/10 z-10";

  return (
    <div ref={ref} className="relative w-[500px] lg:w-[560px] h-[520px] lg:h-[580px]">

      {/* ── Slide 0: AI Agents ── */}
      <div className={`slide-v0 absolute inset-0 transition-all duration-1000 ease-in-out ${active === 0 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        <div className="absolute top-6 right-0 w-[82%] h-[88%] rounded-2xl overflow-hidden z-[1] shadow-2xl shadow-black/30">
          <Image
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=900&fit=crop&q=80"
            alt="AI agent handling enquiries"
            fill className="object-cover" sizes="520px" priority
          />
        </div>
        <div className={`${card} absolute top-0 left-0 px-4 py-3 flex items-center gap-2.5`} data-from="left" style={{ opacity: 0 }}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[.6rem] text-navy font-semibold tracking-wider uppercase" style={fh}>AI Agent Active</span>
        </div>
        <div className={`${card} absolute bottom-6 left-0 p-4 min-w-[220px]`} data-from="bottom" style={{ opacity: 0 }}>
          <p className="text-xl font-bold text-navy tracking-tight" style={fd}>2:47 AM</p>
          <div className="mt-2.5 space-y-1.5">
            {["Enquiry captured", "Viewing booked", "Follow up sent"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-[.6rem] text-charcoal/60" style={fb}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Slide 1: Automation ── */}
      <div className={`slide-v1 absolute inset-0 transition-all duration-1000 ease-in-out ${active === 1 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        <div className="absolute top-6 right-0 w-[82%] h-[88%] rounded-2xl overflow-hidden z-[1] shadow-2xl shadow-black/30">
          <Image
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=900&fit=crop&q=80"
            alt="Team using automated workflows"
            fill className="object-cover" sizes="520px"
          />
        </div>
        <div className={`${card} absolute top-0 right-0 p-4 min-w-[220px]`} data-from="right" style={{ opacity: 0 }}>
          <p className="text-[.6rem] text-charcoal/40 font-semibold tracking-wider uppercase mb-3" style={fh}>Connected</p>
          <div className="space-y-2">
            {["HubSpot CRM", "Google Calendar", "Slack"].map((tool) => (
              <div key={tool} className="flex items-center justify-between gap-6">
                <span className="text-[.6rem] text-navy font-medium" style={fh}>{tool}</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[.5rem] text-emerald-600 font-medium" style={fb}>Synced</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${card} absolute bottom-6 left-0 p-4 min-w-[230px]`} data-from="left" style={{ opacity: 0 }}>
          <p className="text-[.6rem] text-charcoal/40 font-semibold tracking-wider uppercase mb-2" style={fh}>This week</p>
          <div className="space-y-2">
            {[
              { task: "Reports generated", num: "14" },
              { task: "Emails sent", num: "86" },
              { task: "CRM entries updated", num: "213" },
            ].map((row) => (
              <div key={row.task} className="flex items-center justify-between gap-6">
                <span className="text-[.55rem] text-charcoal/50" style={fb}>{row.task}</span>
                <span className="text-[.65rem] text-navy font-bold" style={fd}>{row.num}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-2.5 border-t border-charcoal/[.08]">
            <span className="text-[.5rem] text-emerald-600 font-semibold" style={fh}>12 hrs saved this week</span>
          </div>
        </div>
      </div>

      {/* ── Slide 2: Custom Dev — photo right ── */}
      <div className={`slide-v2 absolute inset-0 transition-all duration-1000 ease-in-out ${active === 2 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        <div className="absolute top-6 right-0 w-[82%] h-[88%] rounded-2xl overflow-hidden z-[1] shadow-2xl shadow-black/30">
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=900&fit=crop&q=80"
            alt="Custom AI development"
            fill className="object-cover" sizes="520px"
          />
        </div>
        <div className={`${card} absolute top-0 left-0 p-4 min-w-[220px]`} data-from="left" style={{ opacity: 0 }}>
          <p className="text-[.6rem] text-charcoal/40 font-semibold tracking-wider uppercase mb-3" style={fh}>Your AI build</p>
          {[
            { step: "Discovery & scoping", done: true, current: false },
            { step: "Architecture", done: true, current: false },
            { step: "Development", done: false, current: true },
            { step: "Testing & launch", done: false, current: false },
          ].map((s) => (
            <div key={s.step} className="flex items-center gap-2.5 mb-2 last:mb-0">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                s.done ? "bg-emerald-100" : s.current ? "bg-gold/20 ring-1 ring-gold/50" : "bg-charcoal/[.06]"
              }`}>
                {s.done ? (
                  <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : s.current ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-charcoal/20" />
                )}
              </span>
              <span className={`text-[.6rem] ${s.done ? "text-charcoal/35 line-through" : s.current ? "text-navy font-semibold" : "text-charcoal/30"}`} style={fb}>
                {s.step}
              </span>
            </div>
          ))}
        </div>
        <div className={`${card} absolute bottom-6 right-0 p-4 min-w-[200px]`} data-from="right" style={{ opacity: 0 }}>
          <p className="text-[.6rem] text-charcoal/40 font-semibold tracking-wider uppercase mb-2" style={fh}>Bespoke for you</p>
          <p className="text-[.55rem] text-charcoal/50 leading-relaxed" style={fb}>
            Custom AI integrations built around your specific business processes.
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-[.5rem] text-navy bg-navy/[.08] px-2 py-0.5 rounded-full font-semibold" style={fh}>API</span>
            <span className="text-[.5rem] text-navy bg-navy/[.08] px-2 py-0.5 rounded-full font-semibold" style={fh}>LLM</span>
            <span className="text-[.5rem] text-navy bg-navy/[.08] px-2 py-0.5 rounded-full font-semibold" style={fh}>RAG</span>
          </div>
        </div>
      </div>

      {/* ── Slide 3: Website Design ── */}
      <div className={`slide-v3 absolute inset-0 transition-all duration-1000 ease-in-out ${active === 3 ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
        <div className="absolute top-6 right-0 w-[82%] h-[88%] rounded-2xl overflow-hidden z-[1] shadow-2xl shadow-black/30">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=900&fit=crop&q=80"
            alt="Website analytics and design"
            fill className="object-cover" sizes="520px"
          />
        </div>
        <div className={`${card} absolute top-0 right-0 p-4 min-w-[200px]`} data-from="top" style={{ opacity: 0 }}>
          <p className="text-[.6rem] text-charcoal/40 font-semibold tracking-wider uppercase mb-2" style={fh}>Site performance</p>
          <div className="space-y-2">
            {[
              { metric: "Page speed", value: "98" },
              { metric: "SEO score", value: "95" },
              { metric: "Accessibility", value: "100" },
            ].map((m) => (
              <div key={m.metric} className="flex items-center justify-between gap-6">
                <span className="text-[.55rem] text-charcoal/50" style={fb}>{m.metric}</span>
                <span className="text-[.65rem] font-bold text-emerald-600" style={fd}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={`${card} absolute bottom-6 left-0 p-4 min-w-[220px]`} data-from="left" style={{ opacity: 0 }}>
          <p className="text-[.6rem] text-charcoal/40 font-semibold tracking-wider uppercase mb-2" style={fh}>Since launch</p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { num: "+140%", label: "Traffic" },
              { num: "+85%", label: "Conversions" },
              { num: "0.8s", label: "Load time" },
              { num: "4.9★", label: "Audit score" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-sm font-bold text-navy" style={fd}>{s.num}</p>
                <p className="text-[.45rem] text-charcoal/40" style={fh}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
    { text: "answers while you sleep", animation: "slideUp" },
    { text: "automates your workflows", animation: "slideUp" },
    { text: "builds what you need", animation: "slideUp" },
    { text: "turns clicks into customers", animation: "slideUp" },
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

  // Reveal hero content when preloader signals it's done
  useEffect(() => {
    const content = contentRef.current;
    const honeycomb = honeycombRef.current;
    if (!content) return;

    // Return visit — preloader already ran, show content instantly
    if (sessionStorage.getItem("preloader-done-flag")) {
      gsap.set(content.querySelectorAll(".hero-item"), { y: 0, opacity: 1 });
      if (honeycomb) gsap.set(honeycomb, { x: 0, opacity: 1 });
      return;
    }

    // First visit — hide items and animate in once preloader lifts
    gsap.set(content.querySelectorAll(".hero-item"), { y: 40, opacity: 0 });
    if (honeycomb) gsap.set(honeycomb, { x: 60, opacity: 0 });

    const runAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      const tl = gsap.timeline();
      tl.to(content.querySelectorAll(".hero-item"), {
        y: 0, opacity: 1, duration: 1.1, stagger: 0.2, ease: "power3.out",
      });
      if (honeycomb) {
        tl.to(honeycomb, { x: 0, opacity: 1, duration: 1.3, ease: "power3.out" }, "-=0.7");
      }
    };

    window.addEventListener("preloader-done", runAnimation, { once: true });
    const fallback = setTimeout(runAnimation, 5000);
    return () => {
      window.removeEventListener("preloader-done", runAnimation);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-obsidian" />
      {/* Fixed diagonal accent — right side */}
      <div className="hero-accent-bg hidden lg:block" />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 sm:px-10 pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
        {/* Two column: text + honeycomb */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-8 items-center">
          {/* Left: tagline + CTAs */}
          <div ref={contentRef} className="max-w-[560px]">
            <h2
              className="hero-item text-[2.5rem] sm:text-[3.2rem] lg:text-[4rem] font-semibold text-white leading-[1.08] heading-legacy"
            >
              Your Hardest Worker
            </h2>
            <div className="hero-item overflow-hidden mt-1">
              <div ref={rotatingRef}>
                <span
                  className="text-[2rem] sm:text-[2.6rem] lg:text-[3.2rem] font-bold text-gold leading-[1.1] tracking-tight heading-upper block"
                  style={fd}
                >
                  {slides[active].text}
                </span>
              </div>
            </div>

            <p className="hero-item text-base sm:text-lg text-white/45 leading-relaxed mt-8 max-w-[440px]" style={fb}>
              AI agents, workflow automation, custom development, and websites that convert. We build the systems that let small teams do big things.
            </p>

            <div className="hero-item mt-10">
              <a
                href="https://calendly.com/loneandco/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 bg-white text-navy text-sm font-semibold tracking-wide rounded-full hover:bg-gold transition-all"
                style={fh}
              >
                Book a demo
                <span className="w-9 h-9 rounded-full bg-navy flex items-center justify-center group-hover:bg-obsidian transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
              </a>
            </div>

          </div>

          {/* Right: photo + floating cards */}
          <div ref={honeycombRef} className="hidden lg:flex justify-end items-center">
            <HeroVisual active={active} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10 z-10" />
    </section>
  );
}


/* ── Industry accordion ── */
const industryCards = [
  { num: "01", title: "Estate Agents", img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&h=600&fit=crop&q=80", href: "/contact" },
  { num: "02", title: "Dental Practices", img: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=900&h=600&fit=crop&q=80", href: "/contact" },
  { num: "03", title: "Trades & Construction", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&h=600&fit=crop&q=80", href: "/contact" },
  { num: "04", title: "Professional Services", img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&h=600&fit=crop&q=80", href: "/contact" },
];

/* ── Industry horizontal cards ── */
function IndustryCards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeCardRef = useRef(0);

  const scrollToCard = useCallback((index: number) => {
    activeCardRef.current = index;
    setActiveCard(index);
    const el = trackRef.current;
    if (!el) return;
    const cardEls = el.querySelectorAll<HTMLElement>(".industry-card");
    const first = cardEls[0];
    const target = cardEls[index];
    if (first && target) {
      el.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: "smooth" });
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      scrollToCard((activeCardRef.current + 1) % industryCards.length);
    }, 3200);
  }, [scrollToCard]);

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoPlay]);

  return (
    <div>
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto px-6 sm:px-10 lg:px-[calc((100vw-1200px)/2+2.5rem)] pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {industryCards.map((card, i) => (
          <Link
            key={i}
            href={card.href}
            className="industry-card group relative flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-[45vw] aspect-[16/10] rounded-2xl overflow-hidden"
            onMouseEnter={(e) => {
              const arrow = e.currentTarget.querySelector<SVGElement>(".arrow-spin");
              if (arrow) gsap.fromTo(arrow, { rotation: 0 }, { rotation: 360, duration: 0.45, ease: "power3.out", overwrite: true });
            }}
          >
            <Image
              src={card.img}
              alt={card.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 45vw"
              priority={i === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent" />
            <div className="absolute top-5 left-5 z-10">
              <span className="text-sm text-white/60 font-medium" style={fh}>{card.num}.</span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white heading-legacy" style={fd}>
                {card.title}
              </h3>
              <span className="w-10 h-10 rounded-lg border border-white/20 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 group-hover:border-white/40 transition-all ml-4">
                <svg
                  className="arrow-spin w-4 h-4 text-white"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
        <div className="w-6 sm:w-10 flex-shrink-0" />
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2 px-6 sm:px-10 lg:px-[calc((100vw-1200px)/2+2.5rem)] mt-5">
        {industryCards.map((_, i) => (
          <button
            key={i}
            onClick={() => { scrollToCard(i); startAutoPlay(); }}
            className="group h-[3px] rounded-full transition-all duration-400 focus:outline-none"
            style={{
              width: activeCard === i ? "2rem" : "0.75rem",
              background: activeCard === i ? "rgba(197,165,90,1)" : "rgba(255,255,255,0.2)",
              transition: "width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.35s ease",
            }}
            aria-label={industryCards[i].title}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Color reveal heading ── */
function ColorReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = [
    { text: "We", color: false },
    { text: "build", color: false },
    { text: "the", color: false },
    { text: "AI", color: true },
    { text: "systems", color: true },
    { text: "that", color: false },
    { text: "handle", color: false },
    { text: "the", color: false },
    { text: "work", color: false },
    { text: "your", color: false },
    { text: "team", color: false },
    { text: "shouldn't", color: false },
    { text: "be", color: false },
    { text: "doing", color: false },
    { text: "manually.", color: true },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const wordEls = el.querySelectorAll(".cr-word");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "center center",
        scrub: true,
      },
    });

    wordEls.forEach((word, i) => {
      tl.to(word, { opacity: 1, ease: "none", duration: 1 }, i);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-[2.2rem] sm:text-[3rem] lg:text-[3.8rem] font-semibold leading-[1.15]"
      style={fd}
    >
      {words.map((w, i) => (
        <span
          key={i}
          className={`cr-word inline-block ${w.color ? "text-slate" : "text-white"}`}
          style={{ opacity: 0.12 }}
        >
          {w.text}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
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
      <section className="bg-obsidian pt-20 pb-10 lg:pt-28 lg:pb-14 border-t border-white/[.06]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          {/* Badge */}
          <ScrollReveal>
            <div className="sr mb-10">
              <span className="inline-flex items-center gap-2 bg-white/[.06] border border-white/[.08] rounded-md px-3 py-1.5">
                <span className="w-2 h-2 rounded-sm bg-slate" />
                <span className="text-[.6rem] text-white/70 font-semibold tracking-wider uppercase" style={fh}>What we do</span>
              </span>
            </div>
          </ScrollReveal>

          {/* Heading with colored keywords */}
          <div className="mb-12">
            <ColorReveal />
          </div>

          {/* Body text — right aligned */}
          <ScrollReveal>
            <div className="sr flex justify-end">
              <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-[480px]" style={fb}>
                Whether you need AI agents answering enquiries at 2am, workflows that connect your tools automatically, custom AI built around your processes, or a website that actually converts, we design and build systems that save time, capture revenue, and scale without adding headcount.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ INDUSTRIES ═══ */}
      <section className="bg-obsidian pt-10 pb-24 lg:pt-14 lg:pb-36 overflow-hidden">
        <ScrollReveal>
          <div className="sr mb-6">
            <IndustryCards />
          </div>
        </ScrollReveal>
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 mt-10">
          <ScrollReveal>
            <div className="sr text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white heading-legacy" style={fd}>
                Our <span className="text-slate">technology</span> was built to solve <span className="text-slate">real world</span> challenges.
              </h2>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="bg-obsidian border-t border-white/[.06]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — sticky with border */}
            <div className="lg:sticky lg:top-32 lg:self-start py-24 lg:py-40 lg:pr-16">
              <ScrollReveal>
                <div className="sr mb-8">
                  <span className="inline-flex items-center gap-2 bg-white/[.06] border border-white/[.08] rounded-md px-3 py-1.5">
                    <span className="w-2 h-2 rounded-sm bg-slate" />
                    <span className="text-[.6rem] text-white/70 font-semibold tracking-wider uppercase" style={fh}>Our capabilities</span>
                  </span>
                </div>
                <h2 className="sr text-[2rem] sm:text-[2.5rem] lg:text-[2.8rem] font-semibold text-white leading-[1.1] heading-legacy" style={fd}>
                  Designed to Solve the Challenges You Face Every Day.
                </h2>
                <p className="sr text-sm text-white/40 leading-relaxed mt-8 max-w-[380px]" style={fb}>
                  From AI agents that handle your enquiries to websites that convert your traffic, our platform helps eliminate busywork and streamline operations, saving you both time and money from day one.
                </p>
                <div className="sr mt-10">
                  <Link
                    href="/services"
                    className="group inline-flex items-center gap-3 pl-7 pr-2 py-2 bg-slate/90 text-white text-sm font-semibold tracking-wide rounded-full hover:bg-slate transition-all shadow-lg shadow-slate/20"
                    style={fh}
                  >
                    See our services
                    <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </ScrollReveal>
            </div>

            {/* Right — scrolling feature list with left border */}
            <div className="py-24 lg:py-40 lg:border-l lg:border-white/[.06]">
              {features.map((feat, i) => (
                <ScrollReveal key={i}>
                  <div className={`sr lg:pl-12 py-12 lg:py-14 ${i === 0 ? "" : "border-t border-white/[.06]"}`}>
                    <div className="text-slate mb-5">
                      {feat.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3" style={fd}>
                      {feat.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed max-w-[420px]" style={fb}>
                      {feat.body}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
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
            <h2 className="text-3xl sm:text-4xl font-semibold text-obsidian leading-tight mb-5 heading-legacy">
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
              <Link key={s.num} href={s.href} className={`sr-child service-row ${i % 2 !== 0 ? "service-row-right" : ""} group block py-10 lg:py-12 ${i === 0 ? "border-t " : ""}border-b border-light-gray`}>
                <div className={`flex items-center gap-6 lg:gap-10 ${i % 2 === 0 ? "" : "lg:flex-row-reverse lg:text-right"}`}>
                  <span className="text-sm text-gold font-semibold flex-shrink-0" style={fh}>{s.num}</span>
                  <h3 className="text-lg lg:text-2xl font-bold text-obsidian group-hover:text-gold transition-colors duration-300 flex-1 heading-upper" style={fd}>{s.title}</h3>
                  <svg className="w-5 h-5 text-light-gray flex-shrink-0 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7l10 10M7 17h10V7" /></svg>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>


    </main>
  );
}
