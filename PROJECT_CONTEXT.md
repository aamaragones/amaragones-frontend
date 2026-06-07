# Project: amaragones-frontend

- Path: /home/medusa/development/amaragones-frontend
- Purpose: Frontend site built with Astro. Serves a small portfolio/landing site.
- Primary framework: Astro (v^6.4.2) with React support via @astrojs/react.
- Language/runtime: JavaScript, React components (.jsx) and .astro files. Node >= 18.

Key files & folders
- astro.config.mjs
- package.json (scripts: `dev`, `build`, `preview`, `format`)
- public/ (static assets)
- src/
  - components/ (Header.astro, Hero.astro, About.astro, Works.astro, ButtonFantasy.jsx)
  - layouts/ (BaseLayout.astro)
  - pages/ (index.astro)
  - styles/ (global.css, vars.css)

Important scripts (from package.json):
- `npm run dev` — start local dev server (astro dev)
- `npm run build` — build for production (astro build)
- `npm run preview` — preview production build (astro preview)
- `npm run format` — run Prettier across the project

Notable dependencies:
- astro, @astrojs/react, react, react-dom
- dev: prettier

Current workspace notes (captured):
- OS: Linux
- Last terminal command in session: `npm run preview` (exit code 130)
- User's current open file: src/components/ButtonFantasy.jsx
- Main page: src/pages/index.astro

Hints for future sessions:
- To start developing: run `npm install` then `npm run dev`.
- To inspect the rendered site structure, open `src/pages/index.astro` and `src/layouts/BaseLayout.astro`.
- Component entrypoints live in `src/components/`; modify `Header.astro` and `Hero.astro` for site-wide changes.
- Styles and variables are in `src/styles/vars.css` and `src/styles/global.css`.
- Node version should be >=18 to match `engines` in package.json.

If you want, I can also add quick run/debug tasks, VS Code launch configs, or a CONTRIBUTING note.
