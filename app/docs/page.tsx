import type { Metadata } from "next";
import { DocsIndex } from "@/components/docs/DocsExperience";

export const metadata: Metadata = { title: "Documentation | Hanaply Vision", description: "Read the structured product, architecture, security, roadmap, and mobile-readiness documentation for Hanaply.", alternates: { canonical: "/docs" } };

export default function DocsPage() { return <div className="inner-page docs-page"><header className="page-hero compact"><span className="page-kicker">PRODUCT DOCUMENTATION</span><h1>The thinking behind<br /><em>the system.</em></h1><p>Structured reference for Hanaply’s product logic, safety boundaries, roadmap, and future platform direction.</p></header><DocsIndex /></div>; }
