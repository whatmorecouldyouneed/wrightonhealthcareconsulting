# Wrighton Healthcare Consulting

Static marketing site for [wrightonhealthcareconsulting.com](https://wrightonhealthcareconsulting.com), built with Astro + SCSS and deployed to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

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

### GitHub Pages setup

1. Repo → **Settings** → **Pages**
2. **Source:** GitHub Actions
3. **Custom domain:** `wrightonhealthcareconsulting.com`
4. Enable **Enforce HTTPS** once DNS and the certificate are ready

### GoDaddy DNS

In GoDaddy DNS for `wrightonhealthcareconsulting.com`:

1. Remove default parked A/CNAME records
2. Add four **A** records on `@`:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Add **CNAME** on `www` → `whatmorecouldyouneed.github.io`
4. TTL: default (1 hour). Propagation is usually under an hour.

The `public/CNAME` file in this repo tells GitHub Pages to serve the custom domain.

## Project structure

```
src/
  components/     # page sections (Header, Hero, Services, etc.)
  layouts/        # BaseLayout with SEO + JSON-LD
  pages/          # index.astro (single-page site)
  styles/         # SCSS tokens, mixins, global styles
  assets/         # headshot + healthcare illustrations
public/           # CNAME, robots.txt, sitemap.xml, favicon, og-image
```

## Contact

Site inquiries: **Warnettabell02@icloud.com** · **252.506.6451**

Built by [WMCYN](https://whatmorecouldyouneed.com).
