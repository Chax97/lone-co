import type { Metadata } from "next";
import { Syne, DM_Sans, Outfit } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import BottomNav from "@/components/BottomNav";
import Preloader from "@/components/Preloader";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsLoader from "@/components/AnalyticsLoader";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lone & Co — AI Consulting for UK Businesses",
  description: "We help UK businesses figure out where AI actually makes sense — and then we build it.",
  metadataBase: new URL("https://loneco.co.uk"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${syne.variable} ${outfit.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-charcoal">
        <Preloader />
        <Navigation />
        <BottomNav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <AnalyticsLoader />
      </body>
    </html>
  );
}
