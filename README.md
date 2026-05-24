# Wrighton Healthcare Consulting

Static marketing site for [wrightonhealthcareconsulting.com](https://wrightonhealthcareconsulting.com), built with Astro + SCSS and deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321/wrightonhealthcareconsulting](http://localhost:4321/wrightonhealthcareconsulting) (project-site base path; production uses the root domain).

## Build

```bash
npm run build
npm run preview
```

The build script generates image assets (`warnetta-headshot.jpg`, `og-image.png`, `favicon.ico`) then runs `astro build`. Output goes to `dist/`.

## Replace the headshot

Drop Warnetta's professional headshot at:

```
src/assets/warnetta-headshot.jpg
```

Recommended: square crop, at least 800×800px. Re-run `npm run build` after replacing.

## Deploy

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages.

**Staging (current):** [whatmorecouldyouneed.github.io/wrightonhealthcareconsulting](https://whatmorecouldyouneed.github.io/wrightonhealthcareconsulting)

**Production (after go-live):** [wrightonhealthcareconsulting.com](https://wrightonhealthcareconsulting.com)

The workflow uses `PUBLIC_CUSTOM_DOMAIN`:
- `'false'` (staging): builds with base path `/wrightonhealthcareconsulting`, no `CNAME` deployed
- `'true'` (production): builds at site root, copies `public/CNAME.production` → `public/CNAME` for GitHub Pages

---

## Custom domain go-live (GoDaddy → GitHub Pages)

Follow these steps in order. Total time is usually under an hour once DNS propagates.

### Step 1 — GoDaddy DNS

1. Sign in at [godaddy.com](https://www.godaddy.com) → **My Products** → **Domains**
2. Open **wrightonhealthcareconsulting.com** → **DNS** (or **Manage DNS**)
3. **Remove** anything that points the domain elsewhere:
   - Parked-page **A** records (GoDaddy parking IPs)
   - **Domain Forwarding** (disable under domain settings if enabled)
   - Old **CNAME** records on `www` that point to parking or `@` (you will replace `www`)
4. **Add four A records** for the apex domain (`@`):

   | Type | Name | Value | TTL |
   | --- | --- | --- | --- |
   | A | `@` | `185.199.108.153` | 1 hour (or default) |
   | A | `@` | `185.199.109.153` | 1 hour |
   | A | `@` | `185.199.110.153` | 1 hour |
   | A | `@` | `185.199.111.153` | 1 hour |

5. **Add one CNAME record** for `www`:

   | Type | Name | Value | TTL |
   | --- | --- | --- | --- |
   | CNAME | `www` | `whatmorecouldyouneed.github.io` | 1 hour |

   GoDaddy may show the value as `whatmorecouldyouneed.github.io.` (with a trailing dot). That is fine.

6. *(Optional)* Add the four **AAAA** records on `@` for IPv6 (GitHub recommends A + AAAA together if you use IPv6):
   - `2606:50c0:8000::153`
   - `2606:50c0:8001::153`
   - `2606:50c0:8002::153`
   - `2606:50c0:8003::153`

7. Save all records.

### Step 2 — Verify DNS (wait for propagation)

DNS can take a few minutes to 24 hours. On Windows PowerShell:

```powershell
Resolve-DnsName wrightonhealthcareconsulting.com -Type A
Resolve-DnsName www.wrightonhealthcareconsulting.com -Type CNAME
```

You should see the four GitHub **A** IPs for the apex domain and a **CNAME** on `www` pointing to `whatmorecouldyouneed.github.io`.

Check propagation in a browser: [https://wrightonhealthcareconsulting.com](https://wrightonhealthcareconsulting.com) should start showing the GitHub Pages site (or a GitHub 404) instead of the GoDaddy parked page.

### Step 3 — GitHub Pages custom domain

1. Repo: [whatmorecouldyouneed/wrightonhealthcareconsulting](https://github.com/whatmorecouldyouneed/wrightonhealthcareconsulting)
2. **Settings** → **Pages**
3. **Source** should already be **GitHub Actions**
4. Under **Custom domain**, enter: `wrightonhealthcareconsulting.com` → **Save**
5. Wait for the DNS check to pass (green checkmark). If GitHub shows a **TXT verification** record, add it in GoDaddy exactly as shown, then re-check.
6. If a custom domain was previously set and misconfigured, click **Remove**, save, then re-enter the domain.

Because this repo deploys via GitHub Actions, GitHub will **not** commit a `CNAME` file to the repo. The deploy workflow copies `public/CNAME.production` during the build when production mode is enabled (Step 4).

### Step 4 — Enable production build and redeploy

In `.github/workflows/deploy.yml`, change **both** `PUBLIC_CUSTOM_DOMAIN` values from `'false'` to `'true'`:

```yaml
# "Configure deploy domain" step
env:
  PUBLIC_CUSTOM_DOMAIN: 'true'

# "Install, build, and upload" step
env:
  PUBLIC_CUSTOM_DOMAIN: 'true'
```

Commit and push to `main`. The workflow will:
- Build with `site: https://wrightonhealthcareconsulting.com` and `base: /`
- Deploy `public/CNAME` containing `wrightonhealthcareconsulting.com`

Watch the **Actions** tab until the deploy finishes.

### Step 5 — Enforce HTTPS

Back in **Settings** → **Pages**:

1. Wait until **Enforce HTTPS** is available (can take up to 24 hours after DNS is correct)
2. Check **Enforce HTTPS**

### Step 6 — Smoke test

- [https://wrightonhealthcareconsulting.com](https://wrightonhealthcareconsulting.com) loads the full site
- [https://www.wrightonhealthcareconsulting.com](https://www.wrightonhealthcareconsulting.com) redirects or loads correctly
- Images, nav links, and contact email button work
- Padlock / valid certificate in the browser

### Troubleshooting

| Symptom | Likely fix |
| --- | --- |
| GoDaddy parked page still shows | DNS not propagated yet, or old A/CNAME/forwarding records still present |
| GitHub Pages DNS check fails | Confirm four A records on `@` and CNAME `www` → `whatmorecouldyouneed.github.io` |
| Site loads but assets/CSS missing | `PUBLIC_CUSTOM_DOMAIN` still `'false'` — flip to `'true'` and redeploy |
| **Enforce HTTPS** grayed out | Wait for DNS + certificate provisioning; remove and re-add custom domain if stuck >24h |
| Staging URL stops working after go-live | Expected — production builds use `/` not `/wrightonhealthcareconsulting` |

Official reference: [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

---

## Project structure

```
src/
  components/     # page sections (Header, Hero, Services, etc.)
  layouts/        # BaseLayout with SEO + JSON-LD
  pages/          # index.astro (single-page site)
  styles/         # SCSS tokens, mixins, global styles
  assets/         # headshot + healthcare illustrations
public/           # CNAME.production, robots.txt, sitemap.xml, favicon, og-image
```

## Contact

Site inquiries: **Warnettabell02@icloud.com** · **252.506.6451**

Built by [WMCYN](https://whatmorecouldyouneed.com).
