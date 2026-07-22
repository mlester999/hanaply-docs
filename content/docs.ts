export type DocSection = { heading: string; body: string; bullets?: string[] };
export type DocPage = { slug: string; eyebrow: string; title: string; summary: string; phase?: string; sections: DocSection[] };

export const docs: DocPage[] = [
  {
    slug: "product",
    eyebrow: "Product system",
    title: "Product overview",
    summary: "How Hanaply turns a verified career profile into a smaller, more useful opportunity set.",
    sections: [
      { heading: "Not another job board", body: "Hanaply is conceived as a continuous career radar. It finds approved opportunities, interprets the requirements, and compares them with a person's verified evidence." },
      { heading: "The core loop", body: "Discovery, normalization, matching, explanation, document preparation, and follow-through form one connected system.", bullets: ["Find fresh opportunities", "Remove duplicates and exclusions", "Explain fit across separate dimensions", "Prepare truthful Application Packs", "Keep the person in control"] },
      { heading: "Product state", body: "This website is an interactive product vision. It is not the production customer dashboard and does not connect to real employers, payments, or application data." },
    ],
  },
  {
    slug: "career-intelligence",
    eyebrow: "Career model",
    title: "Career intelligence",
    summary: "A career profile should behave like structured evidence, not a bag of keywords.",
    phase: "Phase 3",
    sections: [
      { heading: "Career identity", body: "A strict main career sets direction. Optional related sub-careers widen discovery without turning every role into a possible match." },
      { heading: "Verified evidence", body: "Experience, projects, tools, education, certifications, portfolio work, preferences, and goals remain attributable to user-reviewed facts." },
      { heading: "Contextual matching", body: "Relevant facts illuminate for a role while unrelated evidence stays available but does not inflate the verdict." },
    ],
  },
  {
    slug: "truth-gate",
    eyebrow: "AI safety",
    title: "Truth Gate",
    summary: "A generation boundary that blocks claims unsupported by verified career facts.",
    phase: "Phase 6",
    sections: [
      { heading: "Ground every claim", body: "Meaningful claims in generated documents must point back to verified employment, projects, tools, education, certifications, or other approved evidence." },
      { heading: "Tailor without fabrication", body: "Hanaply may clarify relevance, reorder evidence, and adjust tone. It may not invent employers, scale, leadership, results, technologies, credentials, or dates." },
      { heading: "Human review", body: "The person sees and reviews every document before submitting it. The product prepares; it does not impersonate the applicant." },
    ],
  },
  {
    slug: "architecture",
    eyebrow: "System design",
    title: "Architecture",
    summary: "Shared backend intelligence keeps web and future mobile clients consistent.",
    phase: "Phase 0",
    sections: [
      { heading: "Pipeline", body: "Sources pass through ingestion, normalization, deduplication, requirement extraction, matching, and controlled generation before alerts or documents reach a client." },
      { heading: "Security boundaries", body: "Authentication, RLS, tenant-scoped data, server-held credentials, audit logs, and separated administrative access define the initial security posture." },
      { heading: "Failure behavior", body: "Sources isolate failures, extraction records uncertainty, deterministic blockers remain available during model outages, and clients receive versioned contracts." },
    ],
  },
  {
    slug: "roadmap",
    eyebrow: "Delivery model",
    title: "Roadmap",
    summary: "Dependencies and acceptance gates matter as much as feature lists.",
    sections: [
      { heading: "Status discipline", body: "Every production phase is currently planned. A phase changes status only when the owner-approved source of truth changes." },
      { heading: "Acceptance gates", body: "Security, evidence quality, accessibility, performance, and operational safety are explicit gates rather than end-of-project polish." },
      { heading: "Owner decisions", body: "Source approval, taxonomy, model thresholds, content styles, and support policies require clear owner decisions at the relevant phase." },
    ],
  },
  {
    slug: "security",
    eyebrow: "Trust foundation",
    title: "Security",
    summary: "Career documents and administrative controls need strict, testable boundaries.",
    phase: "Phase 0",
    sections: [
      { heading: "Data separation", body: "Customer documents and career facts remain tenant-scoped. Administrative capabilities use a separate boundary and every sensitive action is auditable." },
      { heading: "Provider safety", body: "AI providers receive only necessary context. Secrets remain server-side, prompts are versioned, and provider output is treated as untrusted until validated." },
      { heading: "Product controls", body: "Feature flags, platform settings, version requirements, rollback paths, and source pause controls let operators respond without rewriting clients." },
    ],
  },
  {
    slug: "mobile-readiness",
    eyebrow: "Future platform",
    title: "Mobile readiness",
    summary: "Built for the web first, with business rules designed for shared clients from day one.",
    phase: "Phase 10",
    sections: [
      { heading: "One backend", body: "Authentication, entitlements, matching, documents, and notifications live behind versioned APIs instead of being duplicated in web, iOS, and Android." },
      { heading: "Operational controls", body: "Minimum versions, maintenance mode, feature flags, device registration, deep links, and push tokens are planned before mobile release." },
      { heading: "Right-sized mobile work", body: "Mobile focuses on timely alerts, opportunity review, document review, application tracking, and interview reminders." },
    ],
  },
];

export const getDoc = (slug: string) => docs.find((doc) => doc.slug === slug);
