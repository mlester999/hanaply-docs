"use client";

import { AlertTriangle, ArrowRight, Database, FileOutput, Fingerprint, Layers3, Radio, ShieldCheck, Smartphone, UserRoundCog } from "lucide-react";
import { useEffect, useState } from "react";
import { architectureNodes } from "@/content/architecture";

const layerMeta = {
  source: ["Sources", Radio], intelligence: ["Intelligence", Layers3], platform: ["Platform", Database], experience: ["Experience", FileOutput], control: ["Control", UserRoundCog],
} as const;

export function ArchitectureExplorer() {
  const [selected, setSelected] = useState("match");
  const [flat, setFlat] = useState(false);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 520px)").matches) setFlat(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  const node = architectureNodes.find((item) => item.id === selected) ?? architectureNodes[0];
  return <div className="architecture-explorer">
    <div className="architecture-toolbar"><div>{Object.entries(layerMeta).map(([key, [label]]) => <span key={key}><i className={key} />{label}</span>)}</div><button type="button" onClick={() => setFlat((value) => !value)}>{flat ? "Show system map" : "Show flat diagram"}</button></div>
    <div className={`architecture-map ${flat ? "flat" : "spatial"}`} aria-label="Interactive Hanaply system architecture">
      {flat ? <FlatDiagram selected={selected} onSelect={setSelected} /> : <SpatialMap selected={selected} onSelect={setSelected} />}
    </div>
    <article className="node-inspector" aria-live="polite"><header><div><span className={`layer-tag ${node.layer}`}>{layerMeta[node.layer][0]}</span><small>{node.phase}</small></div><strong>{architectureNodes.findIndex((item) => item.id === node.id) + 1}/{architectureNodes.length}</strong></header><h2>{node.label}</h2><p>{node.purpose}</p><div className="io-grid"><section><span><ArrowRight size={14} />Inputs</span>{node.inputs.map((item) => <b key={item}>{item}</b>)}</section><section><span><FileOutput size={14} />Outputs</span>{node.outputs.map((item) => <b key={item}>{item}</b>)}</section></div><dl><div><dt><ShieldCheck size={15} /> Security boundary</dt><dd>{node.security}</dd></div><div><dt><Fingerprint size={15} /> Data ownership</dt><dd>{node.ownership}</dd></div><div><dt><AlertTriangle size={15} /> Failure behavior</dt><dd>{node.failure}</dd></div><div><dt><Smartphone size={15} /> Mobile relevance</dt><dd>{node.mobile}</dd></div></dl></article>
  </div>;
}

function SpatialMap({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return <div className="spatial-network"><div className="network-grid" />{architectureNodes.map((node, index) => <button type="button" key={node.id} className={`arch-node node-${index + 1} ${node.layer} ${selected === node.id ? "active" : ""}`} onClick={() => onSelect(node.id)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{node.label}</strong><small>{layerMeta[node.layer][0]}</small></button>)}<div className="data-path path-a" /><div className="data-path path-b" /><div className="data-path path-c" /></div>;
}

function FlatDiagram({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const primary = architectureNodes.filter((node) => node.id !== "control");
  const control = architectureNodes.find((node) => node.id === "control")!;
  return <div className="flat-architecture"><div className="flat-flow">{primary.map((node, index) => <div key={node.id}><button type="button" className={`${node.layer} ${selected === node.id ? "active" : ""}`} onClick={() => onSelect(node.id)}><span>{index + 1}</span>{node.label}</button>{index < primary.length - 1 && <ArrowRight size={16} />}</div>)}</div><div className="control-plane"><span>Supporting control plane</span><button type="button" className={selected === control.id ? "active" : ""} onClick={() => onSelect(control.id)}>{control.label}</button><span>Auth · RLS · Storage · Audit · Flags · Observability</span></div></div>;
}
