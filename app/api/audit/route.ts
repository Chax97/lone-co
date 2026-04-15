import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { Resend } from "resend";

const CURRENT_YEAR = new Date().getFullYear();

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-GB,en;q=0.9",
};

type CheckResult = {
  name: string;
  pass: boolean;
  detail: string;
  penalty: number;
};

function checkHttps(finalUrl: string): CheckResult {
  const pass = finalUrl.startsWith("https://");
  return { name: "HTTPS", pass, detail: pass ? "Secure" : "HTTP only", penalty: pass ? 0 : 15 };
}

function checkViewport($: cheerio.CheerioAPI): CheckResult {
  const pass = $('meta[name="viewport"]').length > 0;
  return { name: "Mobile Viewport", pass, detail: pass ? "Set up" : "Missing viewport meta tag", penalty: pass ? 0 : 20 };
}

function checkCharset($: cheerio.CheerioAPI): CheckResult {
  const pass = $("meta[charset]").length > 0 || $('meta[http-equiv="content-type"]').length > 0;
  return { name: "Charset", pass, detail: pass ? "Declared" : "Missing charset declaration", penalty: pass ? 0 : 5 };
}

function checkLang($: cheerio.CheerioAPI): CheckResult {
  const lang = $("html").attr("lang");
  const pass = !!lang;
  return { name: "Language", pass, detail: pass ? lang! : "Missing lang attribute", penalty: pass ? 0 : 5 };
}

function checkDoctype(html: string): CheckResult {
  const pass = /^\s*<!DOCTYPE\s+html\s*>/i.test(html);
  return { name: "HTML5 Doctype", pass, detail: pass ? "HTML5" : "Missing or legacy doctype", penalty: pass ? 0 : 10 };
}

function checkFavicon($: cheerio.CheerioAPI): CheckResult {
  const pass = $('link[rel*="icon"]').length > 0;
  return { name: "Branded icon in browser tabs", pass, detail: pass ? "Found" : "Missing", penalty: pass ? 0 : 5 };
}

function checkOgTags($: cheerio.CheerioAPI): CheckResult {
  const count = $('meta[property^="og:"]').length;
  const pass = count >= 2;
  return { name: "Link previews on social media", pass, detail: pass ? "Set up" : "Missing", penalty: pass ? 0 : 5 };
}

function checkStructuredData($: cheerio.CheerioAPI): CheckResult {
  const jsonLd = $('script[type="application/ld+json"]').length;
  const microdata = $("[itemscope]").length;
  const pass = jsonLd > 0 || microdata > 0;
  const detail = pass ? (jsonLd > 0 ? `${jsonLd} JSON-LD block${jsonLd > 1 ? "s" : ""}` : `${microdata} microdata item${microdata > 1 ? "s" : ""}`) : "Missing";
  return { name: "Business info Google can read", pass, detail, penalty: pass ? 0 : 5 };
}

function checkCopyrightYear($: cheerio.CheerioAPI): CheckResult {
  const footer = $("footer").text() || $.root().text();
  const matches = footer.match(/(?:©|\(c\)|copyright)\s*\d{4}(?:\s*[-–—]\s*\d{4})?/gi);
  if (!matches) return { name: "Copyright year is current", pass: true, detail: "Not found", penalty: 0 };
  const years: number[] = [];
  for (const m of matches) { const ys = m.match(/\d{4}/g); if (ys) ys.forEach((y) => years.push(parseInt(y))); }
  const latest = Math.max(...years);
  const age = CURRENT_YEAR - latest;
  const pass = age <= 1;
  return { name: "Copyright year is current", pass, detail: pass ? "Current" : `${latest} (${age}yr old)`, penalty: pass ? 0 : (age <= 3 ? 5 : 15) };
}

