# AGENTS.md — Web (Next.js)

> Cursor agents: see `.cursor/rules/web-development.mdc`, `design-system.mdc`, and `web-structure.mdc`.

## Design system (required for all UI)

**Source of truth:** [`DESIGN.md`](./DESIGN.md) (Notion-inspired warm workspace).

Before writing or editing any page, component, layout, or CSS in `apps/web`:

1. **Read** `apps/web/DESIGN.md` in full.
2. **Follow** its colors, typography, spacing, radius, elevation, and component patterns.
3. **Map tokens** into `app/globals.css` (`:root`, `@theme`) and Tailwind — do not invent a conflicting palette.
4. On conflict with generic frontend-design defaults, **`DESIGN.md` wins**.

Do not build UI from memory or from shadcn defaults alone. Compose `@repo/ui` primitives, then style them to match `DESIGN.md`.

## Essential commands

```bash
# from repo root
pnpm exec turbo dev --filter=web
pnpm exec turbo lint check-types --filter=web
pnpm exec turbo build --filter=web
```

## Stack

- Next.js App Router, React 19, Tailwind CSS v4
- Shared UI: `@repo/ui` (shadcn primitives)
- Auth: Better Auth client in `lib/auth-client.ts`
- Theme: `next-themes` via `components/theme-provider.tsx`

## Structure

- Thin `app/**/page.tsx` — compose only
- App blocks / forms in `app/` feature folders or `components/`
- Shared helpers in `lib/`
- Do not copy shadcn primitives into `apps/web`; import from `@repo/ui/components/*`

## Checklist before shipping UI

1. Read `DESIGN.md`
2. Read relevant skills listed in `.cursor/rules/web-development.mdc`
3. Prefer Server Components; `'use client'` only when required
4. Use `cn()` from `@repo/ui/lib/utils`
5. Run `pnpm exec turbo lint check-types --filter=web`
