"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGsapReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Fade + slide up
      el.querySelectorAll(".sr").forEach((target) => {
        gsap.from(target, {
          scrollTrigger: {
            trigger: target,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Stagger children
      el.querySelectorAll(".sr-stagger").forEach((group) => {
        const children = group.querySelectorAll(".sr-child");
        if (children.length === 0) return;
        gsap.from(children, {
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        });
      });

      // One-time reveals
      el.querySelectorAll(".sr-once").forEach((target) => {
        gsap.from(target, {
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
          },
          opacity: 0,
          y: 60,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Slide from right
      el.querySelectorAll(".sr-right").forEach((target) => {
        gsap.to(target, {
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Slide from left
      el.querySelectorAll(".sr-left").forEach((target) => {
        gsap.to(target, {
          scrollTrigger: {
            trigger: target,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
        });
      });
    }, el);

    // Refresh after a tick so positions are correct after navigation
    const rafId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return ref;
}

export function useHeroReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".hero-reveal"), {
        opacity: 0,
        y: 80,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const bg = el.querySelector(".parallax-bg");
      if (!bg) return;
      gsap.to(bg, {
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
        ease: "none",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

export default function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useGsapReveal();
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
