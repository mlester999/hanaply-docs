"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Ban, Boxes, Check, ChevronRight, Clock3, Code2, FileCheck2, Filter, Globe2, Layers3, ShieldCheck, Smartphone, Sparkles, Target, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CareerRadarSimulator } from "@/components/radar/CareerRadarSimulator";
import { ApplicationPackDemo, ClaimVerificationDemo } from "@/components/application/ApplicationPackDemo";
import { AdminPreview, ProductDashboardPreview, ResumeComparison } from "@/components/product/ProductPreviews";
import { plans } from "@/content/plans";
import { principles } from "@/content/principles";
import { roadmap } from "@/content/roadmap";
import { motionTokens, reveal } from "@/lib/motion";
import { CareerSignalPreview } from "@/components/vision/CareerSignalPreview";

const CareerConstellationScene = dynamic(() => import("@/components/three/ProductScenes").then((module) => module.CareerConstellationScene), { ssr: false, loading: () => <div className="constellation-loading">Loading the accessible career map…</div> });

const introSteps = ["Role discovered", "Constraints cleared", "Evidence matched", "Recommendation ready"];

export function VisionHome() {
  return <div className="vision-home"><Hero /><Problem /><CareerRadar /><CareerProfile /><JobIntelligence /><ClaimVerification /><ApplicationPacks /><ResumeSection /><DashboardSection /><AdminSection /><PricingSection /><RoadmapPreview /><ArchitecturePreview /><MobileFuture /><Principles /></div>;
}

function Hero() {
  const reduced = useReducedMotion();
  const [introStep, setIntroStep] = useState(reduced ? introSteps.length : 0);
  useEffect(() => {
    if (reduced || introStep >= introSteps.length) return;
    const timer = window.setTimeout(() => setIntroStep((step) => step + 1), 680);
    return () => window.clearTimeout(timer);
  }, [introStep, reduced]);
  return <section id="vision" className="hero-section">
    <div className="hero-grid-bg" aria-hidden="true" />
    <div className="hero-copy">
      <motion.div className="status-kicker" initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}><span />Product Vision Experience <small>Not a live product</small></motion.div>
      <motion.h1 initial={false} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.15, duration: 0.7, ease: motionTokens.ease }}>Your career radar<br />never stops <em>searching.</em></motion.h1>
      <motion.p initial={false} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.4, duration: 0.6 }}>Hanaply discovers fresh jobs, analyzes how well they match your real experience, and prepares tailored resumes and cover letters for opportunities worth pursuing.</motion.p>
      <motion.div className="hero-actions" initial={false} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.6 }}><a className="primary-button" href="#career-radar">Explore the vision <ArrowDown size={18} /></a><Link className="secondary-button" href="/roadmap">Open the roadmap <ArrowUpRight size={17} /></Link></motion.div>
      <div className="hero-proof"><div><strong>01</strong><span>Discover<br />fresh signals</span></div><div><strong>02</strong><span>Explain<br />real fit</span></div><div><strong>03</strong><span>Prepare<br />truthful packs</span></div></div>
    </div>
    <div className="hero-visual">
      <div className="hero-scene-head"><div><span>OPPORTUNITY REVIEW</span><strong>{introStep >= introSteps.length ? "Recommendation ready" : introSteps[introStep]}</strong></div>{introStep < introSteps.length && <button type="button" onClick={() => setIntroStep(introSteps.length)}>Show result</button>}</div>
      <CareerSignalPreview step={introStep} />
    </div>
    <div className="hero-scroll"><span>Scroll to enter the system</span><i /></div>
  </section>;
}

function SectionIntro({ index, eyebrow, title, copy, light = false }: { index: string; eyebrow: string; title: React.ReactNode; copy: string; light?: boolean }) {
  return <motion.div {...reveal} className={`section-intro ${light ? "light" : ""}`}><div className="section-index"><span>{index}</span><i /></div><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{copy}</p></div></motion.div>;
}

