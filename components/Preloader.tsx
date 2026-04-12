"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const fd = { fontFamily: "var(--font-display), sans-serif" };
const fh = { fontFamily: "var(--font-heading), sans-serif" };

export default function Preloader() {
  const solidRef = useRef<HTMLDivElement>(null);
  const splitWrapRef = useRef<HTMLDivElement>(null);
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

    // Phase 4: Tagline + logo fade out together
    tl.to([logoRef.current, ".tagline-word"], {
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
    });

    // Phase 5: Swap solid overlay for split halves
    tl.call(() => {
      if (solidRef.current) solidRef.current.style.display = "none";
      if (splitWrapRef.current) splitWrapRef.current.style.display = "block";
    });

    // Phase 6: Curtain reveal — top slides up, bottom slides down
    tl.to(
      ".split-top",
      { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
      "+=0.05"
    );
    tl.to(
      ".split-bottom",
      { yPercent: 100, duration: 0.7, ease: "power4.inOut" },
      "<"
    );
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Solid overlay — visible during zoom + tagline */}
      <div ref={solidRef} className="absolute inset-0 bg-obsidian" />

      {/* Split halves — hidden until phase 5 */}
      <div ref={splitWrapRef} className="absolute inset-0 hidden">
        <div className="split-top absolute top-0 left-0 right-0 h-1/2 bg-obsidian" />
        <div className="split-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-obsidian" />
      </div>

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
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