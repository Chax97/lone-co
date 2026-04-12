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

    const targets = el.querySelectorAll(".sr");
    targets.forEach((target) => {
      gsap.from(target, {
        scrollTrigger: {
          trigger: target,
          start: "top 80%",
          end: "top 5%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
      });
    });

    const staggerGroups = el.querySelectorAll(".sr-stagger");
    staggerGroups.forEach((group) => {
      const children = group.querySelectorAll(".sr-child");
      if (children.length === 0) return;
      gsap.from(children, {
        scrollTrigger: {
          trigger: group,
          start: "top 85%",
          end: "top 20%",
          toggleActions: "play reverse play reverse",
        },
        opacity: 0,
        y: 50,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
    });

    // One-time reveals (no reverse)
    const onceTargets = el.querySelectorAll(".sr-once");
    onceTargets.forEach((target) => {
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return ref;
}

export function useHeroReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(".hero-reveal");
    gsap.from(children, {
      opacity: 0,
      y: 80,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  return ref;
}

export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
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