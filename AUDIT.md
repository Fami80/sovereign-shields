# Site Audit — uaeworkright.vercel.app

**Date:** 2 July 2026 · **Scope:** full codebase (`main` @ `e2a3b1d`) + live deployment
**Areas:** UX/UI · Accessibility · Security · SEO · Performance · Code quality · Content/Legal

---

## Executive summary

The site is in good shape overall: modern stack (React 19, TanStack Start SSG, Tailwind 4), pages are prerendered for SEO, security headers are in place, a same-origin API proxy protects form delivery from ad blockers, and a previous WCAG pass fixed most contrast issues. No secrets are committed and the attack surface is small.

However, there are **3 launch-blocking issues** — the custom domain every canonical/OG URL points to is a *parked Namecheap page*, the privacy policy contains a literal `[KAOUTAR TO CONFIRM…]` placeholder in production, and brand fonts never load on any page except the homepage. Below is everything found, ordered by severity.

---

## 🔴 Critical (fix before promoting the site)

### C1. `uaeworkrights.com` is not connected — all SEO signals point to a parked domain
- Every page's `rel=canonical`, `og:url`, `og:image`, the sitemap URLs, and `robots.txt`'s `Sitemap:` line point to `https://uaeworkrights.com/…`.
- That domain currently resolves to **198.54.117.242 (Namecheap parking)** — it is not attached to the Vercel project (project domains are only `*.vercel.app`).
- Consequences right now:
  - Search engines are told "the real page lives on a domain that serves a parking page" → the deployed site effectively refuses to be indexed under its own URL.
  - **Social/WhatsApp link previews are broken**: `og:image` = `https://uaeworkrights.com/assets/og-hero-….jpg` → 404/parking. For a business acquiring clients through WhatsApp/Instagram, this is a real revenue leak.
- **Fix:** add `uaeworkrights.com` to the Vercel project and point DNS at Vercel *or*, until then, generate canonical/OG/sitemap URLs from the actual deployment origin (e.g. a `SITE_URL` constant set to the vercel.app URL).

### C2. Privacy policy ships an unfinished placeholder
- `src/routes/privacy.tsx:93` renders literally, in production:
  > "…for a limited period thereafter to handle any follow-up questions. **[KAOUTAR TO CONFIRM: specific retention period]**."
- For a brand whose entire pitch is compliance rigor and trust, a visibly unfinished legal page is the single most damaging copy bug on the site. Decide the retention period and state it.

### C3. Privacy policy contradicts the actual data flow (PDPL exposure)
- The policy claims data is "never shared with … any third party without your explicit written consent" and asserts UAE PDPL compliance (`privacy.tsx:112, 131`).
- In reality every form submission (name, email, WhatsApp number, description of an employment dispute) is forwarded to **HubSpot** (`api/contact.ts` → `forms.hubspot.com`), a third-party processor, with an `hs_context` fallback direct from the browser.
- This isn't a reason to stop using HubSpot — it's a disclosure gap. **Fix:** add a "Processors we use" section (HubSpot CRM, Vercel hosting, Google Fonts) and reconcile the "never shared" sentence ("never shared with your employer…; we use vetted processors under contract…").

---

## 🟠 High

### H1. Brand fonts only load on the homepage
- The Google Fonts `<link>` (Playfair Display + Plus Jakarta Sans) lives in `src/routes/index.tsx` head only. Verified in deployed HTML: `/contact`, `/privacy`, `/terms`, `/checkout`, and the 404 page have **no font stylesheet**.
- Anyone landing directly on those pages (e.g. the contact link you share on WhatsApp/Instagram) sees Georgia/system fallbacks — the "quiet premium" look collapses exactly where conversions happen.
- **Fix:** move the three font `links` (preconnect ×2 + stylesheet) from `index.tsx` to `__root.tsx` head. Longer term: self-host the two fonts (`@fontsource`) — faster, no third-party request, and removes a CSP/privacy dependency.

