import type { Metadata } from "next";
import { ArchitectureExplorer } from "@/components/architecture/ArchitectureExplorer";

export const metadata: Metadata = { title: "Architecture | Hanaply Vision", description: "Inspect Hanaply's proposed job intelligence pipeline, system boundaries, failure behavior, and mobile relevance.", alternates: { canonical: "/architecture" } };

export default function ArchitecturePage() { return <div className="inner-page architecture-page"><header className="page-hero"><span className="page-kicker">INTERACTIVE SYSTEM EXPLORER</span><h1>One shared platform.<br /><em>Clear boundaries.</em></h1><p>Follow a job from approved source to explainable match, truthful Application Pack, alert, and future mobile client.</p><div className="page-status architecture-status"><span /><strong>Conceptual architecture</strong><small>Every node explains ownership and safe failure behavior</small></div></header><ArchitectureExplorer /></div>; }
