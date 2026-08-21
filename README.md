# cybersecurity-portfolio

React + Vite + Tailwind portfolio site.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

## Deploy to Vercel

1. Push this folder as the root of the `cybersecurity-portfolio` GitHub repo.
2. In Vercel: **New Project → Import** the repo.
3. Framework preset: **Vite** (auto-detected). If it asks manually:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Deploy — Vercel will auto-build on every push to `main`.

## Structure

```
index.html
src/
  main.jsx              # mounts React root
  App.jsx                # renders all portfolio sections + nav
  PortfolioSections.jsx   # Projects / Skills / Education / Experience / Achievements
  index.css              # Tailwind directives + color tokens
tailwind.config.js
postcss.config.js
vite.config.js
```

## Editing content

Project card copy and write-up text lives in the `PROJECTS` array near the top of
`src/PortfolioSections.jsx`. Skills live in `SKILL_GROUPS` in the same file.
