# Lone & Co — Website

AI consulting website for UK businesses. 



## Setup

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env.local`:

```
RESEND_API_KEY=your_resend_api_key
```

## Structure

```
app/
  page.tsx              Homepage
  services/page.tsx     Services
  contact/              Contact form
  audit/                Free website audit tool
  privacy/              Privacy policy
  api/audit/            Audit API endpoint
components/
  Navigation.tsx        Hide/show on scroll direction
  Footer.tsx            Editorial footer
  ScrollReveal.tsx      Intersection Observer scroll animations
  CookieConsent.tsx     GDPR cookie banner
  AnalyticsLoader.tsx   GA + Vercel analytics (consent gated)
```

## Deploy

Netlify. Domain: loneco.co.uk (GoDaddy).

Replace `G-XXXXXXXXXX` in `components/AnalyticsLoader.tsx` with your Google Analytics ID.