function Problem() {
  const [level, setLevel] = useState(0);
  const stages = ["Unfiltered feed", "Rules applied", "Meaningful set"];
  const jobs = [
    ["Senior Sales Director", "Hard blocker", "block"], ["Automation Specialist", "Strong signal", "strong"], ["Unpaid AI Intern", "Excluded", "dim"], ["Workflow Developer", "Strong signal", "strong"], ["Night Shift VA", "Excluded", "dim"], ["Automation Specialist", "Duplicate", "duplicate"], ["Platform VP", "Hard blocker", "block"], ["n8n Developer", "Stretch", "stretch"],
  ];
  return <section className="problem-section"><div className="content-shell"><SectionIntro index="01" eyebrow="The problem" title={<>More listings do not create<br /><em>better decisions.</em></>} copy="Job boards flood people with roles, but rarely understand their direction, evidence, constraints, or real chances." light /><div className="noise-lab">
    <div className="noise-controls"><div><span>Noise reduction</span><strong>{stages[level]}</strong></div><div role="group" aria-label="Noise filtering stage">{stages.map((stage, index) => <button type="button" key={stage} className={level === index ? "active" : ""} onClick={() => setLevel(index)}><span>0{index + 1}</span>{stage}</button>)}</div></div>
    <div className={`job-noise-grid level-${level}`}>{jobs.map(([role, status, kind], index) => <article key={`${role}-${index}`} className={kind}><div><span>{String(index + 1).padStart(2, "0")}</span>{kind === "block" ? <Ban size={15} /> : kind === "dim" ? <X size={15} /> : kind === "duplicate" ? <Layers3 size={15} /> : <Target size={15} />}</div><small>{["Northstar Systems", "Atlas Workflow", "Meridian Support", "Pinebridge Labs"][index % 4]}</small><h3>{role}</h3><p>{status}</p></article>)}</div>
    <div className="noise-result"><Filter size={18} /><p><strong>{level === 0 ? "8" : level === 1 ? "5" : "3"} signals remain</strong>{level === 0 ? "No career context applied" : level === 1 ? "Exclusions and duplicates removed" : "Two strong matches and one stretch opportunity"}</p><button type="button" onClick={() => setLevel((value) => Math.min(value + 1, 2))} disabled={level === 2}>{level === 2 ? <><Check size={15} /> Noise reduced</> : <>Apply next layer <ArrowRight size={15} /></>}</button></div>
  </div></div></section>;
}

function CareerRadar() {
  return <section id="career-radar" className="radar-section section-pad"><div className="content-shell"><SectionIntro index="02" eyebrow="Career Radar" title={<>Find the roles that make sense<br /><em>for this person.</em></>} copy="Configure a fictional career profile and watch Hanaply turn a field of sample jobs into an explainable opportunity set." /><CareerRadarSimulator /><p className="demo-disclaimer"><ShieldCheck size={15} /> All employers, profiles, scores, and jobs shown here are fictional demonstration data.</p></div></section>;
}

function CareerProfile() {
  return <section className="constellation-section section-pad"><div className="content-shell"><SectionIntro index="03" eyebrow="Career evidence map" title={<>A career is more than<br /><em>a keyword list.</em></>} copy="Hanaply connects verified experience, skills, projects, tools, preferences, and goals to the requirements of a real role." light /><div className="constellation-layout"><CareerConstellationScene /><div className="constellation-copy"><span className="eyebrow">How evidence flows</span><h3>A job activates only the facts that matter.</h3><p>The map shows a verified profile on the left, relevant evidence in the center, and a sample role on the right. Missing requirements stay separate. Hard blockers never hide behind an average score.</p><dl><div><dt><i className="mint" />Verified match</dt><dd>Evidence directly supports a requirement.</dd></div><div><dt><i className="blue" />Transferable</dt><dd>Related experience can carry into the role.</dd></div><div><dt><i className="coral" />Hard blocker</dt><dd>A constraint makes the role unrealistic now.</dd></div></dl></div></div></div></section>;
}

const dimensions = [["Career alignment", 92], ["Skills alignment", 88], ["Experience", 76], ["Seniority", 81], ["Compensation", 90], ["Location", 100], ["Education", 68], ["Certifications", 55], ["Freshness", 96], ["Competitiveness", 72]] as const;

