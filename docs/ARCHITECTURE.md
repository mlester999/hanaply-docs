# Vision Website Architecture

## Application boundary

This repository is a standalone product-vision application. It contains content, simulations, UI previews, and product-storytelling scenes. It does not contain the future customer SaaS, admin portal, ingestion workers, payment system, or mobile applications.

## Layers

### Content

The `content/` directory is the source of truth for roadmap, architecture, plans, principles, Build Status, and documentation. Long-form product state is not embedded in animation components.

### Validation

`lib/content-schema.ts` defines Zod schemas for owner-editable structured content. Validation happens when modules load, which makes invalid states visible during tests and builds.

### Presentation

Components are grouped by product concept:

- `components/layout` for navigation and shared chrome
- `components/navigation` for the command palette
- `components/vision` for primary story composition
- `components/radar` for the Career Radar simulation
- `components/application` for Truth Gate and Application Packs
- `components/product` for resume, customer, and admin previews
- `components/roadmap` and `components/architecture` for dedicated explorers
- `components/docs` for the documentation experience
- `components/three` for isolated WebGL scenes and fallbacks

### Motion

`lib/motion.ts` is the central timing and easing source. Motion is local to product interactions. There is no global animation state framework.

### Three.js

React Three Fiber owns the canvas lifecycle. Scenes use Drei only for focused helpers such as line geometry, HTML labels, and adaptive pixel density. The scenes use fixed career-data layouts instead of orbital controls.

Capability checks choose between spatial and flat diagrams. Intersection Observer removes off-screen canvas work. React unmounting handles Three.js resource disposal.

## State

Local React state is used for independent simulations. The command palette is shared only through the root navigation shell. No large state framework is introduced.

## Routes

The App Router keeps the immersive primary story separate from high-information pages. Roadmap, architecture, Build Status, and docs can be linked and reviewed without replaying the main experience.

## Accessibility boundary

WebGL never carries unique information. Every scene has semantic surrounding content and a flat fallback. Controls use native buttons, links, selects, fieldsets, tabs, dialogs, and headings.

## Future production boundary

The conceptual architecture shown on the site is product documentation, not executable infrastructure. Production auth, RLS, background jobs, AI providers, audit logs, payment state, and entitlements require separate implementation and security review.
