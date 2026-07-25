# Expo Template

A production-ready starter for building universal apps with **Expo Router**, **NativeWind (Tailwind)**, **TanStack Query**, and **Zustand** — with an opinionated project structure, JWT auth (with automatic token refresh), and a small set of themeable UI primitives already wired up.

## Features

- **File-based routing** with [Expo Router](https://docs.expo.dev/router/introduction/), including grouped `(public)`, `(auth)`, and `(protected)` route segments
- **Authentication** flow with secure token storage (`expo-secure-store`) and automatic access-token refresh on 401s via an Axios interceptor
- **Data fetching** with TanStack Query, split into read/write hooks per feature
- **State management** with Zustand (auth, theme)
- **Styling** with NativeWind / Tailwind CSS, light & dark themes, and `class-variance-authority` for component variants
- **Forms** with React Hook Form + Zod validation
- **Reusable UI primitives** — `Button`, `Text`, `Label`, `FormInput`, `FormError`, `ThemeSwitcher`, `ProtectedLink`
- **Typed, feature-first architecture** — see [AGENTS.md](AGENTS.md) for the full folder conventions

## Tech Stack

| Category   | Library                                  |
| ---------- | ----------------------------------------- |
| Framework  | Expo SDK 54, React Native 0.81, React 19  |
| Routing    | Expo Router                               |
| Styling    | NativeWind (Tailwind CSS)                 |
| Data       | TanStack Query, Axios                     |
| State      | Zustand                                   |
| Forms      | React Hook Form, Zod                      |
| Language   | TypeScript                                |

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/)
- Expo Go app (for quick testing) or an Android/iOS simulator

### Installation

```bash
pnpm install
```

### Environment variables

Copy the example env file and set your API base URL:

```bash
cp .env.example .env.local
```

```
EXPO_PUBLIC_API_BASE_URL=https://example.com/api
```

### Run the app

```bash
pnpm start       # start the dev server
pnpm android     # run on Android
pnpm ios         # run on iOS
pnpm web         # run in the browser
```

## Project Structure

```
src/
├── app/                 # expo-router routes only ((public), (auth), (protected))
├── components/          # small, generic, reusable UI primitives
├── features/<feature>/  # page-level feature modules
│   ├── api/              # axios calls
│   ├── components/       # feature-specific components
│   ├── hooks/             # TanStack Query hooks (queries / mutations)
│   └── types.ts
├── hooks/               # shared/global hooks
├── lib/                 # shared/global lib code (api client, query client, storage)
├── providers/           # app-level providers
├── store/               # Zustand stores
├── types/               # shared/global types (API envelope, query keys)
└── utils/               # shared/global utility functions
```

Full naming and architecture conventions are documented in [AGENTS.md](AGENTS.md).

## Scripts

| Script          | Description                                  |
| --------------- | --------------------------------------------- |
| `pnpm start`    | Start the Expo dev server                     |
| `pnpm android`  | Run on an Android device/emulator             |
| `pnpm ios`      | Run on an iOS simulator                       |
| `pnpm web`      | Run in the browser                            |
| `pnpm lint`     | Run ESLint                                    |
| `pnpm restart`  | Clean caches, reinstall deps, restart the app |

## License

This project is provided as a free template — use it for personal or commercial projects.
