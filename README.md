# never-sleep

Marketing site for [RubberDuck.Space](https://never-sleep.vercel.app) — an autonomous AI engineer that never sleeps. Built with Vite 6, React 19, and Tailwind CSS.

## Pages

- Home, Docs, About, Blog, Careers, Contact
- GitHub Dashboard (public repository view)

## Prerequisites

- Node.js 20+ (22 recommended)
- npm

## Setup

```bash
npm install
cp .env.example .env.local
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run lint` | Type-check with `tsc --noEmit` |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run test:e2e` | Run Cypress end-to-end tests (local only) |

## Environment variables

Key names only — never commit real values.

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | No | Optional Gemini API key for client-side AI features. When unset, those features fail closed without breaking the landing page. |
| `CONTACT_WEBHOOK_URL` | No | Server-side webhook URL for `/api/contact` form submissions. When unset, the contact form returns HTTP 503 and shows an honest not-configured message. |

For local development, set variables in `.env.local` (gitignored). On Vercel, configure environment variables in project settings. `CONTACT_WEBHOOK_URL` is read only by the serverless function and is not exposed to the browser.

## Health checks

Static JSON endpoints are served before the SPA catch-all:

- `GET /health` → `{"status":"ok"}`
- `GET /ready` → `{"status":"ready"}`

## End-to-end tests

Cypress tests live under `cypress/e2e/`. They require a running dev server and are intended for local use:

```bash
npm run dev
# in another terminal
npm run test:e2e
```

E2E tests are not run in CI.

## Deploy

The app is configured for [Vercel](https://vercel.com) with SPA routing via `vercel.json`.
