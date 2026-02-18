# Payment Gateway Admin Dashboard

Multi-tenant SaaS Payment Gateway Admin Dashboard (Next.js, TypeScript, Prisma, NextAuth).

## Stack

- **Next.js** (App Router), **TypeScript**, **Tailwind CSS**
- **Prisma** + **PostgreSQL**
- **NextAuth** (JWT)
- **React Query**, **Zustand**, **Framer Motion**, **Recharts**, **shadcn-style UI**

## Getting started

### 1. Environment variables

Copy the example env and set required values:

```bash
cp env.example .env.local
```

Edit `.env.local`:

- **DATABASE_URL** – PostgreSQL connection string (required)
- **NEXTAUTH_SECRET** – Secret for JWT (e.g. `openssl rand -base64 32`)
- **NEXTAUTH_URL** – App URL (default `http://localhost:3000`)

### 2. Database (or use dummy backend)

**Option A – With database (Phase 4)**  
```bash
npm install
npx prisma generate
npx prisma migrate dev
```

**Option B – Dummy backend (Phase 2, no DB)**  
Add to `.env.local`:
```bash
USE_DUMMY_BACKEND=true
```
Then run `npm run dev`. `/api/transactions`, `/api/analytics`, and `/api/settlements` will use mock data (multi-tenant orgId, 300–700ms artificial latency). No `DATABASE_URL` required for these APIs.

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script        | Description                    |
|---------------|--------------------------------|
| `npm run dev` | Start dev server               |
| `npm run build` | Production build             |
| `npm run start` | Start production server      |
| `npm run lint`  | Run ESLint                   |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push`     | Push schema (no migrations) |
| `npm run db:migrate`  | Run migrations              |
| `npm run db:studio`   | Open Prisma Studio          |

## Environment config

Server-side code should use `getServerEnv()` from `@/lib/env` for required variables (validates at runtime). Client-safe values use `getPublicEnv()`.

## Deploy on Vercel

1. Push the repo to GitHub and import the project in [Vercel](https://vercel.com).
2. Add **Environment Variables** in Project Settings:
   - **DATABASE_URL** – e.g. Vercel Postgres or Neon
   - **NEXTAUTH_SECRET** – generate with `openssl rand -base64 32`
   - **NEXTAUTH_URL** – `https://your-project.vercel.app`
3. Optional: **NEXT_PUBLIC_APP_URL** if different from NEXTAUTH_URL.
4. Deploy. The build runs `prisma generate` via `postinstall`.

### Vercel + PostgreSQL

- Use [Vercel Postgres](https://vercel.com/storage/postgres) or [Neon](https://neon.tech) and set `DATABASE_URL` in Vercel.
- Run migrations from your machine or a one-off script:  
  `DATABASE_URL="your-production-url" npx prisma migrate deploy`

## Project structure

- **app/** – Next.js App Router (routes, layouts, loading, error boundaries)
- **components/** – Shared UI and layout
- **features/** – Feature modules (e.g. `transactions/`)
- **lib/** – Utilities, Prisma client, auth, env, animations

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
