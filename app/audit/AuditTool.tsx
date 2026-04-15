"use client";

import React, { useState, useRef } from "react";
import { ShieldCheckIcon, MagnifyingGlassIcon, CodeIcon, LightningIcon, PersonArmsSpreadIcon, MonitorIcon } from "@phosphor-icons/react";

/* ── Flip card ── */
function FlipCard({
  title,
  desc,
  Icon,
  fh,
  fb,
}: {
  title: string;
  desc: React.ReactNode;
  Icon: React.ElementType;
  fh: React.CSSProperties;
  fb: React.CSSProperties;
}) {
  const [flipped, setFlipped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setFlipped(true);
  };

  const handleLeave = () => {
    // Small delay so a quick swipe doesn't snap back before the flip settles
    timerRef.current = setTimeout(() => setFlipped(false), 80);
  };

  return (
    <div
      className="h-52 cursor-default"
      style={{ perspective: "1200px" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className="relative w-full h-full [transform-style:preserve-3d]"
        style={{
          transition: "transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 bg-white border border-light-gray rounded-xl flex flex-col items-center justify-center gap-4 px-6 [backface-visibility:hidden]">
          <Icon size={32} weight="light" className="text-gold" />
          <h3 className="text-lg font-semibold text-obsidian text-center" style={fh}>
            {title}
          </h3>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-xl flex items-center justify-center px-7 [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ background: "linear-gradient(160deg, var(--slate) 0%, #7B8AF7 40%, var(--slate) 100%)" }}
        >
          <p className="text-sm text-white/80 leading-relaxed text-center" style={fb}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Types ── */
type Status = "pass" | "warn" | "fail";
type Grade = "A" | "B" | "C" | "D" | "F";

type AuditItem = {
  label: string;
  status: Status;
  note: string;
  detail?: string;
};

type AuditCategory = {
  name: string;
  score: number;
  grade: Grade;
  summary: string;
  items: AuditItem[];
};

type RevenueImpact = {
  risk?: boolean;
  opp?: boolean;
  cost?: number;
  gain?: number;
};

/* ── Helpers ── */
function gradeFromScore(s: number): Grade {
  if (s >= 90) return "A";
  if (s >= 75) return "B";
  if (s >= 60) return "C";
  if (s >= 45) return "D";
  return "F";
}

const gradeColour: Record<Grade, string> = {
  A: "text-gold",
  B: "text-gold",
  C: "text-warm-gray",
  D: "text-warm-gray",
  F: "text-red-500",
};

function getVisitorCount(v: string): number {
  switch (v) {
    case "Under 500": return 250;
    case "500 - 2,000": return 1250;
    case "2,000 - 10,000": return 6000;
    case "Over 10,000": return 15000;
    default: return 800;
  }
}

function roundTo10(n: number): number {
  return Math.max(0, Math.round(n / 10) * 10);
}

function calcRevenue(cat: string, vis: string, avg: string): RevenueImpact {
  const v = getVisitorCount(vis);
  const a = avg ? Math.max(0, parseFloat(avg) || 500) : 500;
  const b = v * 0.02;
  switch (cat) {
    case "Security & Compliance": { const c = roundTo10(b * 0.15 * a); return { cost: c, gain: c }; }
    case "Search Visibility": { const c = roundTo10(v * 0.35 * 0.02 * a); return { cost: c, gain: c }; }
    case "Code Health": return { risk: true };
    case "Loading Speed": { const c = roundTo10(b * 0.20 * a); return { cost: c, gain: c }; }
    case "Accessibility": return { risk: true };
    case "Modern Standards": { const o = roundTo10(b * 0.12 * a); return { opp: true, gain: o }; }
    default: return {};
  }
}

const proposalMap: Record<string, { impact: string; urgency: string }> = {
  "Security & Compliance": {
    impact: "Visitors see a 'Not Secure' warning and leave before reading a single word. Google actively penalises unsecured sites in search rankings. Every day this is unresolved is a day you are losing visitors to competitors who have fixed it.",
    urgency: "This is also a legal issue. UK businesses that use any form of tracking without a cookie consent banner are in breach of data protection law and risk ICO enforcement action.",
  },
  "Search Visibility": {
    impact: "Google is missing the basic signals it needs to understand what your business does. That means your site ranks lower than it should, and when someone shares your link it looks like a plain URL rather than a professional listing.",
    urgency: "Every week this is unfixed, competitors with better signals are appearing above you in results your potential customers are searching right now.",
  },
  "Code Health": {
    impact: "Outdated code slows your site down, creates security vulnerabilities, and makes every future change more expensive. Problems like this do not stay the same. They compound. The longer they are left, the more they cost to fix.",
    urgency: "If your site is ever hacked or taken down due to outdated software, recovery costs are significantly higher than prevention.",
  },
  "Loading Speed": {
    impact: "For every extra second your site takes to load, around 20% of visitors leave before seeing anything. That is not a statistic. That is real enquiries going to a competitor whose site loaded faster.",
    urgency: "Google uses page speed as a ranking signal. A slow site does not just lose visitors directly. It also ranks lower, meaning fewer people find it in the first place.",
  },
  "Accessibility": {
    impact: "Around 1 in 5 people in the UK have a disability that affects how they use the web. If your site does not work for them, you are turning away a significant portion of potential customers without even knowing it.",
    urgency: "Accessibility failures also suppress your search ranking. Google interprets an inaccessible site as a lower quality result and shows it to fewer people.",
  },
  "Modern Standards": {
    impact: "Visitors form a judgement about your business within seconds of landing on your site. An outdated, inconsistent site tells them your business operates the same way. Before you have had a chance to say a word.",
    urgency: "In most industries, your website is the first point of contact. If it does not reflect the quality of your business, you are losing potential customers to competitors whose sites do.",
  },
};

/* ── Status icon ── */
function StatusIcon({ status }: { status: Status }) {
  const base = "inline-flex items-center justify-center w-[22px] h-[22px] rounded-full flex-shrink-0";
  if (status === "pass") return (
    <span className={`${base} bg-gold/[.12] text-gold`}>
      <svg className="w-[11px] h-[11px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
    </span>
  );
  if (status === "warn") return (
    <span className={`${base} bg-warm-gray/[.12] text-warm-gray`}>
      <svg className="w-[11px] h-[11px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v4m0 4h.01" /></svg>
    </span>
  );
  return (
    <span className={`${base} bg-red-500/10 text-red-500`}>
      <svg className="w-[11px] h-[11px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
    </span>
  );
}


/* ── Scan step labels ── */
const scanStepLabels = [
  "Checking site security",
  "Testing search visibility",
  "Reviewing code health",
  "Measuring loading speed",
  "Testing accessibility",
  "Checking modern standards",
];

/* ── Main component ── */
export default function AuditPage() {
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [visitors, setVisitors] = useState("");
  const [avgVal, setAvgVal] = useState("");
  const [step, setStep] = useState<"input" | "scanning" | "results">("input");
  const [results, setResults] = useState<AuditCategory[]>([]);
  const [progress, setProgress] = useState(0);
  const [scanStep, setScanStep] = useState(0);
  const [auditError, setAuditError] = useState<string | null>(null);

  const handleAudit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let normUrl = url.trim();
    if (!/^https?:\/\//i.test(normUrl)) normUrl = "https://" + normUrl;
    setUrl(normUrl);
    setStep("scanning");
    setProgress(0);
    setScanStep(0);
    setAuditError(null);

    const ticks = [
      { p: 10, s: 0, d: 300 }, { p: 22, s: 0, d: 800 },
      { p: 35, s: 1, d: 1400 }, { p: 48, s: 2, d: 2000 },
      { p: 62, s: 3, d: 2600 }, { p: 78, s: 4, d: 3200 },
      { p: 90, s: 5, d: 3800 },
    ];
    const timers: ReturnType<typeof setTimeout>[] = [];
    ticks.forEach(({ p, s, d }) => {
      timers.push(setTimeout(() => { setProgress(p); setScanStep(s); }, d));
    });

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normUrl, email }),
      });
      const data = await res.json();
      timers.forEach(clearTimeout);

      if (!res.ok || data.error) {
        setAuditError(data.error || "Something went wrong. Please try again.");
        setStep("input");
        return;
      }

      setProgress(100);
      setScanStep(5);
      setTimeout(() => {
        setResults(data.categories);
        setStep("results");
        setTimeout(() => {
          const el = document.getElementById("audit-results");
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 50);
      }, 600);
    } catch {
      timers.forEach(clearTimeout);
      setAuditError("Could not reach the server. Please check your connection and try again.");
      setStep("input");
    }
  };

  const resetAudit = () => {
    setStep("input");
    setUrl("");
    setEmail("");
    setVisitors("");
    setAvgVal("");
    setResults([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const overallScore = results.length > 0
    ? Math.round(results.reduce((sum, c) => sum + c.score, 0) / results.length)
    : 0;
  const overallGrade = gradeFromScore(overallScore);
  const totalChecks = results.reduce((n, c) => n + c.items.length, 0);
  const totalPass = results.reduce((n, c) => n + c.items.filter((i) => i.status === "pass").length, 0);
  const totalFail = results.reduce((n, c) => n + c.items.filter((i) => i.status === "fail").length, 0);
  const proposalCategories = results.length > 0
    ? [...results].filter((c) => c.score <= 80).sort((a, b) => a.score - b.score).slice(0, 4)
    : [];

  const fd = { fontFamily: "var(--font-display), serif" };
  const fh = { fontFamily: "var(--font-heading), sans-serif" };
  const fb = { fontFamily: "var(--font-body), sans-serif" };

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative bg-obsidian overflow-hidden">
        <div className="absolute inset-0 opacity-[.04] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "200px" }} />
        {/* Left-side accent — stays behind copy, away from form */}
        <div className="hidden lg:block absolute pointer-events-none" style={{
          top: "-10%", left: "-8%", width: "52%", height: "120%",
          background: "linear-gradient(160deg, var(--slate) 0%, #7B8AF7 40%, var(--slate) 100%)",
          clipPath: "polygon(0% 0%, 80% 0%, 100% 100%, 0% 100%)",
          zIndex: 0,
        }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-36 pb-20 lg:pt-44 lg:pb-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center w-full">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-5" style={fd}>
              Is your website costing you customers?
            </h1>
            <p className="text-base leading-relaxed text-white/80 max-w-[440px] mx-auto lg:mx-0" style={fb}>
              21 checks. 60 seconds. We find the problems that drive visitors away, hurt your Google ranking, and lose you enquiries.
            </p>
          </div>

          {/* Right: form / scanning */}
          {step === "input" && (
            <div className="bg-white/[.04] border border-white/[.08] rounded-xl p-8">
              <h2 className="text-lg text-white mb-1" style={fd}>Audit your website</h2>
              <p className="text-sm text-white/35 mb-6" style={fb}>Instant report. No account needed.</p>
              <form onSubmit={handleAudit} className="space-y-4">
                <div>
                  <label className="block text-[.7rem] font-semibold tracking-wider uppercase text-white/40 mb-1.5" style={fh}>Website URL *</label>
                  <input type="text" required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourcompany.co.uk" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-gold transition-colors placeholder:text-white/20" style={fb} />
                </div>
                <div>
                  <label className="block text-[.7rem] font-semibold tracking-wider uppercase text-white/40 mb-1.5" style={fh}>Email address *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.co.uk" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-gold transition-colors placeholder:text-white/20" style={fb} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[.7rem] font-semibold tracking-wider uppercase text-white/40 mb-1.5" style={fh}>Monthly visitors</label>
                    <select value={visitors} onChange={(e) => setVisitors(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-gold transition-colors appearance-none cursor-pointer" style={{ ...fb, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,.4)' stroke-width='2.5'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center" }}>
                      <option value="" className="bg-[#1E1E24]">Not sure</option>
                      <option value="Under 500" className="bg-[#1E1E24]">Under 500</option>
                      <option value="500 - 2,000" className="bg-[#1E1E24]">500 - 2,000</option>
                      <option value="2,000 - 10,000" className="bg-[#1E1E24]">2,000 - 10,000</option>
                      <option value="Over 10,000" className="bg-[#1E1E24]">Over 10,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[.7rem] font-semibold tracking-wider uppercase text-white/40 mb-1.5" style={fh}>Avg. customer value</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 text-sm pointer-events-none">£</span>
                      <input type="text" inputMode="numeric" value={avgVal} onChange={(e) => setAvgVal(e.target.value.replace(/[^0-9]/g, ""))} placeholder="e.g. 500" className="w-full pl-7 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-gold transition-colors placeholder:text-white/20" style={fb} />
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full py-3.5 bg-gold hover:bg-gold-light text-white font-bold text-sm tracking-wide rounded-lg transition-all hover:-translate-y-0.5 cursor-pointer" style={fh}>
                  Run free audit
                </button>
                {auditError && (
                  <p className="text-sm text-red-400 text-center" style={fb}>{auditError}</p>
                )}
                <p className="text-center text-[.72rem] text-white" style={fb}>Free. Instant. No credit card required.</p>
              </form>
            </div>
          )}

          {step === "scanning" && (
            <div className="bg-white/[.04] border border-white/[.08] rounded-xl p-8 text-center">
              <div className="w-12 h-12 rounded-full border-[3px] border-gold/15 border-t-gold animate-spin mx-auto mb-6" />
              <p className="text-base text-white mb-3 break-all" style={fd}>{url}</p>
              <ul className="text-left max-w-[260px] mx-auto mb-6 space-y-1">
                {scanStepLabels.map((label, i) => (
                  <li key={label} className={`text-[.78rem] pl-6 relative transition-colors ${i < scanStep ? "text-white/40" : i === scanStep ? "text-gold" : "text-white/20"}`}>
                    <span className="absolute left-0 text-[.6rem] leading-[1.6]">
                      {i < scanStep ? "✓" : i === scanStep ? "◉" : "○"}
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
              <div className="w-full h-1 bg-white/[.06] rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[.72rem] text-white/25 mt-2">{progress}% complete</p>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/15" />
      </section>

      {/* ═══ RESULTS ═══ */}
      {step === "results" && (
        <section id="audit-results" className="bg-cream pb-20">
          <div className="max-w-[720px] mx-auto px-6">
            {/* Overall score */}
            <div className="bg-obsidian rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 -mt-10 relative z-10">
              <div className="text-center sm:text-left">
                <p className="text-[.7rem] font-semibold tracking-[.12em] uppercase text-gold mb-1" style={fh}>Website health score</p>
                <p className="text-lg text-white break-all" style={fd}>{url}</p>
                <p className="text-[.78rem] text-white/35 mt-1">Scanned {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {totalPass}/{totalChecks} passed · {totalFail} issue{totalFail !== 1 ? "s" : ""} found</p>
              </div>
              <div className="text-center flex-shrink-0">
                <p className={`text-6xl font-bold ${gradeColour[overallGrade]}`} style={fd}>{overallGrade}</p>
                <p className="text-white/35 text-sm mt-0.5">{overallScore}/100</p>
              </div>
            </div>

            {/* Category cards */}
            {results.map((cat) => {
              const pass = cat.items.filter((i) => i.status === "pass").length;
              return (
                <div key={cat.name} className="bg-white border border-light-gray rounded-xl overflow-hidden mt-4">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-light-gray">
                    <span className="text-base font-semibold text-obsidian" style={fd}>{cat.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-warm-gray" style={fb}>{pass}/{cat.items.length} passed</span>
                      <span className={`text-xl font-bold ${gradeColour[cat.grade]}`} style={fd}>{cat.grade}</span>
                    </div>
                  </div>
                  <div className="px-6 py-3 text-sm text-warm-gray leading-relaxed border-b border-light-gray bg-cream/50" style={fb}>{cat.summary}</div>
                  <ul>
                    {cat.items.map((item) => (
                      <li key={item.label} className="flex items-start gap-3 px-6 py-3 border-b border-light-gray last:border-b-0">
                        <div className="mt-0.5"><StatusIcon status={item.status} /></div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-obsidian" style={fh}>
                            {item.label}
                            {item.detail && <span className="inline ml-1.5 text-[.7rem] text-warm-gray bg-warm-gray/[.08] px-1.5 py-0.5 rounded font-mono">{item.detail}</span>}
                          </p>
                          <p className="text-xs text-warm-gray mt-0.5 leading-relaxed" style={fb}>{item.note}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {/* Proposal */}
            {proposalCategories.length > 0 && (
              <div className="bg-white border border-light-gray rounded-xl overflow-hidden mt-4">
                <div className="px-6 py-5 border-b border-light-gray">
                  <p className="text-xs font-semibold tracking-[.12em] uppercase text-gold mb-1" style={fh}>What needs fixing</p>
                  <h3 className="text-lg font-bold text-obsidian" style={fd}>These issues are costing you customers</h3>
                  <p className="text-sm text-warm-gray mt-1 leading-relaxed" style={fb}>Your lowest scoring areas and what they mean for your business right now.</p>
                </div>
                {proposalCategories.map((cat, i) => {
                  const proposal = proposalMap[cat.name];
                  if (!proposal) return null;
                  const rev = calcRevenue(cat.name, visitors, avgVal);
                  return (
                    <div key={cat.name} className="flex gap-4 px-6 py-5 border-b border-light-gray">
                      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gold text-obsidian flex items-center justify-center text-xs font-bold mt-0.5" style={fh}>{i + 1}</div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-obsidian mb-2" style={fh}>{cat.name} · score {cat.score}/100</p>
                        <p className="text-sm text-charcoal leading-relaxed mb-2" style={fb}>{proposal.impact}</p>
                        {rev.cost != null && !rev.risk && !rev.opp && (
                          <div className="bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5 mb-2 space-y-1">
                            <p className="text-xs text-charcoal" style={fb}>Estimated monthly cost of inaction: ~<b>£{(rev.cost ?? 0).toLocaleString("en-GB")}</b></p>
                            <p className="text-xs text-charcoal" style={fb}>Potential monthly recovery: ~<b>£{(rev.gain ?? 0).toLocaleString("en-GB")}</b></p>
                          </div>
                        )}
                        {rev.opp && (
                          <div className="bg-red-50 border border-red-100 rounded-lg px-3.5 py-2.5 mb-2">
                            <p className="text-xs text-charcoal" style={fb}>Estimated monthly opportunity being missed: ~<b>£{(rev.gain ?? 0).toLocaleString("en-GB")}</b></p>
                          </div>
                        )}
                        <p className="text-sm text-warm-gray leading-relaxed italic" style={fb}>{proposal.urgency}</p>
                      </div>
                    </div>
                  );
                })}
                <p className="px-6 py-3 text-[.7rem] text-warm-gray border-b border-light-gray" style={fb}>* Estimates based on UK averages. Actual figures vary by industry.</p>
                <div className="px-6 py-6 text-center bg-cream/50">
                  <p className="text-sm text-obsidian mb-1 font-semibold" style={fh}>Ready to fix this?</p>
                  <p className="text-sm text-warm-gray mb-4 leading-relaxed" style={fb}>Book a free 30 minute call and we will walk through exactly what needs doing and what it would cost.</p>
                  <a href="https://calendly.com/loneandco/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-7 py-3 bg-gold hover:bg-gold-light text-obsidian font-semibold text-sm tracking-wide rounded-lg transition-all hover:-translate-y-0.5 no-underline" style={fh}>Book a free call</a>
                </div>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="bg-obsidian rounded-xl p-10 mt-4 text-center">
                <h3 className="text-2xl text-white mb-3" style={fd}>Want us to do a deep dive?</h3>
                <p className="text-sm text-white/45 mb-8 leading-relaxed max-w-sm mx-auto" style={fb}>Our full expert audit covers every page, looks at what your competitors are doing, and gives you a clear action plan.</p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <a href="https://calendly.com/loneandco/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-7 py-3 bg-gold hover:bg-gold-light text-obsidian font-semibold text-sm rounded-lg transition-all hover:-translate-y-0.5 no-underline" style={fh}>Get the full audit</a>
                  <button onClick={resetAudit} className="inline-flex items-center px-7 py-3 border border-white/15 hover:border-white/30 text-white/70 font-semibold text-sm rounded-lg transition-all cursor-pointer bg-transparent" style={fh}>Audit another site</button>
                </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ WHAT WE CHECK ═══ */}
      {step !== "results" && (
        <section className="bg-cream py-20 lg:py-28 border-t border-light-gray">
          <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
            <div className="text-center mb-14">
              <h2 className="text-3xl sm:text-4xl font-bold text-obsidian mb-4" style={fd}>
                We check what actually costs you money
              </h2>
              <p className="text-base text-warm-gray max-w-[480px] mx-auto" style={fb}>
                Most website issues are invisible until they show up as lost enquiries. We surface all of them.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {([
                {
                  title: "Security & Compliance",
                  desc: <>If your site shows a <span className="text-white font-semibold">'Not Secure' warning</span>, visitors leave before they read a word. You also risk <span className="text-white font-semibold">fines under UK data protection law</span>.</>,
                  Icon: ShieldCheckIcon,
                },
                {
                  title: "Search Visibility",
                  desc: <>Without the right signals, <span className="text-white font-semibold">Google ranks you below competitors</span>. Customers searching for what you sell find <span className="text-white font-semibold">someone else first</span>.</>,
                  Icon: MagnifyingGlassIcon,
                },
                {
                  title: "Code Health",
                  desc: <>Outdated code <span className="text-white font-semibold">slows everything down</span> and makes every future change <span className="text-white font-semibold">more expensive</span>. Problems like this compound the longer they are left.</>,
                  Icon: CodeIcon,
                },
                {
                  title: "Loading Speed",
                  desc: <>For every extra second your site takes to load, roughly <span className="text-white font-semibold">1 in 5 visitors leave</span>. That is real <span className="text-white font-semibold">enquiries going to whoever loaded faster</span>.</>,
                  Icon: LightningIcon,
                },
                {
                  title: "Accessibility",
                  desc: <>Around <span className="text-white font-semibold">1 in 5 people in the UK</span> have a disability affecting how they use the web. If your site does not work for them, you are <span className="text-white font-semibold">turning away customers</span> without knowing it.</>,
                  Icon: PersonArmsSpreadIcon,
                },
                {
                  title: "Modern Standards",
                  desc: <>Visitors <span className="text-white font-semibold">judge your business in seconds</span>. If your site looks outdated, they assume your service is too, and <span className="text-white font-semibold">they move on</span>.</>,
                  Icon: MonitorIcon,
                },
              ] as { title: string; desc: React.ReactNode; Icon: React.ElementType }[]).map(({ title, desc, Icon }) => (
                <FlipCard key={title} title={title} desc={desc} Icon={Icon} fh={fh} fb={fb} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
