# Content Editing Guide

## Roadmap

Edit `content/roadmap.ts`.

Every phase needs:

- A stable `id` used by deep links
- A visible number and title
- One allowed status
- Purpose and deliverables
- Dependencies
- Acceptance gates
- Risks
- Owner decisions

Keep IDs stable after sharing links. Never mark a production phase complete because the vision website demonstrates it.

## Architecture

Edit `content/architecture.ts`.

Each node must describe purpose, inputs, outputs, security boundary, ownership, product phase, failure behavior, and mobile relevance. The explorer and flat diagram read the same source.

## Plans

Edit `content/plans.ts`.

Prices are stored as whole PHP values. Annual savings are calculated from monthly price times twelve minus annual price. Update both prices together and re-run tests.

Proposed limits must remain labeled as product vision until the owner approves a live offer.

## Build Status

Edit `content/build-status.ts`.

Use an ISO date. Record only evidence-backed completed work. Keep product availability separate from vision-site implementation. Choose:

- `GO` only when mandatory local gates pass and the reviewed deliverable is ready
- `CONDITIONAL GO` when external deployment or owner decisions remain
- `NO-GO` when core interactions, layouts, accessibility, tests, or build fail

## Documentation

Edit `content/docs.ts` to add or revise structured documents. Each page needs a unique slug, title, summary, and sections. The docs index, sidebar, table of contents, previous and next navigation, and static route generation all read this file.

## Validation

Run:

```bash
npm run typecheck
npm run test:unit
npm run build
```

If a schema rejects a change, correct the source data. Do not weaken validation to accept an unclear product state.
