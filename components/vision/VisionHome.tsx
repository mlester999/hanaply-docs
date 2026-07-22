"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Ban, Boxes, Check, ChevronRight, Clock3, Code2, FileCheck2, Filter, Globe2, Layers3, ShieldCheck, Smartphone, Sparkles, Target, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CareerRadarSimulator } from "@/components/radar/CareerRadarSimulator";
import { ApplicationPackDemo, TruthGateDemo } from "@/components/application/ApplicationPackDemo";
import { AdminPreview, ProductDashboardPreview, ResumeComparison } from "@/components/product/ProductPreviews";
import { plans } from "@/content/plans";
import { principles } from "@/content/principles";
import { roadmap } from "@/content/roadmap";
import { motionTokens, reveal } from "@/lib/motion";

const CareerSignalScene = dynamic(() => import("@/components/three/ProductScenes").then((module) => module.CareerSignalScene), { ssr: false, loading: () => <div className="scene-loading" aria-label="Loading the Career Radar visualization"><i /><i /><i /></div> });
const CareerConstellationScene = dynamic(() => import("@/components/three/ProductScenes").then((module) => module.CareerConstellationScene), { ssr: false, loading: () => <div className="constellation-loading">Loading the accessible career map…</div> });

const introSteps = ["Signal found", "Noise filtered", "Profile verified", "Pack prepared"];