const requirementInsights = {
  Responsibilities: {
    extracted: "Build reliable client automations and translate operational needs into documented workflows.",
    context: "This is the core work of the role, so Hanaply compares it with delivered projects—not job-title similarity.",
    verified: ["Workflow delivery", "Built and documented n8n automations"],
    transferable: ["Client discovery", "Operations interviews map to solution discovery"],
    gap: ["Solution diagrams", "Formal architecture diagrams need practice"],
    dimensions: ["Career alignment", "Experience"],
    effect: "Strengthens the match",
    verdict: "The sample profile already shows the role's main work in real projects.",
  },
  "Required skills": {
    extracted: "Hands-on n8n, API integration, workflow debugging, and clear technical documentation.",
    context: "Required skills carry more weight than preferred tools because the role expects them from day one.",
    verified: ["n8n + API integration", "Direct evidence appears in two sample projects"],
    transferable: ["TypeScript + Supabase", "Backend experience supports workflow debugging"],
    gap: ["Enterprise monitoring", "Production observability is not yet verified"],
    dimensions: ["Skills alignment", "Experience"],
    effect: "Supports a strong fit",
    verdict: "The essential technical requirements are covered; one production-depth gap remains visible.",
  },
  "Preferred skills": {
    extracted: "Experience with AI-assisted workflows, process mapping, and customer-facing delivery is preferred.",
    context: "Preferred skills improve competitiveness, but missing one should not become a hard blocker.",
    verified: ["Process documentation", "Verified workflow documentation is relevant"],
    transferable: ["AI workflow design", "Prototype work transfers to this preference"],
    gap: ["Vendor certification", "Useful, but not required for application"],
    dimensions: ["Skills alignment", "Competitiveness"],
    effect: "Adds supporting evidence",
    verdict: "The profile meets enough preferences to stay competitive without overstating expertise.",
  },
  Experience: {
    extracted: "Two or more years delivering automation or technical operations projects for real users.",
    context: "Hanaply separates years of relevant work from years spent under an identical title.",
    verified: ["3 years of delivery", "Workflow and operations projects meet the threshold"],
    transferable: ["Technical operations", "Adjacent delivery experience counts as relevant"],
    gap: ["Role-title history", "No formal Solutions Engineer title"],
    dimensions: ["Experience", "Seniority"],
    effect: "Meets the experience bar",
    verdict: "Relevant delivery evidence matters more here than an exact previous title.",
  },
  Education: {
    extracted: "A technical degree or equivalent practical experience is acceptable.",
    context: "The posting explicitly accepts equivalent experience, so education is not treated as a blocker.",
    verified: ["Relevant coursework", "Information systems coursework is recorded"],
    transferable: ["Practical experience", "Delivered systems support equivalency"],
    gap: ["Completed degree", "A completed technical degree is not verified"],
    dimensions: ["Education", "Certifications"],
    effect: "Keeps the role viable",
    verdict: "Practical experience offsets the education gap under the employer's stated requirement.",
  },
  Location: {
    extracted: "Applicants must be based in the Philippines and able to overlap with Manila business hours.",
    context: "Location is checked as a deterministic constraint before softer matching dimensions.",
    verified: ["Philippines eligibility", "Sample profile is based in Manila"],
    transferable: ["Time-zone overlap", "Existing work history matches required hours"],
    gap: ["Occasional travel", "Quarterly Makati travel needs confirmation"],
    dimensions: ["Location"],
    effect: "Clears a hard constraint",
    verdict: "The role remains actionable because location and working-hour requirements are satisfied.",
  },
  "Work arrangement": {
    extracted: "Remote-first, with optional team days and quarterly in-person planning in Makati.",
    context: "The arrangement is compared with explicit work preferences rather than inferred from keywords.",
    verified: ["Remote preference", "Remote or hybrid work is selected"],
    transferable: ["Hybrid collaboration", "Prior hybrid delivery supports team days"],
    gap: ["Planning travel", "Quarterly attendance still needs confirmation"],
    dimensions: ["Career alignment", "Location"],
    effect: "Matches work preferences",
    verdict: "The normal arrangement fits; only occasional travel needs a human review.",
  },
  Compensation: {
    extracted: "The posted range is ₱80,000–₱110,000 per month, subject to final leveling.",
    context: "Hanaply checks the disclosed range against the person's target without inventing an offer.",
    verified: ["Target range overlap", "The sample target sits inside the posted range"],
    transferable: ["Leveling flexibility", "Relevant projects support mid-level review"],
    gap: ["Total package", "Benefits and equity are not disclosed"],
    dimensions: ["Compensation"],
    effect: "Meets the salary target",
    verdict: "Base compensation aligns, while undisclosed package details remain a review item.",
  },
} as const;

