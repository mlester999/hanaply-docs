import type { Metadata } from "next";
import { RoadmapExplorer } from "@/components/roadmap/RoadmapExplorer";

export const metadata: Metadata = { title: "Roadmap | Hanaply Vision", description: "Explore Hanaply's planned delivery phases, dependencies, acceptance gates, risks, and owner decisions.", alternates: { canonical: "/roadmap" } };

export default function RoadmapPage() { return <div className="inner-page roadmap-page"><header className="page-hero"><span className="page-kicker">PRODUCT ROADMAP · SOURCE-DRIVEN</span><h1>A product journey built<br />from <em>real gates.</em></h1><p>Explore what Hanaply plans to build, why each phase exists, what it depends on, and how the team will know it is ready.</p><div className="page-status"><span /><strong>All production phases: Planned</strong><small>Updated only through the roadmap source of truth</small></div></header><RoadmapExplorer /></div>; }
