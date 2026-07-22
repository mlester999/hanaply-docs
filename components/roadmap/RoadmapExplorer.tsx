"use client";

import { AlertTriangle, ArrowDown, CheckCircle2, ChevronRight, CircleDot, Link2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { roadmap } from "@/content/roadmap";

export function RoadmapExplorer() {
  const [selected, setSelected] = useState(roadmap[0].id);
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (roadmap.some((phase) => phase.id === hash)) requestAnimationFrame(() => setSelected(hash));
  }, []);
  const phase = roadmap.find((item) => item.id === selected) ?? roadmap[0];
  const select = (id: string) => { setSelected(id); window.history.replaceState(null, "", `#${id}`); document.getElementById("phase-detail")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" }); };
  const copy = async () => { await navigator.clipboard?.writeText(`${window.location.origin}/roadmap#${phase.id}`); };
  return <div className="roadmap-explorer">
    <div className="roadmap-route" aria-label="Product phases">{roadmap.map((item, index) => <button type="button" key={item.id} onClick={() => select(item.id)} className={selected === item.id ? "active" : ""} aria-current={selected === item.id ? "step" : undefined}><span className="route-node"><i />{item.number}</span><span className="route-info"><small>{item.status}</small><strong>{item.title}</strong></span>{index < roadmap.length - 1 && <span className="route-connector" />}</button>)}</div>
    <article id="phase-detail" className="phase-detail" aria-live="polite">
      <header><div><span className="phase-number">PHASE {phase.number}</span><span className="status-badge planned"><CircleDot size={13} />{phase.status}</span></div><button type="button" onClick={copy}><Link2 size={15} />Copy phase link</button></header>
      <h2>{phase.title}</h2><p className="phase-purpose">{phase.purpose}</p>
      <div className="phase-grid"><section><span className="detail-label"><CheckCircle2 size={15} /> Deliverables</span><ul>{phase.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></section><section><span className="detail-label"><ShieldCheck size={15} /> Acceptance gates</span><ul>{phase.gates.map((item) => <li key={item}>{item}</li>)}</ul></section><section><span className="detail-label"><ArrowDown size={15} /> Dependencies</span>{phase.dependencies.length ? <ul>{phase.dependencies.map((item) => <li key={item}>{item}</li>)}</ul> : <p>No earlier product phase.</p>}</section><section><span className="detail-label"><AlertTriangle size={15} /> Risks</span><ul>{phase.risks.map((item) => <li key={item}>{item}</li>)}</ul></section></div>
      <div className="owner-decisions"><span>OWNER DECISIONS</span>{phase.decisions.length ? phase.decisions.map((decision) => <p key={decision}><ChevronRight size={15} />{decision}</p>) : <p><CheckCircle2 size={15} />No owner decision recorded for this phase.</p>}</div>
      <footer><span>Source of truth: <code>content/roadmap.ts</code></span><strong>No production phase is marked complete.</strong></footer>
    </article>
  </div>;
}
