"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const elements = [
  { shape: "circle", size: 80, top: "8%", left: "5%", y: -120, rotate: 0, opacity: 0.12 },
  { shape: "ring", size: 120, top: "15%", right: "8%", y: -200, rotate: 90, opacity: 0.08 },
  { shape: "square", size: 40, top: "60%", left: "12%", y: -160, rotate: 45, opacity: 0.1 },
  { shape: "circle", size: 24, top: "75%", right: "15%", y: -100, rotate: 0, opacity: 0.15 },
  { shape: "line", size: 100, top: "30%", left: "85%", y: -250, rotate: 30, opacity: 0.06 },
  { shape: "ring", size: 60, top: "80%", left: "75%", y: -180, rotate: -60, opacity: 0.1 },
  { shape: "square", size: 30, top: "20%", left: "45%", y: -140, rotate: 20, opacity: 0.07 },
  { shape: "circle", size: 50, top: "50%", right: "5%", y: -220, rotate: 0, opacity: 0.09 },
  { shape: "line", size: 70, top: "70%", left: "30%", y: -130, rotate: -40, opacity: 0.08 },
  { shape: "ring", size: 90, top: "5%", left: "60%", y: -170, rotate: 120, opacity: 0.06 },
];

function Shape({ shape, size }: { shape: string; size: number }) {
  const gold = "#C5A55A";

  if (shape === "circle") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill={gold} />
      </svg>
    );
  }
  if (shape === "ring") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" fill="none" stroke={gold} strokeWidth="2" />
      </svg>
    );
  }
  if (shape === "square") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="15" y="15" width="70" height="70" fill={gold} />
      </svg>
    );
  }
  if (shape === "line") {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100">
        <line x1="10" y1="50" x2="90" y2="50" stroke={gold} strokeWidth="2" />
      </svg>
    );
  }
  return null;
}

export default function FloatingElements() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(".float-el");

    items.forEach((item, i) => {
      const el = elements[i];
      if (!el) return;

      gsap.to(item, {
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: el.y,
        rotation: `+=${el.rotate}`,
        ease: "none",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((el, i) => (
        <div
          key={i}
          className="float-el absolute"
          style={{
            top: el.top,
            left: el.left,
            right: el.right,
            opacity: el.opacity,
          } as React.CSSProperties}
        >
          <Shape shape={el.shape} size={el.size} />
        </div>
      ))}
    </div>
  );
}