function checkDeprecatedHtml($: cheerio.CheerioAPI): CheckResult {
  const tags = ["font", "center", "marquee", "blink", "frame", "frameset", "applet", "strike", "tt", "acronym"];
  const found: string[] = [];
  for (const tag of tags) { const count = $(tag).length; if (count) found.push(`<${tag}> x${count}`); }
  const pass = found.length === 0;
  return { name: "No outdated page elements", pass, detail: pass ? "Clean" : found.slice(0, 3).join(", "), penalty: pass ? 0 : Math.min(found.length * 5, 20) };
}

function checkDeprecatedAttributes($: cheerio.CheerioAPI): CheckResult {
  const attrs = ["bgcolor", "cellpadding", "cellspacing", "align", "valign"];
  const found: string[] = [];
  for (const attr of attrs) { const count = $(`[${attr}]`).length; if (count) found.push(`${attr} x${count}`); }
  const pass = found.length === 0;
  return { name: "No outdated formatting", pass, detail: pass ? "Clean" : found.slice(0, 3).join(", "), penalty: pass ? 0 : Math.min(found.length * 3, 15) };
}

function checkTableLayout($: cheerio.CheerioAPI): CheckResult {
  let layoutTables = 0;
  $("table").each((_, el) => { const t = $(el); if (!t.find("th").length && !t.find("caption").length && t.find("div").length > 0) layoutTables++; });
  const pass = layoutTables === 0;
  return { name: "Page structure (not tables)", pass, detail: pass ? "Modern layout" : `${layoutTables} layout table${layoutTables > 1 ? "s" : ""} found`, penalty: pass ? 0 : Math.min(layoutTables * 10, 20) };
}

function checkInlineStyles($: cheerio.CheerioAPI): CheckResult {
  const count = $("[style]").length;
  const pass = count <= 20;
  const detail = count <= 5 ? "Clean" : count <= 20 ? `${count} instances (moderate)` : `${count} instances (excessive)`;
  return { name: "Clean styling approach", pass, detail, penalty: count <= 5 ? 0 : count <= 20 ? 5 : 10 };
}

function checkFlash($: cheerio.CheerioAPI, html: string): CheckResult {
  const has = $('object[type*="flash"]').length > 0 || $('embed[type*="flash"]').length > 0 || /\.swf/i.test(html);
  return { name: "No obsolete plugins", pass: !has, detail: has ? "Flash detected" : "Clean", penalty: has ? 20 : 0 };
}

function checkOutdatedLibs($: cheerio.CheerioAPI): CheckResult {
  const patterns: [string, string][] = [
    ["bootstrap/2.", "Bootstrap 2.x"], ["bootstrap/3.", "Bootstrap 3.x"],
    ["jquery-1.", "jQuery 1.x"], ["jquery-2.", "jQuery 2.x"],
    ["jquery/1.", "jQuery 1.x"], ["jquery/2.", "jQuery 2.x"],
    ["angular.js", "AngularJS 1.x"], ["mootools", "MooTools"],
    ["prototype.js", "Prototype.js"], ["yui", "YUI"],
  ];
  const found: string[] = [];
  const srcs: string[] = [];
  $("script[src]").each((_, el) => { srcs.push(($(el).attr("src") || "").toLowerCase()); });
  $("link[href]").each((_, el) => { srcs.push(($(el).attr("href") || "").toLowerCase()); });
  for (const [pattern, label] of patterns) { if (srcs.some((s) => s.includes(pattern)) && !found.includes(label)) found.push(label); }
  const pass = found.length === 0;
  return { name: "Up to date software", pass, detail: pass ? "Current" : found.slice(0, 3).join(", "), penalty: pass ? 0 : Math.min(found.length * 5, 15) };
}

function checkResponsive($: cheerio.CheerioAPI, html: string): CheckResult {
  const pass = /@media/i.test(html) || ["col-md-", "col-sm-", "container-fluid", "w-full", "md:", "lg:"].some((s) => html.includes(s));
  return { name: "Adapts to all screen sizes", pass, detail: pass ? "Responsive" : "No responsive CSS detected", penalty: pass ? 0 : 10 };
}

