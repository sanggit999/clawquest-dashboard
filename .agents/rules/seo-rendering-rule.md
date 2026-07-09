# Rules for Rendering and SEO in ClawQuest Miner

This document guides AI Agents on how to handle Rendering Models (CSR, SSG, SSR) and SEO practices on this repository to maintain high search visibility and zero-cost hosting deployment.

## 1. Rendering Model Rules

- **Use SSG (Static Site Generation) for Static Content**:
  - The main landing page structures, layout, pricing tables, and FAQs must be static and pre-compiled.
  - Avoid fetching static landing page copy from external APIs during runtime.
- **Use CSR (Client-Side Rendering) for Dynamic Dashboards**:
  - The interactive components (like charts, status grids, log files, configuration panels) must be rendered on the client side.
  - Always provide high-quality skeleton loaders or loading states (`isLoading` states) while fetching real-time API data.
- **No SSR (Server-Side Rendering)**:
  - Do not introduce server-side functions or Next.js-like node server requirements. The project must be fully exportable as static assets (`dist/`) to run on GitHub Pages.

## 2. SEO Best Practices

- **Static Meta Injection**:
  - All critical SEO metadata (Title, Description, Keywords, Open Graph, Twitter Cards) must be written directly in `index.html`.
  - Do not rely on JavaScript hydration (like `react-helmet` or dynamic scripting) for initial indexing tags.
- **Semantic Structure**:
  - Maintain HTML5 semantic layouts: Use `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>` tags.
  - Maintain a clean heading hierarchy (`h1` -> `h2` -> `h3`). Ensure there is only one `<h1>` per page.
- **Asset Paths**:
  - Always ensure public assets (like icons, OG images, favicon) are referenced with correct relative base paths to match the deployment context (`/clawquest-dashboard/`).
