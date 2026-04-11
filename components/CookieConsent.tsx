"use client";

import { useState, useEffect, useCallback } from "react";

const COOKIE_NAME = "lone_co_consent";
const COOKIE_DAYS = 365;

function getConsent(): "granted" | "denied" | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  const val = match[1];
  return val === "granted" || val === "denied" ? val : null;
}

function setConsent(value: "granted" | "denied") {
  const expires = new Date(Date.now() + COOKIE_DAYS * 864e5).toUTCString();
  document.cookie = `${COOKIE_NAME}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export function useConsent() {
  const [consent, setConsentState] = useState<"granted" | "denied" | null>(null);
  useEffect(() => { setConsentState(getConsent()); }, []);
  const grant = useCallback(() => { setConsent("granted"); setConsentState("granted"); }, []);
  const deny = useCallback(() => { setConsent("denied"); setConsentState("denied"); }, []);
  return { consent, grant, deny };
}

export default function CookieConsent() {
  const { consent, grant, deny } = useConsent();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (consent === null) {
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, [consent]);

  if (consent !== null) return null;

  const font = {
    sans: { fontFamily: "var(--font-inter, 'Helvetica Neue', Arial, sans-serif)" },
    mono: { fontFamily: "var(--font-montserrat, 'Helvetica Neue', Arial, sans-serif)" },
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[200] transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
      <div className="max-w-[580px] mx-auto px-4 pb-4 sm:pb-6">
        <div className="bg-[#1E1E24] border border-white/10 rounded-xl p-6 shadow-[0_-4px_40px_rgba(0,0,0,.25)]">
          <p className="text-sm text-white/60 leading-relaxed mb-1" style={font.sans}>
            We use cookies to understand how people use our site.
          </p>
          <p className="text-xs text-white/30 leading-relaxed mb-4" style={font.sans}>
            Google Analytics and Vercel Analytics. Only loaded if you accept.{" "}
            <a href="/privacy" className="text-[#C5A55A] underline">Privacy policy</a>.
          </p>
          <div className="flex gap-3">
            <button onClick={() => { grant(); setVisible(false); }} className="flex-1 sm:flex-none px-5 py-2 bg-[#C5A55A] hover:bg-[#D4B76A] text-[#1E1E24] font-semibold text-sm rounded-lg transition-all cursor-pointer" style={font.mono}>Accept</button>
            <button onClick={() => { deny(); setVisible(false); }} className="flex-1 sm:flex-none px-5 py-2 border border-white/15 hover:border-white/30 text-white/70 font-semibold text-sm rounded-lg transition-all cursor-pointer bg-transparent" style={font.mono}>Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
}
