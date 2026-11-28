# Validation evidence

## Visual captures

The `before` homepage screenshots are from the verified branch baseline `19b3091` at 360×800 and 1440×1000. The `after` screenshots are from this branch's standalone production build, captured at the viewport encoded in each filename. Full-page captures force below-the-fold images to load before capture.

| View | Before | After |
|---|---|---|
| French homepage · 360×800 | [Mobile](screenshots/before-home-fr-mobile-360.png) | [Mobile](screenshots/after-home-fr-mobile-360.png) |
| French homepage · 1440×1000 | [Desktop](screenshots/before-home-fr-desktop-1440.png) | [Desktop](screenshots/after-home-fr-desktop-1440.png) |

Additional English and case-study screenshots are under [`screenshots/`](screenshots/). Captures document the local browser rendering; they are not claims of Figma pixel-diff acceptance or production-browser results.

## Automated checks

The unit and Playwright suites cover mocked contact delivery success/failure/configuration, French and English public routes, all six localized case studies, locale switching with query preservation, mobile menu and Escape key, contact validation/fallback/rate limit/double-click, CV subject prefill, synthetic demos, canonical/hreflang/sitemap, responsive overflow from 320 to 1920 CSS pixels, and axe serious/critical checks on the English homepage. See the pull request's run log for the commit-specific results.

## Lighthouse

Reports were collected from the standalone production build on `127.0.0.1:3101` with Lighthouse 13.6.0 and Microsoft Edge 158.0.4370.45. This is one lab run per route and device profile, not the three-run median suggested by the mission brief. Scores are percentages; LCP is simulated mobile/desktop lab timing and is not field Core Web Vitals.

Download the ten full Lighthouse JSON reports in [`lighthouse-reports.zip`](lighthouse-reports.zip); verify the extracted files with [`lighthouse/SHA256SUMS.txt`](lighthouse/SHA256SUMS.txt).

| Route | Device | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---:|---:|---:|---:|---:|---:|
| Home | Mobile | 94 | 100 | 100 | 100 | 2.8 s | 0 |
| Home | Desktop | 100 | 100 | 100 | 100 | 0.8 s | 0 |
| Projects | Mobile | 99 | 100 | 100 | 100 | 0.9 s | 0 |
| Projects | Desktop | 100 | 100 | 100 | 100 | 0.8 s | 0 |
| Arkena case | Mobile | 91 | 96 | 100 | 100 | 2.7 s | 0 |
| Arkena case | Desktop | 100 | 96 | 100 | 100 | 0.7 s | 0 |
| Career | Mobile | 95 | 100 | 100 | 100 | 2.9 s | 0 |
| Career | Desktop | 100 | 100 | 100 | 100 | 0.8 s | 0 |
| Contact | Mobile | 99 | 100 | 100 | 100 | 1.1 s | 0 |
| Contact | Desktop | 100 | 100 | 100 | 100 | 0.3 s | 0 |

All mobile performance scores meet the indicative 90 target, and accessibility, best-practice and SEO scores meet or exceed 95. Simulated mobile LCP remains above 2.5 s on the homepage, career page and Arkena case; the mobile portrait source was reduced to 34 KB (from 131 KB) and improved homepage mobile performance from 86 to 94 in this environment. No field data exists to claim real-user LCP, INP or CLS compliance.
