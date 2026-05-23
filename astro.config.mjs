import { defineConfig } from 'astro/config';

const useCustomDomain = process.env.PUBLIC_CUSTOM_DOMAIN === 'true';

export default defineConfig({
  site: useCustomDomain
    ? 'https://wrightonhealthcareconsulting.com'
    : 'https://whatmorecouldyouneed.github.io',
  base: useCustomDomain ? '/' : '/wrightonhealthcareconsulting',
  trailingSlash: 'never',
});