type RequirementName = keyof typeof requirementInsights;

export function JobIntelligence() {
  const [selected, setSelected] = useState<RequirementName>("Responsibilities");
  const requirements = Object.keys(requirementInsights) as RequirementName[];
  const insight = requirementInsights[selected];
  return <section id="job-intelligence" className="intelligence-section section-pad"><div className="content-shell"><SectionIntro index="04" eyebrow="AI job intelligence" title={<>Not “do the keywords match?”<br /><em>Does this role make sense?</em></>} copy="A verdict is the result of visible dimensions, extracted requirements, deterministic blockers, and grounded career evidence." /><div className="intelligence-console">
    <div className="requirement-pane"><div className="console-label"><Code2 size={16} /> Requirement extraction <strong>DEMONSTRATION DATA</strong></div><div className="jd-card"><span>Atlas Workflow</span><h3>Automation Solutions Engineer</h3><p>Build and maintain client automations, translate operational needs, document reliable workflows, and partner with technical teams.</p></div><p className="requirement-helper">Choose a requirement to inspect its evidence and see how it affects the recommendation.</p><div className="requirement-list" role="tablist" aria-label="Extracted job requirements" onKeyDown={(event) => { if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return; event.preventDefault(); const tabs = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')]; const current = tabs.indexOf(document.activeElement as HTMLButtonElement); const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : event.key === "ArrowDown" ? (current + 1) % tabs.length : (current - 1 + tabs.length) % tabs.length; tabs[next]?.focus(); tabs[next]?.click(); }}>{requirements.map((item, index) => <button type="button" id={`requirement-tab-${index}`} role="tab" aria-selected={selected === item} aria-controls="classified-requirement-panel" tabIndex={selected === item ? 0 : -1} key={item} className={selected === item ? "active" : ""} onClick={() => setSelected(item)}><span>{String(index + 1).padStart(2, "0")}</span>{item}<ChevronRight size={15} /></button>)}</div></div>
    <div className="classification-pane" id="classified-requirement-panel" role="tabpanel" aria-labelledby={`requirement-tab-${requirements.indexOf(selected)}`} aria-live="polite"><div className="console-label"><Sparkles size={16} /> Classified requirements <span>Inspecting: {selected}</span></div><div className="selection-explanation" key={selected}><span>EXTRACTED REQUIREMENT</span><strong>{insight.extracted}</strong><p>{insight.context}</p></div><div className="classification-cards"><article className="verified"><Check size={16} /><div><span>Verified match</span><strong>{insight.verified[0]}</strong><small>{insight.verified[1]}</small></div></article><article className="transfer"><ArrowRight size={16} /><div><span>Transferable</span><strong>{insight.transferable[0]}</strong><small>{insight.transferable[1]}</small></div></article><article className="learnable"><Clock3 size={16} /><div><span>Gap to review</span><strong>{insight.gap[0]}</strong><small>{insight.gap[1]}</small></div></article></div><div className="dimension-chart">{dimensions.map(([label, score]) => <div className={(insight.dimensions as readonly string[]).includes(label) ? "selected" : ""} key={label}><span>{label}</span><i><em style={{ width: `${score}%` }} /></i><strong>{score}</strong></div>)}</div><div className="verdict-card"><span className="signal-orb mint" /><div><small>HOW THIS AFFECTS THE VERDICT</small><strong>{insight.effect}</strong><p>{insight.verdict}</p></div><b>88</b></div></div>
  </div></div></section>;
}

function ClaimVerification() {
  return <section className="claim-verification-section section-pad"><div className="content-shell"><SectionIntro index="05" eyebrow="Claim verification" title={<>AI should help you present the truth,<br /><em>not invent a career.</em></>} copy="Before a document is shown, Hanaply compares its claims with confirmed career details and removes anything unsupported." light /><ClaimVerificationDemo /></div></section>;
}

function ApplicationPacks() {
  return <section id="application-packs" className="pack-section section-pad"><div className="content-shell"><SectionIntro index="06" eyebrow="Application Pack assembly" title={<>One worthwhile signal.<br /><em>A complete, truthful next step.</em></>} copy="After a strong match is explained, Hanaply prepares a coordinated set of materials for the person to review and use." /><ApplicationPackDemo /></div></section>;
}

function ResumeSection() {
  return <section className="resume-section section-pad"><div className="content-shell"><SectionIntro index="07" eyebrow="Resume variation" title={<>Strategy changes the story.<br /><em>Templates change the frame.</em></>} copy="Content order and visual presentation are independent choices. Both stay ATS-aware and preserve verified facts." /><ResumeComparison /></div></section>;
}

function DashboardSection() { return <section className="dashboard-section section-pad"><div className="wide-shell"><SectionIntro index="08" eyebrow="Customer experience" title={<>A dashboard designed around<br /><em>decisions, not feeds.</em></>} copy="Explore a conceptual customer workspace. Every state is product preview data, not a live account." light /><ProductDashboardPreview /></div></section>; }
function AdminSection() { return <section className="admin-section section-pad"><div className="wide-shell"><SectionIntro index="09" eyebrow="Admin control center" title={<>Operations should be configurable,<br /><em>auditable, and reversible.</em></>} copy="Preview how operators may control sources, prompts, models, entitlements, platform flags, and audit events." /><AdminPreview /></div></section>; }

function PricingSection() {
  const [annual, setAnnual] = useState(true);
  return <section id="pricing" className="pricing-section section-pad"><div className="content-shell"><SectionIntro index="10" eyebrow="Plan vision" title={<>Clear limits. Useful differences.<br /><em>No manufactured urgency.</em></>} copy="Plus focuses one career direction. Pro adds profiles, speed, variations, and deeper guidance. Pricing remains a product vision until approved for launch." /><div className="pricing-toolbar"><span>Product pricing vision · PHP</span><div role="group" aria-label="Billing interval"><button type="button" onClick={() => setAnnual(false)} className={!annual ? "active" : ""}>Monthly</button><button type="button" onClick={() => setAnnual(true)} className={annual ? "active" : ""}>Annual <span>Save 20%</span></button></div></div><div className="plan-grid">{plans.map((plan) => { const monthlyEquivalent = Math.round(plan.annual / 12); const savings = plan.monthly * 12 - plan.annual; return <article key={plan.name} className={plan.name === "Pro" ? "featured" : ""}><header><div><span>{plan.name === "Pro" ? "DEEPER INTELLIGENCE" : "FOCUSED RADAR"}</span><h3>{plan.name}</h3></div>{plan.name === "Pro" && <Sparkles size={22} />}</header><p>{plan.description}</p><div className="price"><small>₱</small><strong>{annual ? monthlyEquivalent.toLocaleString() : plan.monthly.toLocaleString()}</strong><span>/ month<br />{annual ? "billed annually" : "billed monthly"}</span></div>{annual && <div className="annual-note">₱{plan.annual.toLocaleString()} per year · Save ₱{savings.toLocaleString()}</div>}<ul>{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul><button type="button">Explore {plan.name} vision <ArrowRight size={16} /></button></article>; })}</div><p className="pricing-note">Plan details are proposed product limits and are not yet a customer offer.</p></div></section>;
}

function RoadmapPreview() {
  return <section className="roadmap-preview section-pad"><div className="content-shell"><SectionIntro index="11" eyebrow="Product journey" title={<>A roadmap built from gates,<br /><em>not wishful dates.</em></>} copy="Each phase exposes its purpose, dependencies, acceptance gates, risks, and owner decisions. Production phases remain planned until the source of truth changes." light /><div className="route-map"><div className="route-line" />{roadmap.slice(0, 7).map((phase, index) => <Link key={phase.id} href={`/roadmap#${phase.id}`} className={index === 0 ? "featured" : ""}><span>{phase.number}</span><div><small>{phase.status}</small><strong>{phase.title}</strong></div><ArrowUpRight size={16} /></Link>)}</div><div className="section-cta"><div><span>11 phases + future mobile</span><p>Explore every dependency, risk, acceptance gate, and owner decision.</p></div><Link className="primary-button light-button" href="/roadmap">Open interactive roadmap <ArrowRight size={17} /></Link></div></div></section>;
}

function ArchitecturePreview() {
  const flow = ["Sources", "Normalize", "Match", "Analyze", "Verify claims", "Pack", "Clients"];
  return <section className="architecture-preview section-pad"><div className="content-shell"><SectionIntro index="12" eyebrow="Shared intelligence architecture" title={<>One career system.<br /><em>Many trusted surfaces.</em></>} copy="Business rules, evidence, entitlements, and safety controls stay in a shared backend instead of drifting between web and future mobile clients." /><div className="architecture-stage"><div className="arch-flow">{flow.map((item, index) => <div key={item} className={index === 4 ? "protected" : ""}><span>{index === 4 ? <ShieldCheck size={17} /> : index < 2 ? <Globe2 size={17} /> : index > 4 ? <FileCheck2 size={17} /> : <Boxes size={17} />}</span><strong>{item}</strong>{index < flow.length - 1 && <i><ArrowRight size={14} /></i>}</div>)}</div><div className="arch-support"><span>Supabase Auth</span><span>PostgreSQL + RLS</span><span>LLM Providers</span><span>Audit Logs</span><span>Feature Flags</span></div></div><div className="section-cta dark-cta"><div><span>Inspect every boundary</span><p>Open a node to see inputs, outputs, ownership, failure behavior, and mobile relevance.</p></div><Link className="primary-button" href="/architecture">Explore the architecture <ArrowRight size={17} /></Link></div></div></section>;
}

function MobileFuture() {
  return <section id="mobile" className="mobile-section section-pad"><div className="content-shell"><SectionIntro index="13" eyebrow="Mobile future" title={<>Built for the web first.<br /><em>Designed for mobile from day one.</em></>} copy="The planned React Native apps will connect to the same authentication, entitlements, career intelligence, documents, and event system." light /><div className="mobile-platform-map"><div className="surface-row"><article className="surface web"><Globe2 size={23} /><span>Web SaaS</span><small>First product surface</small></article><article className="surface ios"><Smartphone size={23} /><span>React Native iOS</span><small>Future phase</small></article><article className="surface android"><Smartphone size={23} /><span>React Native Android</span><small>Future phase</small></article></div><div className="mobile-data-path"><i /><span>ONE VERSIONED API AND EVENT CONTRACT</span><i /></div><div className="platform-core"><div><span className="brand-mark"><i /><i /><i /></span><span><strong>Shared Hanaply platform</strong><small>Business rules stay in one trusted backend</small></span></div><div className="platform-layers"><span>Authentication</span><span>Entitlements</span><span>Career intelligence</span><span>Documents</span></div></div><div className="mobile-capabilities"><span>Push notifications</span><span>Deep links</span><span>Minimum versions</span><span>Platform flags</span></div></div><p className="demo-disclaimer inverse"><Smartphone size={15} /> Mobile applications are future product direction, not currently available.</p></div></section>;
}

function Principles() {
  return <section className="principles-section section-pad"><div className="content-shell"><SectionIntro index="14" eyebrow="Product principles" title={<>The system is ambitious.<br /><em>The rules stay simple.</em></>} copy="These principles define how Hanaply should make decisions when speed, persuasion, and product integrity compete." /><div className="principles-list">{principles.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p><i /></article>)}</div><div className="final-statement"><span className="status-kicker"><i />PRODUCT VISION</span><h2>This is not just a job board.<br />It is an intelligent career system.</h2><div><p>Explore how Hanaply finds relevant roles, explains fit, and prepares stronger applications.</p><div><a className="primary-button light-button" href="#career-radar">Explore Career Radar <ArrowRight size={17} /></a><Link className="secondary-button inverse-button" href="/docs">Read the documentation <ArrowUpRight size={17} /></Link></div></div></div></div></section>;
}
