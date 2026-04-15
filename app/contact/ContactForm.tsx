"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const serviceOptions = [
  "Please select",
  "Free website audit",
  "AI chatbot integration",
  "Website optimisation",
  "AI strategy & custom solutions",
  "Something else",
];

const benefits = [
  "Save hours with AI powered automation",
  "Convert more visitors into paying customers",
  "Get a website that actually drives revenue",
  "No long term contracts or hidden fees",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    service: "Please select",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.service === "Please select") return;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // form stays open on network error
    }
  };

  const f = {
    serif: { fontFamily: "var(--font-display), serif" },
    sans: { fontFamily: "var(--font-body), sans-serif" },
    mono: { fontFamily: "var(--font-heading), sans-serif" },
  };

  const inputCls =
    "w-full px-5 py-4 border border-light-gray rounded-lg text-sm text-obsidian bg-white placeholder:text-warm-gray/50 focus:outline-none focus:border-gold/50 transition-all duration-300";

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="bg-obsidian pt-40 pb-16 lg:pt-52 lg:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px",
          }}
        />
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{
            top: "-10%",
            right: "-15%",
            width: "65%",
            height: "120%",
            background:
              "linear-gradient(160deg, var(--slate) 0%, #7B8AF7 40%, var(--slate) 100%)",
            clipPath: "polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)",
            zIndex: 0,
          }}
        />

        <ScrollReveal className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-10">
          <h1
            className="sr text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-white leading-[1.05]"
            style={f.serif}
          >
            Contact Us
          </h1>
        </ScrollReveal>
      </section>

      {/* ═══ FORM + BENEFITS ═══ */}
      <section className="bg-cream pb-24 lg:pb-36 border-t border-light-gray">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="h-px bg-light-gray mb-16 lg:mb-20" />
        </div>

        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-20">
            {/* ── LEFT: Form ── */}
            <div>
              <h2
                className="sr text-xl sm:text-2xl font-semibold text-obsidian mb-10"
                style={f.serif}
              >
                Let&apos;s change the way you run your business
              </h2>

              {submitted ? (
                <div className="sr border border-light-gray rounded-xl p-12 text-center bg-white">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                    <svg
                      className="w-6 h-6 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-xl font-bold text-obsidian mb-2"
                    style={f.serif}
                  >
                    Message received.
                  </h3>
                  <p className="text-sm text-warm-gray" style={f.sans}>
                    We will get back to you within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="sr space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputCls}
                      style={f.sans}
                      placeholder="Full Name*"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputCls}
                      style={f.sans}
                      placeholder="Email*"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className={inputCls}
                      style={f.sans}
                      placeholder="Company Name*"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputCls}
                      style={f.sans}
                      placeholder="Phone"
                    />
                  </div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`${inputCls} appearance-none cursor-pointer`}
                    style={{
                      ...f.sans,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24' stroke='rgba(0,0,0,0.3)' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 16px center",
                    }}
                  >
                    {serviceOptions.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="bg-white text-obsidian"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputCls} resize-none`}
                    style={f.sans}
                    placeholder="Message*"
                  />
                  <button
                    type="submit"
                    className="w-full py-4 bg-gold hover:bg-gold-light text-white font-semibold text-sm tracking-wide rounded-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    style={f.mono}
                  >
                    Send message
                  </button>
                </form>
              )}
            </div>

            {/* ── RIGHT: Benefits + Contact Info ── */}
            <div className="lg:pt-2">
              <p
                className="sr text-base sm:text-lg text-charcoal leading-relaxed mb-10"
                style={f.sans}
              >
                Talk to an expert at Lone &amp; Co to see how AI can transform
                your business operations.
              </p>

              {/* Benefit pills */}
              <div className="sr space-y-4 mb-14">
                {benefits.map((b, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-5 py-4 rounded-xl border border-light-gray bg-white transition-colors duration-300 hover:border-gold/20"
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center">
                      <svg
                        className="w-3.5 h-3.5 text-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <span className="text-sm text-charcoal" style={f.sans}>
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              {/* Direct contact */}
              <div className="sr border-t border-light-gray pt-10">
                <p
                  className="text-[.65rem] font-semibold tracking-[.2em] uppercase text-gold mb-6"
                  style={f.mono}
                >
                  Or reach us directly
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-warm-gray mb-1.5" style={f.sans}>
                      Email
                    </p>
                    <a
                      href="mailto:hello@loneco.co.uk"
                      className="text-obsidian hover:text-gold transition-colors text-sm font-medium"
                      style={f.sans}
                    >
                      hello@loneco.co.uk
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-warm-gray mb-1.5" style={f.sans}>
                      Location
                    </p>
                    <p className="text-sm text-obsidian font-medium" style={f.sans}>
                      London, United Kingdom
                    </p>
                    <p className="text-xs text-warm-gray mt-1" style={f.sans}>
                      Remote first · serving all UK regions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
