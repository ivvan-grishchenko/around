# Around

A full-stack web application built with TanStack Start, React 19, Prisma 7, Better Auth, and PostgreSQL.

## Tech Stack

- **Framework**: TanStack Start (React 19, file-based router, RSC enabled)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL via Prisma 7 + `@prisma/adapter-pg`
- **Auth**: Better Auth (Google OAuth, email/password, 2FA, Resend email)
- **UI**: Tailwind CSS v4 + shadcn/ui (New York style, Zinc base)
- **State**: TanStack Query + TanStack Form + TanStack Store
- **3D**: Three.js (React Three Fiber + Drei)
- **Lint/Format**: oxlint + oxfmt (not ESLint/Prettier)
- **Testing**: Vitest 4 (jsdom, v8 coverage, 80% thresholds)
- **Build**: Vite 8 + Nitro (production server bundle)
- **Deployment**: Railway via nixpacks

## Prerequisites

- Node.js `>=24.14.0`
- pnpm `>=11.0.0 <12.0.0`
- PostgreSQL database

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Copy `.env.example` to `.env` and fill in your values:

   ```bash
   cp .env.example .env
   ```

   > **Note:** `DB_URL` must match the concatenation of `DB_USERNAME`/`DB_PASSWORD`/`DB_HOST`/`DB_PORT`/`DB_DATABASE` — both are required and validated at startup.

3. Generate the Prisma client and push the schema:

   ```bash
   pnpm db:generate
   pnpm db:push
   ```

4. Start the dev server:

   ```bash
   pnpm dev
   ```

   The app runs on `http://localhost:3000`.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start Vite dev server (port 3000) |
| `pnpm build` | Clean `.output` then build Nitro server bundle |
| `pnpm start` | Run production server (`node .output/server/index.mjs`) |
| `pnpm test` | Vitest in watch mode |
| `pnpm test:run` | Vitest single run (CI) |
| `pnpm test:coverage` | Vitest with v8 coverage (fails under 80%) |
| `pnpm lint` | oxlint (type-aware, max 10 warnings) |
| `pnpm lint:fix` | oxlint with autofix |
| `pnpm format` | oxfmt (write) |
| `pnpm format:check` | oxfmt (check, runs in pre-commit) |
| `pnpm db:generate` | Prisma generate (reads `.env`) |
| `pnpm db:push` | Prisma db push (reads `.env`) |
| `pnpm db:migrate` | Prisma migrate dev (reads `.env`) |
| `pnpm db:studio` | Prisma Studio (reads `.env`) |
| `pnpm db:seed` | Prisma db seed (reads `.env`) |
| `pnpm db:format` | Prisma format (reads `.env`) |

## Project Structure

```
src/
  routes/                   TanStack Router file-based routes
  components/               UI components (PascalCase files, shadcn primitives in ui/)
  config/                   Server-only env validation (createServerOnlyFn)
  lib/                      Auth server/client, shared utilities
  hooks/                    Custom React hooks (forms, theme, debounce, etc.)
  queries/                  TanStack Query hooks
  types/                    Shared TypeScript types (router context, theme)
  generated/prisma/         Auto-generated Prisma client (gitignored, do not edit)
  prisma.server.ts          PrismaService singleton (pg pool + PrismaPg adapter)
  router.tsx                Router setup with QueryClient + SSR query integration
  styles.css                Tailwind v4 entry point
  env.d.ts                  Environment variable type declarations

prisma/
  schema.prisma             Datasource + generator config
  models/                   Split model definitions
  migrations/               Checked-in SQL migrations
```

## Path Aliases

| Alias | Resolves to |
|---|---|
| `@components/*` | `src/components/*` |
| `@config/*` | `src/config/*` |
| `@hooks/*` | `src/hooks/*` |
| `@lib/*` | `src/lib/*` |
| `@queries/*` | `src/queries/*` |
| `@type/*` | `src/types/*` |

## Conventions

### Import protection (enforced at build time)

- **Client code** cannot import from `**/*.server.*`, `**/config/**`, `@prisma/client`, `better-auth`, or `pg`.
- **Server code** cannot import from `**/*.client.*`, `better-auth/react`, `@react-three/fiber`, or `@react-three/drei`.
- Generated files (`src/generated/**`) are excluded from the rule.

### Naming

- `src/components/**`: **PascalCase** (e.g. `LoginForm.client.tsx`, `Avatar.tsx`)
- Everything else: **kebab-case** (e.g. `use-form.ts`, `better-auth.ts`)

### Code style

- **React Compiler** is enabled via `babel-plugin-react-compiler`.
- **oxlint** rules: `no-console` (error), `no-debugger` (error), `typescript/no-explicit-any` (error), `no-magic-numbers` (error, allowed: `0`, `1`, array/type indexes), `func-style: 'expression'`, `max-statements: 15`, `jsx-max-depth: 10`.
- **Type imports** must use separate `import type` lines (`consistent-type-imports` with `fixStyle: 'separate-type-imports'`).
- **Tabs** for indentation (oxfmt `useTabs: true`).
- **Coverage** gated at **80%** for branches, functions, lines, and statements.

### Commits

Conventional commits enforced via `commitlint`. Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

### Pre-commit hooks (Husky)

- **pre-commit**: `lint-staged` runs `pnpm lint` + `pnpm format:check` on staged `*.ts`/`*.tsx` files (excludes `.agents/`).
- **commit-msg**: `commitlint` validates conventional commit format.

## Verification

After making non-trivial changes, run in this order:

```bash
pnpm format
pnpm lint
pnpm tsc --noEmit
pnpm test:run
```

There is no `typecheck` script — use `pnpm tsc --noEmit` directly.

## Database

- Uses Prisma 7 with the `@prisma/adapter-pg` driver adapter and a `pg` connection pool.
- **Never** instantiate `PrismaClient` directly — use `PrismaService.getInstance()` from `src/prisma.server.ts`.
- Models are defined in `prisma/models/` (split file approach). Run `pnpm db:format` after editing.
- Generated client output lives in `src/generated/prisma/` (gitignored, regenerated by `pnpm db:generate`).

## Deployment (Railway)

1. Push this repo to GitHub.
2. Create a new project on [Railway](https://railway.com/new) from your repo.
3. In the **Variables** tab, add all environment variables from `src/env.d.ts` with production values.
4. Optionally provision a Postgres service in the same project — the connection string is auto-injected as `DATABASE_URL`.
5. `nixpacks.toml` handles the build: installs dependencies, runs `prisma generate`, and builds the Nitro server.
6. Production starts via `npm run start` (`node .output/server/index.mjs`).

## Generated / Ignored Files

Do not commit changes to:

- `src/routeTree.gen.ts` — regenerated by TanStack Router Vite plugin when routes change.
- `src/generated/prisma/` — regenerated by `pnpm db:generate` after schema changes.
- `.output/`, `.tanstack/`, `.nitro/` — build artifacts.
