# OctoFit Tracker Frontend

React 19 presentation tier for the OctoFit Tracker multi-tier application.

## API configuration

Define `VITE_CODESPACE_NAME` in `.env.local` when running in GitHub Codespaces:

```text
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is defined, API requests use:

```text
https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When it is unset, the frontend safely falls back to `http://localhost:8000/api/[component]/` to avoid `https://undefined-8000...` URLs.

## Scripts

```bash
npm run dev --prefix octofit-tracker/frontend
npm run build --prefix octofit-tracker/frontend
```
