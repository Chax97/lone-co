import type { Metadata } from "next";
import Link from "next/link";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Lone & Co — AI Consulting for UK Businesses",
  description: "We help UK businesses figure out where AI actually makes sense — and then we build it. Based in London.",
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lone & Co",
  url: "https://loneco.co.uk",
  description: "AI consultancy helping UK SMEs implement practical AI solutions.",
  address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  contactPoint: { "@type": "ContactPoint", email: "hello@loneandco.co.uk", contactType: "customer service" },
  foundingDate: "2026",
  areaServed: "GB",
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <HomeClient />
    </>
  );
}
