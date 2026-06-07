# Amaragones Frontend (Astro)

Static site for the author Antonio Ángel Martínez Aragonés. Built with Astro (JS), with React integration available for progressive enhancement.

Quick start

```bash
npm install
npm run dev
```

Build

```bash
npm run build
npm run preview
```

Project structure

- `src/pages/` — site pages
- `src/assets` — site assets
- `src/layouts/` — base layout
- `src/components/` — components (header, hero, about, works, ButtonFantasy)
- `src/styles/` — global CSS and variables
- `public/` — static assets (images)

Notes for follow-up agents

- Fonts are loaded via Google Fonts in `src/layouts/BaseLayout.astro`.
- The `ButtonFantasy` is implemented as a React component in `src/components/ButtonFantasy.jsx`; it is rendered server-side by default and can be hydrated with Astro client directives when interactivity is required.
- Styling is plain CSS in `src/styles/global.css` and variables in `src/styles/vars.css`.
