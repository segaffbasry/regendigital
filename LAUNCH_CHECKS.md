# Launch checks — 16 September 2026

Checked the local production build. Resend and GA4 have since been configured on production (see `RESEND_SETUP.md`). The domain migration remains pending.

## Passed

- `pnpm build`: compilation, lint/type validation and static generation pass after the SEO changes.
- HTTP crawl: 27 linked pages respond successfully; no broken internal page links or section anchors.
- All crawled pages have one H1.
- 76 unique rendered asset URLs checked. The image `/pics/_ (68).jpeg` returns 200 with the browser's normal URL encoding, but 404 when parentheses are percent-encoded.
- Unknown URL returns HTTP 404.
- Homepage desktop rendering and mobile rendering inspected at 1280px and 390px respectively.
- Mobile menu opens, expands Services and closes on navigation.
- Desktop Services menu responds to Enter and closes with Escape, retaining focus on its button.
- Contact, audit, SEO service, SaaS industry, about, work and cookie-policy routes checked at 390px: no document-level horizontal overflow.

## Local fixes

- Added `robots.txt` and `sitemap.xml`; sitemap excludes the intentionally noindex investor partnership-call route.
- Added page canonical URLs and privacy-page title/description.
- Centralized the current SEO domain (`https://regen.digital`) for the later migration.

## Remaining findings

- `/cookie-policy` renders the generic interior-page fallback, not actual cookie-policy content. It also lacks a dedicated description.
- Resolved: homepage, service, contact, audit and partnership forms now share `/api/enquiry` and the Resend recipient configuration. A live contact-form test was delivered to both configured recipients.
- Resolved: service-page forms now submit directly through the shared enquiry endpoint; entered details are no longer put in contact-page query strings.
- No default Open Graph sharing image is configured; three case-study pages specify their own.
- Browser logs contained a MutationObserver error with no source URL and two GSAP missing-target warnings during the walkthrough. Source and user-visible impact remain unconfirmed.
- Encoded-parentheses image variant should be made robust if URLs will be rewritten by another service.

## Verification still needed

- Real iPhone Safari and Android Chrome checks; viewport checks here use the Codex in-app browser.
- Performance measurement and complete keyboard interaction review.
- Social destination verification (LinkedIn/Instagram) and deployed-site smoke test.
- Confirm all remaining form variants in production; contact-form delivery has been verified. GA4 code and the enquiry key event are configured.
- HTTPS, old-domain redirects and canonical/sitemap domain update at migration.

SEO, shared enquiry forms and GA4 integration are deployed to `regendigital.vercel.app`.
