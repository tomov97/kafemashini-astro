# kafemashini.ch — Astro Static Site

## Quick commands
- `npm run dev` — Astro dev server (localhost:4321)
- `npm run build` — Production build to dist/
- `npm run preview` — Preview production build locally
- `npm run scrape` — Run all scraping scripts
- `npm run validate` — Validate scraped data completeness
- `npm run verify-urls` — Check all URLs return 200

## Architecture
- **Framework**: Astro (static output) + Tailwind CSS + vanilla JS
- **Deployment**: Cloudflare Pages
- **Data**: Scraped from WordPress, stored as JSON in `data/`
- **Language**: Bulgarian (lang="bg", og:locale="bg_BG")

## URL rules — CRITICAL
Every URL from the old WordPress site MUST be preserved exactly:
- Products: `/produkt/{slug}` (72 pages)
- Brand categories: `/kafe-mashini/{brand}` (12 pages)
- Info pages with .html: `/about.html`, `/contact.html`, `/garantsiya.html`, `/serviz-na-kafe-mashini.html`, `/istoria_na_kafe_mashinite.html`, `/kafe_mashini.html`, `/produkti.html`
- Info pages without .html: `/biskvitki`, `/cookie-policy`, `/uslovia`, `/zashtita-na-lichnite-danni`
- Nested: `/produkti/instruktsii-za-upotreba`
- See `docs/url-map.md` for the complete canonical URL list

Build uses `format: 'file'` so `.astro` -> `.html`. Cloudflare auto-serves
`/biskvitki.html` at `/biskvitki` (extensionless URL matching).

## SEO rules — CRITICAL
- Every page: canonical tag, meta description, og tags, lang="bg"
- Product pages: Product + BreadcrumbList schema.org JSON-LD
- Category pages: BreadcrumbList schema.org JSON-LD
- All pages: Organization schema in BaseLayout
- Single h1 per page, logical heading hierarchy
- Sitemap via @astrojs/sitemap, robots.txt in public/

## Style conventions
- Tailwind utility classes, no custom CSS unless unavoidable
- Design tokens defined in tailwind.config.mjs (see colors, fonts)
- Koffie-inspired: deep green/teal (#1B4332) + cream (#FDF8F0) + gold accent (#C4922A)
- Serif headings (Playfair Display), sans-serif body (Inter)
- Mobile-first responsive design

## Code conventions
- ESM imports only (no require)
- TypeScript for utils, .astro for components/pages
- Product data loaded from `data/products.json` via `src/utils/products.ts`
- Dual currency display: BGN primary, EUR secondary
- Component props typed with Astro.props interface

## Gotchas
- .html extension pages: Astro's `build.format: 'file'` makes `about.astro` -> `about.html` (correct!)
- Extensionless URLs: Cloudflare Pages auto-matches `.html` extension (no redirects needed)
- Product images are placeholder quality — owner will replace post-launch
- No cart/checkout — this is a catalog only, phone-based ordering
- Email stays on shared hosting — DO NOT touch MX/SPF/DKIM records during DNS migration
