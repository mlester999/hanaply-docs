import { buildStatusSchema } from "@/lib/content-schema";

export const buildStatus = buildStatusSchema.parse({
  decision: "CONDITIONAL GO",
  updatedAt: "2026-07-22",
  currentPhase: "Vision website implementation",
  summary: "The product vision experience is implemented locally. The production Hanaply SaaS remains planned and is not available to customers.",
  completed: ["Vision narrative and brand-token system", "Interactive Career Radar demonstration", "Truth Gate and Application Pack simulations", "Roadmap and architecture content models", "Responsive navigation, legibility, documentation, and Build Status surfaces"],
  inProgress: ["Owner review of product language and plan limits", "Production architecture decisions outside this vision app"],
  validations: ["Confirm final roadmap owners", "Confirm the first approved job-source set", "Review pricing and entitlements before production use", "Repeat visual and assistive-technology review in the approved preview environment"],
  ownerActions: ["Approve product narrative", "Approve Plus and Pro assumptions", "Choose production repository and hosting strategy"],
  limitations: ["All jobs, profiles, dashboards, and admin actions are demonstrations", "No production authentication, database, payments, ingestion, or AI generation is connected", "Mobile applications are a future phase", "Final hosted-browser visual and accessibility review is pending"],
  deferred: ["Production SaaS implementation", "Live data integrations", "Customer accounts and payments", "React Native applications"],
  milestoneNotes: ["July 22, 2026: initial standalone Hanaply Vision Website prepared for review"],
});
