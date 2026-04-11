"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";

const COOKIE_NAME = "lone_co_consent";
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // Replace with your actual ID

function getConsent(): "granted" | "denied" | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  const val = match[1];
  return val === "granted" || val === "denied" ? val : null;
}

export default function AnalyticsLoader() {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);

  useEffect(() => {
    setConsent(getConsent());
    const interval = setInterval(() => {
      const current = getConsent();
      if (current !== null) { setConsent(current); clearInterval(interval); }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  if (consent !== "granted") return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });`}
      </Script>
      <VercelAnalytics />
    </>
  );
}
