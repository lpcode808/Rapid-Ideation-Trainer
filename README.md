# Rapid Ideation Trainer

Fast Lightning Outburst Workout is a small React + Vite app for timed ideation rounds.

## Deploy

This repo is set up for GitHub Pages with a GitHub Actions workflow in [`.github/workflows/deploy.yml`](/Users/justinlai/Coding/Rapid-Ideation-Trainer/.github/workflows/deploy.yml).

1. Push `main` to GitHub.
2. In the GitHub repo settings, set Pages to **GitHub Actions** as the source.
3. Future pushes to `main` will rebuild and redeploy the site.

## Local development

```bash
npm ci
npm run dev
```

## Notes

- Session state is stored in the browser with `localStorage`.
- Prompt data is bundled from [`client/public/prompts.json`](/Users/justinlai/Coding/Rapid-Ideation-Trainer/client/public/prompts.json).
