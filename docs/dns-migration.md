# DNS Migration Runbook — kafemashini.ch

## Overview

Migrate web traffic from shared hosting to Cloudflare Pages while keeping email on shared hosting.

---

## Pre-Migration Checklist

- [ ] Document all current DNS records (A, AAAA, CNAME, MX, TXT, etc.)
- [ ] Verify current MX records and email delivery works
- [ ] Identify SPF, DKIM, and DMARC TXT records
- [ ] Note the shared hosting IP address (for rollback)
- [ ] Cloudflare account created and site added
- [ ] All current DNS records imported into Cloudflare
- [ ] New Astro site deployed to Cloudflare Pages and verified at *.pages.dev URL
- [ ] All 97 URLs verified working on the Cloudflare Pages preview URL

## Migration Steps

### Step 1: Add Custom Domain in Cloudflare Pages
1. Go to Cloudflare Pages > your project > Custom domains
2. Add `kafemashini.ch` as a custom domain
3. Cloudflare will auto-configure the DNS record (CNAME)

### Step 2: Verify DNS Records After Domain Addition

**MUST remain unchanged (email):**
- MX records — pointing to shared hosting mail server
- TXT record for SPF (`v=spf1 ...`)
- TXT record(s) for DKIM
- TXT record for DMARC (if exists)

**Changed by Cloudflare Pages:**
- A/CNAME record for `kafemashini.ch` — now points to Cloudflare Pages
- A/CNAME record for `www.kafemashini.ch` — add redirect to apex domain

**Optional:**
- Add `mail.kafemashini.ch` A record pointing to old hosting IP (for webmail access)

### Step 3: Verify SSL
- Cloudflare auto-provisions SSL certificate
- Verify HTTPS works: `https://kafemashini.ch`
- Enable "Always Use HTTPS" in Cloudflare SSL/TLS settings
- Set SSL mode to "Full (strict)" if origin has valid cert, otherwise "Full"

### Step 4: Verify Email
- Send test email TO `office@kafemashini.ch`
- Send test email FROM `office@kafemashini.ch`
- Check SPF alignment: `dig TXT kafemashini.ch` should show SPF record
- Check MX: `dig MX kafemashini.ch` should show mail server

## Post-Migration Monitoring

- [ ] Website loads at https://kafemashini.ch (check on phone + desktop)
- [ ] All product pages accessible
- [ ] Email sending and receiving works
- [ ] SSL certificate valid (padlock icon in browser)
- [ ] Cloudflare Analytics shows traffic
- [ ] Submit new sitemap to Google Search Console
- [ ] Monitor Search Console for crawl errors (check daily for 1 week)

## Rollback Plan

If something goes wrong after the DNS switch:

1. **Web rollback**: In Cloudflare DNS, remove the Pages CNAME record and re-add the A record pointing to the old shared hosting IP: `[DOCUMENT IP HERE]`
2. **Email issues**: Verify MX records are untouched. If MX was accidentally changed, restore from the pre-migration record snapshot.
3. **DNS propagation**: Changes take 1-48 hours. Use `dig` to monitor: `dig kafemashini.ch A` and `dig kafemashini.ch MX`

## Timeline

- **T-0**: Deploy to Cloudflare Pages, verify on preview URL
- **T+1**: Add custom domain, DNS switches automatically
- **T+2**: Verify site + email
- **T+3 to T+14**: Monitor Search Console, email, analytics
- **T+30**: Consider decommissioning web hosting (keep for email)

## Important Notes

- Keep shared hosting active for at least 2 months after migration (email depends on it)
- DO NOT cancel shared hosting until email is migrated to a separate service
- Cloudflare's free tier is sufficient for this site's traffic level
