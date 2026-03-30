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
Active pages:
- Products: `/produkt/{slug}` (54 pages — Saeco, DeLonghi only)
- Brand categories: `/kafe-mashini/{brand}` (4 pages — delonghi, saeco, jura, philips)
- Info pages with .html: `/about.html`, `/contact.html`, `/garantsiya.html`, `/serviz-na-kafe-mashini.html`, `/istoria_na_kafe_mashinite.html`, `/kafe_mashini.html`, `/produkti.html`
- Info pages without .html: `/biskvitki`, `/cookie-policy`, `/uslovia`, `/zashtita-na-lichnite-danni`
- Nested: `/produkti/instruktsii-za-upotreba`
- See `docs/url-map.md` for the complete canonical URL list

Removed brands (301 redirects in `public/_redirects`):
- 10 brand pages → `/kafe_mashini.html` (bosch, gaggia, koenig, krups, rotel, satrap, siemens, solis, turmix, drugi-kafe-mashini)
- 18 product pages → `/produkti.html`

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
- Design tokens defined in `src/styles/global.css` `@theme` block
- Colors: primary green (#284d47), button teal (#589e94), button hover = primary green
- No gold/accent color — emphasis uses dark green (`text-highlight`)
- All fonts sans-serif: Inter (Cyrillic-compatible), no serif fonts
- Text on dark backgrounds: white. Text on light backgrounds: black
- Occasional dark green text for emphasis/highlights only
- Light background sections use `bg-cream` (#fefbf0); `bg-gray-50` for secondary light sections (reviews, FAQ)
- Mobile-first responsive design

## Code conventions
- ESM imports only (no require)
- TypeScript for utils, .astro for components/pages
- Product data loaded from `data/products.json` via `src/utils/products.ts`
- Dual currency display: EUR primary, BGN secondary
- Component props typed with Astro.props interface

## Gotchas
- .html extension pages: Astro's `build.format: 'file'` makes `about.astro` -> `about.html` (correct!)
- Extensionless URLs: Cloudflare Pages auto-matches `.html` extension (no redirects needed)
- Product images are placeholder quality — owner will replace post-launch
- No cart/checkout — this is a catalog only, phone-based ordering
- Email stays on shared hosting — DO NOT touch MX/SPF/DKIM records during DNS migration
