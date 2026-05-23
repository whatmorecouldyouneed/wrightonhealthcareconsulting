import sharp from 'sharp';
import { existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const assetsDir = join(root, 'src', 'assets');
const publicDir = join(root, 'public');

const headshotSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F1ECE3"/>
      <stop offset="100%" stop-color="#FAF8F5"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="url(#bg)"/>
  <circle cx="400" cy="320" r="120" fill="#FFD4C4"/>
  <path d="M220 620 Q400 480 580 620 L580 800 L220 800 Z" fill="#E5512B"/>
  <circle cx="400" cy="400" r="280" fill="none" stroke="#C9A14A" stroke-width="8"/>
  <text x="400" y="720" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#1F2A44">Warnetta Wrighton, MHA</text>
</svg>`;

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1F2A44"/>
  <circle cx="980" cy="120" r="180" fill="#C9A14A" opacity="0.15"/>
  <circle cx="150" cy="520" r="120" fill="#E5512B" opacity="0.12"/>
  <text x="80" y="180" font-family="Georgia, serif" font-size="72" font-weight="600" fill="#FFFFFF">Wrighton</text>
  <text x="80" y="240" font-family="Arial, sans-serif" font-size="32" fill="#C9A14A">Healthcare Consulting</text>
  <text x="80" y="340" font-family="Arial, sans-serif" font-size="28" fill="#FAF8F5">Warnetta Wrighton, MHA</text>
  <text x="80" y="390" font-family="Arial, sans-serif" font-size="22" fill="#FAF8F5" opacity="0.85">Healthcare operations · Patient experience · Practice management</text>
  <rect x="80" y="440" width="220" height="48" rx="24" fill="#E5512B"/>
  <text x="190" y="472" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">wrightonhealthcareconsulting.com</text>
</svg>`;

const headshotPath = join(assetsDir, 'warnetta-headshot.jpg');

if (!existsSync(headshotPath)) {
  await sharp(Buffer.from(headshotSvg)).jpeg({ quality: 90 }).toFile(headshotPath);
  console.log('Generated warnetta-headshot.jpg placeholder');
} else {
  console.log('Skipping warnetta-headshot.jpg (file already exists)');
}

await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, 'og-image.png'));

const faviconSvg = readFileSync(join(publicDir, 'favicon.svg'));
await sharp(faviconSvg).resize(32, 32).png().toFile(join(publicDir, 'favicon.ico'));

console.log('Generated og-image.png and favicon.ico');
