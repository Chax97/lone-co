"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

const serviceOptions = ["Please select", "Free website audit", "AI chatbot integration", "Website optimisation", "AI strategy & custom solutions", "Something else"];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "", service: "Please select" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.service === "Please select") return;
    setSubmitted(true);
  };

  const f = {
    serif: { fontFamily: "var(--font-playfair), Georgia, serif" },
    sans: { fontFamily: "var(--font-inter), 'Helvetica Neue', Arial, sans-serif" },
    mono: { fontFamily: "var(--font-montserrat), 'Helvetica Neue', Arial, sans-serif" },
  };

  const inputCls = "w-full px-4 py-3 border border-light-gray rounded-lg text-sm text-charcoal bg-cream focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-colors";

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="bg-navy pt-40 pb-20 lg:pt-52 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />
        <ScrollReveal className="relative max-w-[1200px] mx-auto px-6 sm:px-10">
          <p className="sr text-[.7rem] font-semibold tracking-[.2em] uppercase text-gold mb-8" style={f.mono}>Contact</p>
          <h1 className="sr text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.05]" style={f.serif}>
            Get in touch.
          </h1>
          <p className="sr text-base text-white/40 leading-relaxed mt-6 max-w-[380px]" style={f.sans}>
            Book a call, send a message, or just say hello. We reply within a day.
          </p>
        </ScrollReveal>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/10" />
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="bg-cream py-24 lg:py-36">
        <ScrollReveal className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
            {/* Left */}
            <div>
              <div className="sr">
                <h2 className="text-2xl font-bold text-obsidian mb-3" style={f.serif}>Book a call</h2>
                <p className="text-sm text-warm-gray leading-relaxed mb-6" style={f.sans}>
                  30 minutes. No pitch, no pressure. We will talk about your business and whether AI makes sense for you right now.
                </p>
                <a href="https://calendly.com/loneandco" target="_blank" rel="noopener noreferrer" className="arrow-link inline-flex items-center gap-3 text-gold hover:text-gold-light transition-colors" style={f.mono}>
                  <span className="text-sm font-semibold tracking-wide">Open calendar</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l10 10M7 17h10V7" /></svg>
                </a>
              </div>

              <div className="sr mt-14 pt-10 border-t border-light-gray">
                <p className="text-[.7rem] font-semibold tracking-[.15em] uppercase text-gold mb-6" style={f.mono}>Or reach us directly</p>
                <div className="space-y-5">
                  <div>
                    <p className="text-xs text-warm-gray mb-1" style={f.sans}>Email</p>
                    <a href="mailto:hello@loneco.co.uk" className="text-obsidian hover:text-gold transition-colors text-sm font-medium" style={f.sans}>hello@loneco.co.uk</a>
                  </div>
                  <div>
                    <p className="text-xs text-warm-gray mb-1" style={f.sans}>Location</p>
                    <p className="text-sm text-obsidian font-medium" style={f.sans}>London, United Kingdom</p>
                    <p className="text-xs text-warm-gray mt-1" style={f.sans}>Remote first · serving all UK regions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div>
              <h2 className="sr text-2xl font-bold text-obsidian mb-8" style={f.serif}>Send a message</h2>

              {submitted ? (
                <div className="sr bg-white border border-light-gray rounded-xl p-12 text-center">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-lg font-bold text-obsidian mb-2" style={f.serif}>Got it.</h3>
                  <p className="text-sm text-warm-gray" style={f.sans}>We will get back to you within one business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="sr bg-white border border-light-gray rounded-xl p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-[.7rem] font-semibold tracking-wider uppercase text-charcoal mb-2" style={f.mono}>Name *</label>
                      <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inputCls} style={f.sans} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[.7rem] font-semibold tracking-wider uppercase text-charcoal mb-2" style={f.mono}>Email *</label>
                      <input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inputCls} style={f.sans} placeholder="jane@company.co.uk" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-[.7rem] font-semibold tracking-wider uppercase text-charcoal mb-2" style={f.mono}>Company *</label>
                    <input type="text" id="company" name="company" required value={formData.company} onChange={handleChange} className={inputCls} style={f.sans} placeholder="Acme Ltd" />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-[.7rem] font-semibold tracking-wider uppercase text-charcoal mb-2" style={f.mono}>What can we help with? *</label>
                    <select id="service" name="service" value={formData.service} onChange={handleChange} className={`${inputCls} appearance-none`} style={f.sans}>
                      {serviceOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[.7rem] font-semibold tracking-wider uppercase text-charcoal mb-2" style={f.mono}>Message *</label>
                    <textarea id="message" name="message" required rows={5} value={formData.message} onChange={handleChange} className={`${inputCls} resize-none`} style={f.sans} placeholder="Tell us a bit about what you are looking for..." />
                  </div>
                  <button type="submit" className="w-full py-3.5 bg-gold hover:bg-gold-light text-navy font-semibold text-sm tracking-wide rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer" style={f.mono}>
                    Send message
                  </button>
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
