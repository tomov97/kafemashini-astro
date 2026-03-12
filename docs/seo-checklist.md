# SEO Migration Checklist — kafemashini.ch

Track SEO parity between old WordPress site and new Astro site.

---

## Global (applies to every page)

- [ ] `<html lang="bg">` set
- [ ] `<link rel="canonical">` with full absolute URL
- [ ] `<title>` tag present and meaningful
- [ ] `<meta name="description">` present
- [ ] Open Graph tags: og:title, og:description, og:url, og:type, og:locale="bg_BG"
- [ ] Organization schema.org JSON-LD in BaseLayout
- [ ] Single `<h1>` per page
- [ ] Logical heading hierarchy (h1 > h2 > h3)
- [ ] Internal links use absolute paths (no broken links)
- [ ] All images have `alt` attributes in Bulgarian
- [ ] No `noindex` or `nofollow` on public pages
- [ ] Sitemap.xml generated and includes all 97 URLs
- [ ] robots.txt allows all crawlers, references sitemap
- [ ] Favicon present

## Product Pages (/produkt/[slug]) — 72 pages

- [ ] URL slug matches exactly (case-sensitive)
- [ ] Product schema.org JSON-LD: name, image, description, offers (price, priceCurrency: BGN, availability), brand
- [ ] BreadcrumbList schema.org JSON-LD: Home > Brand > Product
- [ ] og:type = "product"
- [ ] og:image points to product image
- [ ] Price displayed in both BGN and EUR
- [ ] Related products section with internal links
- [ ] Breadcrumb navigation visible on page

## Brand Category Pages (/kafe-mashini/[brand]) — 12 pages

- [ ] URL slug matches exactly
- [ ] BreadcrumbList schema.org JSON-LD: Home > Brand
- [ ] Brand description text present
- [ ] All products for brand listed (no pagination gaps)
- [ ] Each product card links to correct /produkt/ URL
- [ ] og:type = "website"

## Info Pages — 12 pages

- [ ] URL matches exactly (including .html extension where applicable)
- [ ] Content preserved from WordPress original
- [ ] og:type = "website"

## Post-Launch Verification

- [ ] Google Search Console: submit sitemap
- [ ] Google Search Console: no crawl errors after 48 hours
- [ ] `site:kafemashini.ch` returns indexed pages in Google
- [ ] Rich Results Test passes for 3+ sample product pages
- [ ] Lighthouse SEO score > 95
- [ ] No mixed content warnings (all HTTPS)
- [ ] SSL certificate valid (Cloudflare auto-provisions)
