# Rapid Ideation Trainer

Fast Lightning Outburst Workout is a small React + Vite app for timed ideation rounds.

## Deploy

This repo is set up to ship as a plain static site on GitHub Pages.

1. Build the app with `npm run build`.
2. Copy the built files from `dist/` to the repo root.
3. Push `main` to GitHub.
4. In repo settings, set Pages to deploy from the `main` branch root if needed.

## Local development

```bash
npm ci
npm run dev
```

## Notes

- Session state is stored in the browser with `localStorage`.
- Prompt data is bundled from [`client/public/prompts.json`](/Users/justinlai/Coding/Rapid-Ideation-Trainer/client/public/prompts.json).
