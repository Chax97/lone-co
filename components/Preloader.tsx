"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const fd = { fontFamily: "var(--font-display), sans-serif" };
const fh = { fontFamily: "var(--font-heading), sans-serif" };

export default function Preloader() {
  const solidRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    // Phase 1: Logo zooms in
    tl.fromTo(
      logoRef.current,
      { scale: 5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // Phase 2: Tagline slides in
    tl.fromTo(
      ".tagline-word",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out" },
      "-=0.3"
    );

    // Phase 3: Hold
    tl.to({}, { duration: 0.6 });

    // Phase 4a: Tagline fades out
    tl.to(".tagline-word", {
      opacity: 0,
      duration: 0.25,
      ease: "power3.in",
    });

    // Phase 4b: Logo slides to exact nav logo position — stays fully visible
    tl.to(logoRef.current, {
      x: () => {
        const nav = document.querySelector("header a");
        if (!nav || !logoRef.current) return -(window.innerWidth / 2 - 80);
        const nr = nav.getBoundingClientRect();
        const lr = logoRef.current.getBoundingClientRect();
        return (nr.left + nr.width / 2) - (lr.left + lr.width / 2);
      },
      y: () => {
        const nav = document.querySelector("header a");
        if (!nav || !logoRef.current) return -(window.innerHeight / 2 - 36);
        const nr = nav.getBoundingClientRect();
        const lr = logoRef.current.getBoundingClientRect();
        return (nr.top + nr.height / 2) - (lr.top + lr.height / 2);
      },
      scale: () => {
        const nav = document.querySelector("header a");
        if (!nav || !logoRef.current) return 0.13;
        const nr = nav.getBoundingClientRect();
        const lr = logoRef.current.getBoundingClientRect();
        return nr.width / lr.width;
      },
      duration: 0.85,
      ease: "power3.inOut",
    }, "<");

    // Phase 5: Slide overlay down simultaneously with logo slide
    tl.to(solidRef.current, {
      yPercent: 100,
      duration: 0.85,
      ease: "power4.inOut",
    }, "<");
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Solid overlay — visible during zoom + tagline */}
      <div ref={solidRef} className="absolute inset-0 bg-obsidian" />

      {/* Logo — z-10 keeps it above the sliding overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div ref={logoRef} className="opacity-0">
          <span
            className="text-[4rem] sm:text-[6rem] lg:text-[8rem] font-extrabold text-white tracking-tight whitespace-nowrap leading-none block"
            style={fd}
          >
            Lone <span className="text-gold">&amp;</span> Co
          </span>
        </div>
      </div>

      {/* Tagline */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="mt-[6rem] sm:mt-[8rem] lg:mt-[10rem] flex gap-[0.4em] flex-wrap justify-center px-6">
          {["AI", "consulting", "for", "UK", "businesses"].map((word, i) => (
            <span
              key={i}
              className="tagline-word text-sm sm:text-base text-white/40 tracking-widest uppercase opacity-0"
              style={fh}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}