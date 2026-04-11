import type { Metadata } from "next";
import { Montserrat, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsLoader from "@/components/AnalyticsLoader";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lone & Co — AI Consulting for UK Businesses",
  description: "We help UK businesses figure out where AI actually makes sense — and then we build it.",
  metadataBase: new URL("https://loneco.co.uk"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${montserrat.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col bg-cream text-charcoal">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <AnalyticsLoader />
      </body>
    </html>
  );
}