export function VisionHome() {
  return <div className="vision-home"><Hero /><Problem /><CareerRadar /><CareerProfile /><JobIntelligence /><TruthGate /><ApplicationPacks /><ResumeSection /><DashboardSection /><AdminSection /><PricingSection /><RoadmapPreview /><ArchitecturePreview /><MobileFuture /><Principles /></div>;
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
      <motion.div className="status-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}><span />Product Vision Experience <small>Not a live product</small></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.15, duration: 0.7, ease: motionTokens.ease }}>Your career radar<br />never stops <em>searching.</em></motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.4, duration: 0.6 }}>Hanaply discovers fresh jobs, analyzes how well they match your real experience, and prepares tailored resumes and cover letters for opportunities worth pursuing.</motion.p>
      <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.6 }}><a className="primary-button" href="#career-radar">Explore the vision <ArrowDown size={18} /></a><Link className="secondary-button" href="/roadmap">Open the roadmap <ArrowUpRight size={17} /></Link></motion.div>
      <div className="hero-proof"><div><strong>01</strong><span>Discover<br />fresh signals</span></div><div><strong>02</strong><span>Explain<br />real fit</span></div><div><strong>03</strong><span>Prepare<br />truthful packs</span></div></div>
    </div>
    <div className="hero-visual">
      <div className="hero-scene-head"><div><span>CAREER SIGNAL FIELD</span><strong>Manila · 08:42</strong></div>{introStep < introSteps.length && <button type="button" onClick={() => setIntroStep(introSteps.length)}>Skip sequence</button>}</div>
      <CareerSignalScene />
      <div className="signal-readout"><AnimatePresence mode="wait"><motion.div key={introStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><span className="readout-number">{String(Math.min(introStep + 1, 4)).padStart(2, "0")}</span><div><small>RADAR SEQUENCE</small><strong>{introStep >= introSteps.length ? "Worthwhile signal ready" : introSteps[introStep]}</strong></div></motion.div></AnimatePresence><span className={`readout-state ${introStep >= introSteps.length ? "ready" : ""}`}>{introStep >= introSteps.length ? "READY" : "ANALYZING"}</span></div>
      <article className="hero-job-card"><span className="company-glyph">A</span><div><small>Atlas Workflow · Demonstration Data</small><strong>Automation Solutions Engineer</strong><span>Strong Match · 88</span></div><ChevronRight size={18} /></article>
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

function JobIntelligence() {
  const [selected, setSelected] = useState("Required skills");
  const requirements = ["Responsibilities", "Required skills", "Preferred skills", "Experience", "Education", "Location", "Work arrangement", "Compensation"];
  return <section className="intelligence-section section-pad"><div className="content-shell"><SectionIntro index="04" eyebrow="AI job intelligence" title={<>Not “do the keywords match?”<br /><em>Does this role make sense?</em></>} copy="A verdict is the result of visible dimensions, extracted requirements, deterministic blockers, and grounded career evidence." /><div className="intelligence-console">
    <div className="requirement-pane"><div className="console-label"><Code2 size={16} /> Requirement extraction <strong>DEMONSTRATION DATA</strong></div><div className="jd-card"><span>Atlas Workflow</span><h3>Automation Solutions Engineer</h3><p>Build and maintain client automations, translate operational needs, document reliable workflows, and partner with technical teams.</p></div><div className="requirement-list">{requirements.map((item, index) => <button type="button" key={item} className={selected === item ? "active" : ""} onClick={() => setSelected(item)}><span>{String(index + 1).padStart(2, "0")}</span>{item}<ChevronRight size={15} /></button>)}</div></div>
    <div className="classification-pane"><div className="console-label"><Sparkles size={16} /> Classified requirements <span>Selected: {selected}</span></div><div className="classification-cards"><article className="verified"><Check size={16} /><div><span>Verified match</span><strong>n8n workflow delivery</strong><small>Supported by project evidence</small></div></article><article className="transfer"><ArrowRight size={16} /><div><span>Transferable</span><strong>Client discovery</strong><small>Maps to solutions consultation</small></div></article><article className="learnable"><Clock3 size={16} /><div><span>Learnable gap</span><strong>Formal solution diagrams</strong><small>Practical preparation recommended</small></div></article></div><div className="dimension-chart">{dimensions.map(([label, score]) => <div key={label}><span>{label}</span><i><em style={{ width: `${score}%` }} /></i><strong>{score}</strong></div>)}</div><div className="verdict-card"><span className="signal-orb mint" /><div><small>EXPLAINABLE VERDICT</small><strong>Strong Match</strong><p>Apply after a focused review. One gap is learnable and no hard blockers were found.</p></div><b>88</b></div></div>
  </div></div></section>;
}

function TruthGate() {
  return <section className="truth-section section-pad"><div className="content-shell"><SectionIntro index="05" eyebrow="Truth Gate" title={<>AI should help you present the truth,<br /><em>not invent a career.</em></>} copy="Generated documents are useful only when every meaningful claim stays grounded in facts the person has verified." light /><TruthGateDemo /></div></section>;
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
  const flow = ["Sources", "Normalize", "Match", "Analyze", "Truth Gate", "Pack", "Clients"];
  return <section className="architecture-preview section-pad"><div className="content-shell"><SectionIntro index="12" eyebrow="Shared intelligence architecture" title={<>One career system.<br /><em>Many trusted surfaces.</em></>} copy="Business rules, evidence, entitlements, and safety controls stay in a shared backend instead of drifting between web and future mobile clients." /><div className="architecture-stage"><div className="arch-flow">{flow.map((item, index) => <div key={item} className={index === 4 ? "protected" : ""}><span>{index === 4 ? <ShieldCheck size={17} /> : index < 2 ? <Globe2 size={17} /> : index > 4 ? <FileCheck2 size={17} /> : <Boxes size={17} />}</span><strong>{item}</strong>{index < flow.length - 1 && <i><ArrowRight size={14} /></i>}</div>)}</div><div className="arch-support"><span>Supabase Auth</span><span>PostgreSQL + RLS</span><span>LLM Providers</span><span>Audit Logs</span><span>Feature Flags</span></div></div><div className="section-cta dark-cta"><div><span>Inspect every boundary</span><p>Open a node to see inputs, outputs, ownership, failure behavior, and mobile relevance.</p></div><Link className="primary-button" href="/architecture">Explore the architecture <ArrowRight size={17} /></Link></div></div></section>;
}

function MobileFuture() {
  return <section id="mobile" className="mobile-section section-pad"><div className="content-shell"><SectionIntro index="13" eyebrow="Mobile future" title={<>Built for the web first.<br /><em>Designed for mobile from day one.</em></>} copy="The planned React Native apps will connect to the same authentication, entitlements, career intelligence, documents, and event system." light /><div className="mobile-platform-map"><div className="surface-row"><article className="surface web"><Globe2 size={23} /><span>Web SaaS</span><small>First product surface</small></article><article className="surface ios"><Smartphone size={23} /><span>React Native iOS</span><small>Future phase</small></article><article className="surface android"><Smartphone size={23} /><span>React Native Android</span><small>Future phase</small></article></div><div className="mobile-data-path"><i /><span>ONE VERSIONED API AND EVENT CONTRACT</span><i /></div><div className="platform-core"><div><span className="brand-mark"><i /><i /><i /></span><span><strong>Shared Hanaply platform</strong><small>Business rules stay in one trusted backend</small></span></div><div className="platform-layers"><span>Authentication</span><span>Entitlements</span><span>Career intelligence</span><span>Documents</span></div></div><div className="mobile-capabilities"><span>Push notifications</span><span>Deep links</span><span>Minimum versions</span><span>Platform flags</span></div></div><p className="demo-disclaimer inverse"><Smartphone size={15} /> Mobile applications are future product direction, not currently available.</p></div></section>;
}

function Principles() {
  return <section className="principles-section section-pad"><div className="content-shell"><SectionIntro index="14" eyebrow="Product principles" title={<>The system is ambitious.<br /><em>The rules stay simple.</em></>} copy="These principles define how Hanaply should make decisions when speed, persuasion, and product integrity compete." /><div className="principles-list">{principles.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p><i /></article>)}</div><div className="final-statement"><span className="status-kicker"><i />PRODUCT VISION</span><h2>This is not just a job board.<br />It is an intelligent career system.</h2><div><p>Explore how Hanaply may be built, where the work stands, and what remains deliberately planned.</p><div><Link className="primary-button light-button" href="/build-status">View Build Status <ArrowRight size={17} /></Link><Link className="secondary-button inverse-button" href="/docs">Read the documentation <ArrowUpRight size={17} /></Link></div></div></div></div></section>;
}
