import type { Metadata } from "next";
import { AlertTriangle, ArrowRight, CheckCircle2, CircleDot, Clock3, ExternalLink, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { buildStatus } from "@/content/build-status";

export const metadata: Metadata = { title: "Build Status | Hanaply Vision", description: "See Hanaply's explicit vision-site build status, owner actions, known limitations, and production availability boundary.", alternates: { canonical: "/build-status" } };

const groups = [
  ["Completed systems", buildStatus.completed, CheckCircle2, "complete"],
  ["In-progress systems", buildStatus.inProgress, Clock3, "progress"],
  ["Pending validations", buildStatus.validations, CircleDot, "pending"],
  ["Owner actions", buildStatus.ownerActions, ArrowRight, "owner"],
] as const;

export default function BuildStatusPage() { return <div className="inner-page build-page"><header className="build-hero"><div><span className="page-kicker">REAL PROJECT STATUS · {buildStatus.updatedAt}</span><h1>Vision is clear.<br /><em>Production is ahead.</em></h1><p>{buildStatus.summary}</p></div><div className="decision-panel"><span>IMPLEMENTATION DECISION</span><strong>{buildStatus.decision}</strong><p>Local vision experience is review-ready. Production product capabilities remain planned.</p><div><i />Current phase: {buildStatus.currentPhase}</div></div></header><div className="availability-warning"><ShieldAlert size={22} /><div><strong>This page reflects development status, not product availability.</strong><p>No customer SaaS, payment flow, live job ingestion, or mobile app is represented as available.</p></div></div><div className="status-groups">{groups.map(([title, items, Icon, kind]) => <section key={title} className={kind}><header><Icon size={19} /><h2>{title}</h2><span>{items.length}</span></header>{items.map((item) => <div key={item}><i />{item}</div>)}</section>)}</div><div className="status-lower"><section><span className="detail-label"><AlertTriangle size={16} /> Known limitations</span>{buildStatus.limitations.map((item) => <p key={item}>{item}</p>)}</section><section><span className="detail-label"><Clock3 size={16} /> Deferred work</span>{buildStatus.deferred.map((item) => <p key={item}>{item}</p>)}</section><section className="milestone-notes"><span className="detail-label"><CheckCircle2 size={16} /> Latest milestone notes</span>{buildStatus.milestoneNotes.map((item) => <p key={item}>{item}</p>)}</section></div><div className="build-source"><div><span>OWNER-EDITABLE SOURCE</span><strong>content/build-status.ts</strong><p>Status changes are validated against an explicit schema. Unknown decisions and phase states fail the build.</p></div><Link href="/docs/roadmap">Read status discipline <ExternalLink size={16} /></Link></div></div>; }