### H2. Prerendered `/contact` ships the wrong initial state (hydration mismatch)
- The deployed static `/contact` HTML has **"Knowledge Base interest" pre-selected** in the Enquiry dropdown (`<option value="kb" … selected>`), because `prerender.crawlLinks` crawled a `?type=kb` variant and its output won the `/contact` path collision.
- Plain visitors briefly see (and screen readers/SEO snapshots permanently see) a pre-filled enquiry they didn't choose, then React hydration flips it — a guaranteed hydration mismatch warning.
- **Fix:** derive nothing from search params during prerender (read them in an effect / `useSearch` on client), or exclude `/contact` from crawling and prerender it explicitly without params.

### H3. `/api/contact` is an open, unthrottled relay
- `api/contact.ts` accepts any POST from anywhere: no rate limiting, no origin check, no payload size caps, and the honeypot is **client-side only** — a bot POSTing the endpoint directly bypasses it entirely. Your HubSpot portal ID + form GUID are also visible client-side (unavoidable, but it widens the same hole).
- Impact: CRM spam/poisoning, HubSpot form-submission quota burn, and email spam to whatever notifications you wired.
- **Fix (cheap, layered):**
  1. Enforce max lengths server-side (name ≤ 80, message ≤ 1000, email ≤ 254) and validate email shape.
  2. Pass the honeypot field through to the API and drop submissions where it's non-empty.
  3. Reject requests whose `Origin` isn't your site (best-effort; legit browsers send it).
  4. Enable Vercel WAF rate limiting on `/api/*` (Hobby tier includes basic rules).

### H4. "Something went wrong" can never appear / false success is possible
- Client submit logic (`contact.tsx:160-208`): if the proxy fails it falls back to `fetch(…, mode: "no-cors")`. Opaque responses **always resolve**, so `setSubmitted(true)` runs even when HubSpot rejected the submission (e.g. blocked, malformed, 4xx). The user sees "Received." and waits for a reply that never comes — worst-case outcome for an anxious user on a deadline.
- **Fix:** treat the proxy as the source of truth: on `!res.ok`, show the error + WhatsApp fallback instead of silently firing no-cors. Keep no-cors only for network-level proxy failure, and consider adding a note "If you don't hear from us within 1 business day, WhatsApp us" to the success screen as a safety net.

### H5. No favicon / touch icons at all
- `/favicon.ico` → 404; no `<link rel="icon">` anywhere; nothing in `public/`. The browser tab, bookmarks, WhatsApp link rows, and Google result favicons all show a generic globe. Cheap fix, disproportionate polish gain.
- **Fix:** add `favicon.ico` + `icon.svg` + `apple-touch-icon.png` in `public/` and reference them in `__root.tsx` head.

---

## 🟡 Medium

### M1. Accessibility issues (spot-check found these; not exhaustive)
1. **StickyCTA is focusable while hidden** (`StickyCTA.tsx:29-36`): when `show` is false it uses `opacity-0 translate-y-full` + `aria-hidden`, but the WhatsApp link stays in the tab order — keyboard users tab into an invisible, `aria-hidden` control (WCAG 4.1.2 violation). Add `inert` (or `visibility: hidden`) when hidden.
2. **No `<form>` element on the contact page** — the submit button is `type="button"` with onClick. Enter-to-submit doesn't work, browsers don't offer autofill grouping, and AT doesn't announce a form landmark. Wrap in `<form onSubmit={…}>` and make the button `type="submit"`.
3. **Missing autocomplete on name/email** (`contact.tsx`): phone got `tel-national`/`tel-country-code`, but name/email lack `autoComplete="name"` / `autoComplete="email"`.
4. **Hamburger button lacks `aria-expanded`/`aria-controls`** (`Navbar.tsx:100`).
5. **Contrast failures remaining** (computed):
   - Optional-select placeholder `rgba(237,216,184,0.3)` on burg-mid = **2.25:1** (`contact.tsx:394`).
   - Mobile "Scroll to see more →" hint = **3.02:1** at 12px (`Testimonials.tsx:113-123`).
   - (Everything else checked sits at 4.6–8.8:1 — the earlier AA pass held.)
