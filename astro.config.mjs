import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
    integrations: [react()],
    site: 'https://aamaragones.github.io',
    base: '/amaragones-frontend/'
});
