# Hanaply Vision Website

Hanaply Vision is an interactive product-storytelling website for the planned Hanaply AI Career Radar and Job Intelligence SaaS.

It helps owners, collaborators, investors, designers, and developers understand the proposed career intelligence system before the production SaaS exists. It is not a customer dashboard, a live job board, or a production application.

## Product boundary

This project contains simulations and product previews only. It has no customer authentication, live job data, production AI generation, payment activation, subscriptions, or real administrative actions. Every fictional job and profile is labeled as demonstration data.

The future production SaaS should live in its own application boundary. Prototype visualization code in this repository must not be copied into a production customer app without an architecture and security review.

## Technology

- Next.js App Router on the vinext Cloudflare-compatible runtime
- React 19 and strict TypeScript
- CSS token and responsive layout system
- Motion as the primary animation system
- React Three Fiber, Drei, and Three.js for the interactive career evidence map
- Zod for roadmap, architecture, and pricing content validation
- Vitest, Testing Library, and Node test for automated checks

## Local setup

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

The local site is served at the URL printed by the development command.

## Commands

```bash
npm run dev          # local development
npm run lint         # ESLint
npm run typecheck    # strict TypeScript check
npm run test:unit    # content and interaction tests
npm run build        # production bundle
npm run build:vercel # standard Next.js bundle for Vercel
npm test             # build, unit tests, and rendered-route tests
```

## Routes

- `/` is the main product vision experience.
- `/roadmap` exposes every phase, dependency, gate, risk, and owner decision.
- `/architecture` exposes node inputs, outputs, security, ownership, failure behavior, and mobile relevance.
- `/docs` is the structured documentation index.
- `/docs/[slug]` renders product, career intelligence, claim verification, architecture, roadmap, security, and mobile-readiness documents.

The main story uses deep links for Career Radar, Application Packs, pricing, and mobile future sections.

## Content editing

Owner-editable product content is separated from presentation and animation:

- `content/roadmap.ts`
- `content/architecture.ts`
- `content/plans.ts`
- `content/principles.ts`
- `content/docs.ts`

Zod schemas live in `lib/content-schema.ts`. Invalid roadmap statuses, plans, or architecture layers fail during import and build.

See [docs/CONTENT_EDITING.md](docs/CONTENT_EDITING.md) for the editing workflow.

## Roadmap status editing

Update only `content/roadmap.ts`. Allowed values are `Planned`, `In Design`, `In Development`, `Validation`, `Complete`, and `Blocked`.

Do not mark a phase complete based on this vision website. A production phase should become complete only after its acceptance gates are met and the owner-approved source of truth changes.

## Three.js architecture

Three.js is isolated in `components/three/ProductScenes.tsx` and used only where spatial interaction adds meaning:

- Career evidence map: a verified profile connects relevant evidence to one sample role

The hero opportunity review and Career Radar use semantic interface components instead of WebGL. The evidence scene uses adaptive pixel density, lower-power checks, visibility tracking, and an accessible flat fallback. Reduced-motion and small or lower-power devices receive the fallback instead of requiring WebGL.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the broader application structure.

## Motion system

Motion timing and easing live in `lib/motion.ts`. CSS uses the same easing curve. Motion explains signal filtering, requirement classification, evidence connection, document assembly, and product-state changes.

`prefers-reduced-motion` disables spatial animation, smooth scrolling, scanning animation, long transitions, and animated WebGL scenes. All content and controls remain available.

## Testing

Automated coverage includes:

- Content-schema and status validation
- Roadmap uniqueness and status discipline
- Architecture failure and mobile behavior requirements
- Pricing savings calculations
- Claim-verification interaction
- Resume-strategy interaction
- Server-rendered route smoke tests

Automated verification covers content integrity, semantic interaction states, responsive CSS breakpoints, reduced-motion fallbacks, and rendered routes. The final visual, keyboard, and assistive-technology pass must be repeated in a browser that can reach the approved preview or hosting environment.

## Deployment

This repository is prepared for the bundled Sites runtime through `.openai/hosting.json` and vinext. Deployment is intentionally not performed without owner authorization.

It also supports Vercel through `vercel.json`. Vercel must use the Next.js framework preset, `npm run build:vercel`, and its automatic Next.js output handling. Do not configure `dist` as Vercel's Output Directory because `dist` belongs to the separate Vinext build. If the Vercel dashboard has an Output Directory override, clear it before redeploying.

Before deployment:

1. Run `npm test`.
2. Confirm canonical host metadata in `app/layout.tsx`, `app/sitemap.ts`, and `app/robots.ts`.
3. Confirm public access and product-availability language.
4. Approve the exact version for release.

## Performance considerations

- The Three.js evidence scene is client-only and lazy loaded.
- WebGL rendering is paused by unmounting the off-screen scene.
- Device capability and viewport size reduce rendering quality or choose a static fallback.
- Fonts use optimized Next.js loading.
- The social card is a single optimized project asset.
- No video background, large shader, or scroll-jacking layer is used.

## Known limitations

- The Career Radar uses deterministic fictional results for storytelling.
- Product and admin previews do not contain production business logic.
- The social metadata assumes `https://hanaply.com` until deployment configuration is approved.
- The lazy Three.js evidence bundle is intentionally isolated, but it still triggers a large-chunk build warning and should be profiled against the production performance budget.
- The in-app review browser could not access the local server because of its local-network security policy. Automated route and interaction checks passed, but visual viewport review remains an external release condition.
- Production performance and accessibility audits must be repeated in the final hosting environment.
