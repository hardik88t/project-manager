# Project Manager Guide

## Must-Do Routine Before Commit

- **Always run `npm run build` before committing any code.**
  - This ensures the project builds successfully and prevents broken code from being committed.
  - Fix any build or lint errors before pushing changes.

## Other Best Practices

- Never commit secrets. Use `.env` files for sensitive data.
- Add `.env` to `.gitignore` but include `.env.example`.
- Test authentication and dashboard access before deployment.
- Ensure mobile responsiveness for all pages.

---

(Expand this guide as your workflow evolves.)