6. **KB card "Unlock" affordance is hover-only** (`KnowledgeBase.tsx:150`): the overlay uses `group-hover` — keyboard focus and touch users never see the "Unlock for AED 299 →" hint. Add `group-focus-within:opacity-100` and consider showing the price statically on mobile.
7. **Calculator `aria-live="polite"` on an animated counter** (`ExposureCalculator.tsx:218`): the 1.8s count-up mutates the live region dozens of times → screen-reader spam. Announce only the final value (set live region text once after animation, or put `aria-live` on a visually-hidden element updated once).
8. **Errors not programmatically linked to inputs**: error text uses `role="alert"` but inputs lack `aria-invalid` and `aria-describedby`.

### M2. Gratuity calculator can overstate legal entitlement
- `computeGratuity()` (`ExposureCalculator.tsx:13-22`) pro-rates from day one, but under Art. 51 FDL 33/2021 gratuity requires **≥ 1 year of continuous service**. Enter 0.5 years and the site—whose product is catching exactly these errors—shows a legally wrong number.
- **Fix:** `if (years < 1) return 0;` plus a one-line explanation ("Gratuity accrues after 1 full year of service"). The ≤5yr/`>5yr` split and the 2-year (24× salary) cap are correct.

### M3. Security-header gaps (headers exist, which is already better than most)
- **No `Content-Security-Policy`.** With inline styles everywhere you'd need `style-src 'unsafe-inline'`, but even a lenient CSP (`default-src 'self'; script-src 'self'; connect-src 'self' https://forms.hubspot.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; frame-ancestors 'self'`) meaningfully cuts XSS blast radius. Self-hosting fonts (H1) simplifies this a lot.
- **HSTS lacks `includeSubDomains`** (`vercel.json`). Add it once the custom domain is live (and consider `preload`).
- `Access-Control-Allow-Origin: *` is emitted on HTML/static responses. Harmless for public static content, but it's not in `vercel.json` — worth knowing it comes from the platform/build config, and it should never be copied onto `/api/*`.

### M4. Pricing inconsistency — AED 199 vs AED 299
- The Knowledge Base is AED **299** everywhere (KB section, contact form helper, terms, checkout meta) **except** the Self-Review Checklist CTA which offers "Self-review checklist - AED 199" (`AudienceBento.tsx:141`) — if that's a distinct product, fine, but the KB cards' "Unlock for AED 299" vs. the checklist's 199 within one viewport invites "wait, which is it?" If they are different products, label the checklist more distinctly (it currently reads like the same locked content at a different price).

### M5. Full page reloads on internal links
- `Hero.tsx:159`, `About.tsx:144`, `AudienceBento.tsx:228`, `KnowledgeBase.tsx:194` use raw `<a href="/contact…">` instead of router `<Link>` — each click does a full document load (visible flash of unstyled fonts given H1). Use `<Link to="/contact" search={{type:"audit"}}>` consistently (the codebase already does this elsewhere).

