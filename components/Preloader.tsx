"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const fh = { fontFamily: "var(--font-heading), sans-serif" };

export default function Preloader() {
  const solidRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Skip full animation on return visits within the same session
    if (sessionStorage.getItem("preloader-seen")) {
      sessionStorage.setItem("preloader-done-flag", "1");
      gsap.set("header a", { opacity: 1 });
      window.dispatchEvent(new CustomEvent("preloader-done"));
      setDone(true);
      return;
    }
    sessionStorage.setItem("preloader-seen", "1");

    document.body.style.overflow = "hidden";
    // Hide the real nav logo so it doesn't show while animated logo is in flight
    gsap.set("header a", { opacity: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        gsap.set("header a", { opacity: 1 });
        setDone(true);
      },
    });

    // Phase 1: Logo slides in from bottom
    tl.fromTo(
      logoRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, ease: "power3.out" }
    );

    // Phase 2: Tagline slides in
    tl.fromTo(
      ".tagline-word",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: "power3.out" },
      "-=0.4"
    );

    // Phase 3: Hold
    tl.to({}, { duration: 1.0 });

    // Phase 4a: Tagline slides out upward
    tl.to(".tagline-word", {
      y: -24,
      opacity: 0,
      duration: 0.45,
      stagger: 0.05,
      ease: "power3.in",
    });

    // Dispatch event as reveal begins so homepage animates in with the curtain
    tl.call(() => {
      sessionStorage.setItem("preloader-done-flag", "1");
      window.dispatchEvent(new CustomEvent("preloader-done"));
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
      duration: 1.1,
      ease: "power3.inOut",
    });

    // Phase 5: Slide overlay down simultaneously with logo slide
    tl.to(solidRef.current, {
      yPercent: 100,
      duration: 1.1,
      ease: "power4.inOut",
    }, "<");

    // Fade real nav logo in as animated logo arrives — seamless handoff
    tl.to("header a", { opacity: 1, duration: 0.2, ease: "none" }, "-=0.2");
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
            className="brand-logo text-[4rem] sm:text-[6rem] lg:text-[8rem] text-white whitespace-nowrap leading-none block"
          >
            L O N E{" "}<span className="brand-ampersand">&amp;</span>{" "}C O<span className="brand-dot" />
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