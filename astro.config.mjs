import { defineConfig } from 'astro/config';
import react from '@astrojs/react'; // Si vous utilisez React

export default defineConfig({
  site: 'https://WiWi955.github.io',
  base: '/Portfolio_William/',
  trailingSlash: 'always',
  integrations: [react()], // Si vous utilisez React
});
