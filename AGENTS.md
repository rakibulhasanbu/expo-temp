# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

## Folder & File Conventions

- `src/app/` — expo-router routes only. One folder per route, e.g. `pricing/index.tsx` (not `pricing.tsx`).
- `src/components/` — small, generic, reusable UI primitives (button, input-form, etc.). Kebab-case filenames, **named exports**.
- `src/features/<feature>/` — page-level feature modules (e.g. `pricing/`):
  - `components/` — feature-specific components (e.g. `pricing-card.tsx`). Kebab-case, named exports.
  - `hooks/` — feature-specific hooks, incl. TanStack Query hooks, e.g. `use-pricing-plans.ts` exporting `usePricingPlansQuery`.
  - `types.ts` — feature-specific types (single file, not a folder).
  - `utils/` — feature-specific utils (only if needed).
  - `lib/` — feature-specific lib code (only if needed).
- `src/hooks/` — shared/global hooks used across features.
- `src/utils/` — shared/global utility functions.
- `src/lib/` — shared/global lib code (create only when needed).
- `src/store/` — Zustand stores, one file per domain, e.g. `store/auth-store.ts` exporting `useAuthStore`.

**Naming rules:** all filenames kebab-case; all components/hooks/stores use **named exports** (no default exports); `.tsx` for files with JSX, `.ts` otherwise. Import via the `@/*` alias (maps to `src/*`).
