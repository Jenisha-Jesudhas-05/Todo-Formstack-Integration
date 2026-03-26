# Planora – Formstack Integration

React + TypeScript + Vite app with lightweight Formstack embed + read-only submissions feed.

## What the Formstack pieces do
- Form embed: `src/components/FormstackEmbed.tsx` renders an iframe pointing to `FORMSTACK_EMBED_URL` from `src/lib/formstack.ts`. Swap that constant for your public Formstack form share link.
- Submission feed: `src/components/FormstackReportEmbed.tsx` fetches a Formstack shared report via the read-only proxy URL `FORMSTACK_REPORT_PROXY` (also in `src/lib/formstack.ts`). It pulls plain text through `jina.ai` to dodge CORS and heuristically splits each line into Title / Description / Deadline / Assignee.
- Where it shows up: `src/pages/Home.tsx` renders both the board and the Formstack report widget.

## How to point at your own Formstack assets
1) Create a Formstack form and copy its public embed/share URL. Set `FORMSTACK_EMBED_URL` in `src/lib/formstack.ts`.
2) Create a Formstack report, make it publicly shareable, and copy its share URL. Set `FORMSTACK_REPORT_PROXY` to that URL; the component appends a cache-busting `t` query param.
3) If your report line format differs, tweak `splitDetails`/`parseLines` in `FormstackReportEmbed.tsx` to map fields correctly.
4) For production, replace the jina.ai proxy with a server-side fetch to keep the report link private.

## Running locally
```bash
npm install
npm run dev
```

## Notes
- `.env*` files, coverage output, and local build artifacts are ignored in Git (see `.gitignore`).
- Vite aliases `@` to `src/` (see `vite.config.ts`).