function checkModernCss(html: string): CheckResult {
  const found: string[] = [];
  if (/display\s*:\s*flex/i.test(html)) found.push("Flexbox");
  if (/display\s*:\s*grid/i.test(html)) found.push("CSS Grid");
  if (/--[a-z]/.test(html)) found.push("CSS Variables");
  const pass = found.length > 0;
  return { name: "Uses modern design methods", pass, detail: pass ? found.join(", ") : "Older methods (may be in external CSS)", penalty: 0 };
}

function checkPageWeight(size: number): CheckResult {
  const kb = Math.round(size / 1024);
  const pass = kb < 500;
  return { name: "Page file size", pass, detail: `${kb}KB${kb >= 500 ? " (heavy)" : ""}`, penalty: kb < 500 ? 0 : kb < 1000 ? 5 : 10 };
}

function checkResponseTime(ms: number): CheckResult {
  const s = ms / 1000;
  const pass = s < 2;
  return { name: "How fast your server responds", pass, detail: `${s.toFixed(1)}s${s >= 4 ? " (very slow)" : s >= 2 ? " (slow)" : ""}`, penalty: s < 2 ? 0 : s < 4 ? 5 : 10 };
}

function checkCookieConsent($: cheerio.CheerioAPI, html: string): CheckResult {
  // Text/class patterns in HTML
  const htmlPatterns = [
    "cookie-consent", "cookie-notice", "cookie-banner", "cookieconsent",
    "gdpr", "cc-banner", "cookie-law", "cookie_notice", "CookieConsent",
    "cookies-eu", "cookiepro", "onetrust", "cookie-popup", "trustarc",
    "cookiebot", "CookieBot", "cookiefirst", "cookieyes", "cookie-yes",
    "termly", "osano", "klaro", "tarteaucitron", "cookieinformation",
    "iubenda", "complianz", "borlabs", "civic-cookie", "cookiescript",
    "js-cookie", "cookie_bar", "cookie-bar", "cookie-alert", "cookie-wall",
    "we use cookies", "We use cookies", "cookie policy", "Cookie Policy",
    "data-cookieconsent", "data-cookie-consent",
  ];
  // Script src domains used by third-party consent platforms
  const scriptDomains = [
    "cookiebot.com", "cookiepro.com", "cookielaw.org", "onetrust.com",
    "cookiefirst.com", "cookieyes.com", "termly.io", "osano.com",
    "cookie-script.com", "cookieinformation.com", "iubenda.com",
    "trustarc.com", "quantcast.mgr.consensu.org", "cdn.privacy-mgmt.com",
    "consentmanager.net", "usercentrics.eu", "cookiehub.com",
  ];
  const htmlPass = htmlPatterns.some((p) => html.includes(p));
  const scriptPass = scriptDomains.some((domain) =>
    $("script[src]").toArray().some((el) => ($(el).attr("src") ?? "").includes(domain))
  );
  const pass = htmlPass || scriptPass;
  return { name: "Cookie consent banner", pass, detail: pass ? "Found" : "Not found", penalty: pass ? 0 : 3 };
}

function checkAccessibility($: cheerio.CheerioAPI): CheckResult {
  const issues: string[] = [];
  const imgs = $("img");
  const noAlt = imgs.filter((_, el) => !$(el).attr("alt") && $(el).attr("alt") !== "").length;
  if (noAlt > 3) issues.push(`${noAlt} images missing alt text`);
  const skipNav = $('a[href="#main"], a[href="#content"]').length > 0 || $("a").filter((_, el) => /skip/i.test($(el).attr("class") || "")).length > 0;
  if (!skipNav) issues.push("No skip navigation link");
  const h1s = $("h1").length;
  if (h1s === 0) issues.push("No H1 heading");
  else if (h1s > 1) issues.push(`${h1s} H1 headings`);
  const pass = issues.length === 0;
  return { name: "Descriptions on images", pass, detail: pass ? "All present" : issues.join("; "), penalty: pass ? 0 : Math.min(issues.length * 3, 10) };
}