### M6. "Read now →" goes to a contact form, not an article
- The FREE article card promises "How UAE gratuity is calculated: the complete guide — Read now →" but links to `/contact` (`KnowledgeBase.tsx:193-199`). For a trust-first brand this is a bait-and-switch moment. Either publish the free article as a real page (also a big SEO win — it's the highest-intent search query in this niche) or change the CTA to "Request the free guide →".

---

## 🔵 Low / polish

1. **KB grid is cramped on phones**: `grid-cols-2` below `md` (`KnowledgeBase.tsx:97`) → ~150px cards with 13px bullets on a 360px screen. Use `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`.
2. **`document.querySelector(hash)` can throw** on exotic hashes (`index.tsx:47`, `ui-store.ts:25`) — wrap in try/catch or use `document.getElementById(hash.slice(1))`.
3. **Dead code / leftovers**: `src/lib/api/example.functions.ts` (template example), `emitUi`/`onUi` events that have no listeners (`ui-store.ts` — `reset-home` is emitted but nothing subscribes), `.lovable/` config after the Lovable decouple, `vercel.json` rewrite `/api/:path* → /api/:path*` (no-op).
4. **~45 unused shadcn components + unused deps** (`recharts`, `embla-carousel-react`, `vaul`, `cmdk`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `date-fns`, most Radix packages). Tree-shaking keeps them out of the bundle, but they slow installs/builds and widen dependency-audit surface. Prune when convenient.
5. **Inline styles instead of tokens**: hundreds of `style={{ color: "rgba(237,216,184,0.55)" }}` repeats. The tokens exist in `styles.css` — define `--color-text-dim: rgba(237,216,184,0.55)` etc. and use classes; a rebrand currently means ~200 edits.
6. **`/checkout` is an orphaned placeholder** — nothing links to it anymore (KB links go to /contact), robots disallows it, but it's still deployed with OG tags. Add `noindex` meta or remove the route until payments exist.
7. **Sitemap has no `<lastmod>`**, and structured data `availableLanguage: ["English","French"]` omits Arabic — odd for the audience (see #9).
8. **Success screen shows the check icon twice** (`contact.tsx:265-271`) — big icon + inline icon next to "Received."
9. **Arabic/RTL**: PRODUCT.md itself flags bilingual EN/AR as near-term. Worth planning now (the all-inline-styles pattern in #5 makes RTL retrofits harder the longer it waits).
10. **No analytics** — no way to see calculator usage, CTA click-through, or form abandonment. Vercel Web Analytics is a one-liner and cookie-free (PDPL-friendly).
11. **Testimonials have no verifiability cues** — for a trust product, consider adding "shared with permission" microcopy; and if any quote is illustrative rather than real, it must be labeled as such (UAE consumer-protection + platform ad rules).
12. **Error boundary reports to `window.__lovableEvents`** (`lovable-error-reporting.ts`) which no longer exists post-Lovable — errors silently vanish. Replace with Sentry or delete.

---

## ✅ What's already good

- **Prerendered SSG** output — fast TTFB, full HTML for crawlers, tiny attack surface.
- **Security headers present** (HSTS, nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy) — ahead of most small sites.
- **No secrets in the repo**; server-only config pattern is correct; HubSpot IDs are public-by-design values.
- **Same-origin API proxy** for form delivery (ad-blocker resilience) with a sensible timeout + fallback structure.
- **Honeypot** on the form (needs server-side enforcement, see H3, but the right instinct).
- **`motion-safe:` discipline** throughout + `useReducedMotion` in the calculator — reduced-motion users are respected.
- **Contrast** on primary text passes AA after the earlier fix pass (verified 4.6–8.8:1 on the main pairs).
- **robots.txt + sitemap.xml** exist and are coherent with each other.
- Copy is genuinely strong: plain-spoken, calm, on-brand ("a person, not a platform" comes through).

---

## Suggested order of attack

| # | Item | Effort |
|---|------|--------|
| 1 | Point `uaeworkrights.com` at Vercel (or switch URLs to the live origin) — C1 | DNS + 5 min |
| 2 | Fix privacy placeholder + HubSpot disclosure — C2/C3 | copy, 30 min |
| 3 | Move fonts to `__root.tsx` — H1 | 5 min |
| 4 | Favicon set — H5 | 30 min |
| 5 | Contact submit truthfulness + server-side validation/honeypot/rate-limit — H3/H4 | 2–3 h |
| 6 | Prerender state leak on /contact — H2 | 1 h |
| 7 | Calculator 1-year rule — M2 | 15 min |
| 8 | A11y batch (form element, autocomplete, aria-expanded, StickyCTA inert, contrast ×2) — M1 | 2 h |
| 9 | Publish the free gratuity guide as a real page — M6 | content task, big SEO upside |
