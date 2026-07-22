"use client";

import { Check, FileCheck2, FileText, MessageSquare, ShieldCheck, Sparkles, Target } from "lucide-react";
import { useMemo, useState } from "react";

const items = [
  { id: "analysis", label: "AI job analysis", icon: Target },
  { id: "letter", label: "Tailored cover letter", icon: FileText },
  { id: "resume", label: "Tailored resume", icon: FileCheck2 },
  { id: "message", label: "Recruiter message", icon: MessageSquare },
  { id: "interview", label: "Interview preparation", icon: Sparkles },
  { id: "checklist", label: "Application checklist", icon: Check },
];

const letterContent: Record<string, string> = {
  Professional: "I build practical automations that connect product requirements with reliable delivery. In a recent verified project, I integrated n8n, OpenAI, and Supabase to reduce repetitive operational work.",
  "Results First": "I reduced repetitive operational work by building a verified n8n workflow across OpenAI and Supabase. That hands-on delivery maps directly to Atlas Workflow's need for clear, maintainable automation.",
  "Warm and Conversational": "I enjoy finding the small, repeatable tasks that hold a team back, then turning them into thoughtful automations. My recent n8n, OpenAI, and Supabase project is a good example of that approach.",
};

const resumeData: Record<string, { summary: string; order: string[]; focus: string }> = {
  "ATS Professional": { summary: "Automation specialist with hands-on workflow, API, and operations experience.", order: ["Summary", "Skills", "Experience", "Projects", "Education"], focus: "Standard ATS-readable structure" },
  "Results Led": { summary: "Workflow builder focused on reducing repetitive work through grounded automation.", order: ["Impact summary", "Experience", "Selected results", "Skills", "Education"], focus: "Verified outcomes move upward" },
  "Technical Depth": { summary: "Technical automation specialist working across n8n, TypeScript, OpenAI, and Supabase.", order: ["Technical profile", "Tool stack", "Projects", "Experience", "Education"], focus: "Tools and architecture become prominent" },
};

export function TruthGateDemo() {
  const [blocked, setBlocked] = useState(false);
  return <div className="truth-demo">
    <div className="fact-bank"><span className="small-label">Verified fact bank</span>{["Project: Operations workflow", "Tools: n8n, OpenAI, Supabase", "Outcome: Reduced repetitive work"].map((fact) => <div key={fact}><ShieldCheck size={17} />{fact}</div>)}</div>
    <div className="claim-path" aria-hidden="true"><i /><span>Evidence path</span><i /></div>
    <div className={`claim-card ${blocked ? "blocked" : "safe"}`}><span className="small-label">AI-assisted sentence</span><p>{blocked ? "Architected enterprise infrastructure for a Fortune 500 company." : "Developed an automated workflow integrating OpenAI, Supabase, and Gmail to reduce repetitive operational work."}</p><div>{blocked ? <><span className="block-icon">×</span><strong>Blocked by Truth Gate</strong><small>No verified fact supports this claim.</small></> : <><Check size={17} /><strong>Grounded transformation</strong><small>Every meaningful claim has support.</small></>}</div><button type="button" onClick={() => setBlocked((value) => !value)}>{blocked ? "Show safe transformation" : "Test unsupported claim"}</button></div>
  </div>;
}

export function ApplicationPackDemo() {
  const [active, setActive] = useState("letter");
  const [letterStyle, setLetterStyle] = useState("Professional");
  const [resumeStyle, setResumeStyle] = useState("ATS Professional");
  const currentResume = resumeData[resumeStyle];
  const panel = useMemo(() => {
    if (active === "letter") return <DocumentPanel title="Cover letter" label="Truth Gate passed"><Segmented options={Object.keys(letterContent)} value={letterStyle} onChange={setLetterStyle} /><p className="document-copy">Dear Atlas Workflow team,</p><p className="document-copy">{letterContent[letterStyle]}</p><p className="document-copy">I would welcome the chance to discuss how that experience could support your automation practice.</p></DocumentPanel>;
    if (active === "resume") return <DocumentPanel title="Tailored resume" label="Verified facts fixed"><Segmented options={Object.keys(resumeData)} value={resumeStyle} onChange={setResumeStyle} /><div className="resume-preview"><h5>{currentResume.summary}</h5><span>{currentResume.focus}</span>{currentResume.order.map((section, index) => <div key={section}><b>{String(index + 1).padStart(2, "0")}</b><strong>{section}</strong><i /></div>)}</div></DocumentPanel>;
    if (active === "interview") return <DocumentPanel title="Interview preparation" label="Product visualization"><ul className="prep-list"><li><strong>Likely question</strong>Walk us through an automation you designed end to end.</li><li><strong>Gap to prepare</strong>Frame client discovery work as transferable solutions experience.</li><li><strong>Ask the employer</strong>How does the team review automations before they reach production?</li></ul></DocumentPanel>;
    if (active === "analysis") return <DocumentPanel title="AI job analysis" label="Explainable verdict"><div className="analysis-bars">{[["Career alignment", 92], ["Skills", 88], ["Experience", 76], ["Location", 100]].map(([label, value]) => <div key={label}><span>{label}</span><b>{value}%</b><i><em style={{ width: `${value}%` }} /></i></div>)}</div></DocumentPanel>;
    if (active === "message") return <DocumentPanel title="Recruiter message" label="Professional tone"><p className="document-copy">Hi Mara, I’m reaching out about the Automation Solutions Engineer role. My recent work connecting n8n, OpenAI, and Supabase aligns with the team’s workflow focus. I’d be glad to share a concise project walkthrough.</p></DocumentPanel>;
    return <DocumentPanel title="Application checklist" label="Human review required"><ul className="check-list"><li><Check size={15} /> Review role requirements</li><li><Check size={15} /> Confirm every document fact</li><li><span /> Add personal context</li><li><span /> Submit directly to employer</li></ul></DocumentPanel>;
  }, [active, letterStyle, resumeStyle, currentResume]);

  return <div className="pack-demo">
    <div className="pack-map"><article className="source-job"><span>Strong Match · 88</span><small>Atlas Workflow</small><h3>Automation Solutions Engineer</h3><p>Remote · Philippines</p></article><div className="pack-spine"><span><Sparkles size={17} /></span><i /></div><div className="pack-items" role="tablist" aria-label="Application Pack contents">{items.map((item, index) => <button key={item.id} type="button" role="tab" aria-selected={active === item.id} className={active === item.id ? "active" : ""} onClick={() => setActive(item.id)}><span><item.icon size={17} /></span><span><small>0{index + 1}</small>{item.label}</span><Check size={15} /></button>)}</div></div>
    <div className="pack-document" role="tabpanel">{panel}</div>
  </div>;
}

function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  return <div className="segmented" role="tablist">{options.map((option) => <button type="button" role="tab" aria-selected={option === value} key={option} className={option === value ? "active" : ""} onClick={() => onChange(option)}>{option}</button>)}</div>;
}

function DocumentPanel({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return <article className="document-panel"><header><div><span>Application Pack / Product visualization</span><h4>{title}</h4></div><strong><ShieldCheck size={14} />{label}</strong></header><div className="document-page">{children}</div><footer>Facts and dates remain fixed across every style.</footer></article>;
}
