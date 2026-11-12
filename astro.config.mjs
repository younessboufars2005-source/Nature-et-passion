import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://natureetpassions.net',
  output: 'static',
  integrations: [sitemap()]
});