function gradeFromScore(score: number): string {
  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  if (score >= 45) return "D";
  return "F";
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { url, email } = body;
  if (!url || typeof url !== "string") return NextResponse.json({ error: "URL is required" }, { status: 400 });

  let normUrl = url.trim();
  if (!/^https?:\/\//i.test(normUrl)) normUrl = "https://" + normUrl;
  const start = Date.now();

  try {
    const response = await fetch(normUrl, { headers: HEADERS, redirect: "follow", signal: AbortSignal.timeout(12000) });
    const elapsed = Date.now() - start;
    const html = await response.text();
    const finalUrl = response.url;
    const $ = cheerio.load(html);

    const checks: CheckResult[] = [
      checkHttps(finalUrl), checkViewport($), checkDoctype(html), checkCharset($), checkLang($),
      checkFavicon($), checkOgTags($), checkStructuredData($), checkCopyrightYear($),
      checkDeprecatedHtml($), checkDeprecatedAttributes($), checkTableLayout($), checkInlineStyles($),
      checkFlash($, html), checkOutdatedLibs($), checkResponsive($, html), checkModernCss(html),
      checkPageWeight(html.length), checkResponseTime(elapsed), checkCookieConsent($, html), checkAccessibility($),
    ];

    const totalPenalty = checks.reduce((sum, c) => sum + c.penalty, 0);
    const score = Math.max(0, 100 - totalPenalty);

    const categories = [
      { name: "Security & Compliance", checks: ["HTTPS", "Cookie consent banner"] },
      { name: "Search Visibility", checks: ["Mobile Viewport", "Charset", "Language", "Branded icon in browser tabs", "Link previews on social media", "Business info Google can read"] },
      { name: "Code Health", checks: ["HTML5 Doctype", "No outdated page elements", "No outdated formatting", "Page structure (not tables)", "Clean styling approach", "No obsolete plugins", "Up to date software"] },
      { name: "Loading Speed", checks: ["Page file size", "How fast your server responds"] },
      { name: "Accessibility", checks: ["Descriptions on images"] },
      { name: "Modern Standards", checks: ["Adapts to all screen sizes", "Uses modern design methods", "Copyright year is current"] },
    ];

    const checkMap = Object.fromEntries(checks.map((c) => [c.name, c]));

    const auditCategories = categories.map((cat) => {
      const items = cat.checks.map((name) => checkMap[name]).filter(Boolean).map((c) => ({
        label: c.name, status: c.pass ? "pass" : c.penalty <= 5 ? "warn" : "fail", note: c.detail, detail: c.detail,
      }));
      const itemScore = (s: string) => s === "pass" ? 100 : s === "warn" ? 60 : 0;
      const catScore = Math.round(items.reduce((sum, i) => sum + itemScore(i.status), 0) / Math.max(items.length, 1));
      return { name: cat.name, score: catScore, grade: gradeFromScore(catScore), summary: "", items };
    });

    const summaries: Record<string, string> = {
      "Security & Compliance": checkMap["HTTPS"]?.pass
        ? "Your site has a secure connection. We also checked whether you have a cookie consent banner."
        : "Your site is missing a secure connection. Visitors see a 'Not Secure' warning in their browser.",
      "Search Visibility": "The signals that help Google understand your business and display your site properly in search results.",
      "Code Health": "The quality of the code your website is built with. Outdated code makes your site slower and harder to update.",
      "Loading Speed": "How fast your site loads affects how many visitors stay and how Google ranks you.",
      "Accessibility": "Whether everyone can use your site, including people with disabilities.",
      "Modern Standards": "Whether your site looks and works like it was built recently.",
    };
    auditCategories.forEach((cat) => { cat.summary = summaries[cat.name] || ""; });

    const displayScore = Math.round(auditCategories.reduce((sum, c) => sum + c.score, 0) / auditCategories.length);
    const overallGrade = gradeFromScore(displayScore);

    if (email && typeof email === "string") {
      const statusIcon = (s: string) => s === "pass" ? "✅" : s === "warn" ? "⚠️" : "❌";
      const categoryRows = auditCategories.map((cat) => `
        <tr><td colspan="2" style="padding: 18px 0 6px; font-family: Georgia, serif; font-size: 15px; font-weight: bold; color: #1E3A5F; border-top: 1px solid #E8E4DE;">${cat.name} — Grade ${cat.grade}</td></tr>
        ${cat.items.map((item) => `<tr><td style="padding: 4px 0; font-size: 13px; color: #404048;">${statusIcon(item.status)} ${item.label}</td><td style="padding: 4px 0 4px 16px; font-size: 13px; color: #8A8680; text-align: right;">${item.detail || ""}</td></tr>`).join("")}
      `).join("");

      const emailHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF8F4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF8F4;padding:40px 20px;"><tr><td>
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,.08);">
<tr><td style="background:#1E3A5F;padding:36px 40px;text-align:center;">
<p style="margin:0 0 8px;font-size:11px;font-weight:bold;letter-spacing:.12em;text-transform:uppercase;color:#C5A55A;">Free Website Audit</p>
<h1 style="margin:0 0 6px;font-family:Georgia,serif;font-size:28px;color:#fff;font-weight:normal;">Your audit results</h1>
<p style="margin:0;font-size:13px;color:rgba(255,255,255,.4);">${finalUrl}</p>
</td></tr>
<tr><td style="padding:36px 40px 28px;text-align:center;border-bottom:1px solid #E8E4DE;">
<p style="margin:0 0 4px;font-size:72px;font-family:Georgia,serif;font-weight:bold;color:${displayScore >= 75 ? "#C5A55A" : displayScore >= 60 ? "#8A8680" : "#ef4444"};line-height:1;">${overallGrade}</p>
<p style="margin:0;font-size:14px;color:#8A8680;">Overall score: ${displayScore}/100</p>
</td></tr>
<tr><td style="padding:28px 40px;"><table width="100%" cellpadding="0" cellspacing="0">${categoryRows}</table></td></tr>
<tr><td style="padding:0 40px 40px;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#1E3A5F;border-radius:10px;padding:28px 32px;"><tr><td>
<h2 style="margin:0 0 10px;font-family:Georgia,serif;font-size:20px;color:#fff;font-weight:normal;">Want us to fix these?</h2>
<p style="margin:0 0 20px;font-size:13px;line-height:1.6;color:rgba(255,255,255,.5);">Book a free 30 minute call and we will walk you through what needs fixing.</p>
<div style="text-align:center;"><a href="https://calendly.com/loneandco/30min" style="display:inline-block;padding:12px 28px;background:#C5A55A;color:#1E3A5F;font-size:13px;font-weight:bold;text-decoration:none;border-radius:8px;">Book a free call</a></div>
</td></tr></table>
</td></tr>
<tr><td style="padding:20px 40px 32px;text-align:center;border-top:1px solid #E8E4DE;">
<p style="margin:0;font-size:11px;color:#8A8680;">Lone &amp; Co · AI Consulting for UK Businesses · <a href="https://loneco.co.uk" style="color:#C5A55A;">loneco.co.uk</a></p>
</td></tr>
</table></td></tr></table></body></html>`;

      await resend.emails.send({
        from: "Lone & Co <hello@loneco.co.uk>",
        to: email,
        subject: `Your website audit results — Grade ${overallGrade} (${displayScore}/100)`,
        html: emailHtml,
      });
    }

    if (process.env.GOOGLE_SHEET_URL) {
      try {
        await fetch(process.env.GOOGLE_SHEET_URL, {
          method: "POST",
          body: JSON.stringify({
            type: "audit",
            url: normUrl,
            email,
            visitors: body.visitors || "",
            avgVal: body.avgVal || "",
            score: displayScore,
            grade: overallGrade,
          }),
        });
      } catch {
        // Don't block the audit response if sheets fails
      }
    }

    return NextResponse.json({ categories: auditCategories, score: displayScore, grade: overallGrade, finalUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Could not scan site: ${message}` }, { status: 500 });
  }
}
