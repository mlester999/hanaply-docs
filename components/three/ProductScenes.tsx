"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Html, Line } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function useSceneCapability() {
  const [state, setState] = useState({ reduced: true, lowPower: true });
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setState({
      reduced: query.matches,
      lowPower: window.innerWidth < 700 || (navigator.hardwareConcurrency ?? 8) <= 4,
    });
    update();
    query.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => { query.removeEventListener("change", update); window.removeEventListener("resize", update); };
  }, []);
  return state;
}

function useVisible<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const signalPositions = [
  [-2.45, 1.45, "raw"], [-1.4, 1.45, "raw"], [0.25, 1.45, "raw"], [1.65, 1.45, "raw"],
  [-1.8, 0, "filtered"], [-0.25, 0, "filtered"], [1.25, 0, "filtered"],
  [0.75, -1.45, "worthwhile"],
] as const;

function SignalField({ lowPower }: { lowPower: boolean }) {
  const scan = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (scan.current) scan.current.position.x = -3.1 + ((state.clock.elapsedTime * 0.72) % 6.2);
  });
  return (
    <group>
      <ambientLight intensity={1.5} />
      <pointLight position={[1, 2, 5]} color="#7091ff" intensity={16} distance={12} />
      <gridHelper args={[7.6, lowPower ? 12 : 18, "#263b7e", "#172342"]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.55]} />
      {[[1.45, "RAW JOB SIGNALS"], [0, "PROFILE RULES"], [-1.45, "WORTHWHILE SET"]].map(([y, label]) => <group key={label as string}>
        <Line points={[[-3.05, y as number, -0.1], [3.05, y as number, -0.1]]} color="#334a8f" lineWidth={1} transparent opacity={0.6} />
        <Html position={[-2.95, (y as number) + 0.35, 0]} center={false} distanceFactor={9}><span className="scene-axis-label">{label as string}</span></Html>
      </group>)}
      <group ref={scan}>
        <mesh position={[0, 0, 0.08]}><planeGeometry args={[0.035, 3.8]} /><meshBasicMaterial color="#6f8cff" transparent opacity={0.85} /></mesh>
        <mesh position={[0.12, 0, 0.02]}><planeGeometry args={[0.25, 3.8]} /><meshBasicMaterial color="#3157e8" transparent opacity={0.07} /></mesh>
      </group>
      {signalPositions.map(([x, y, stage], index) => {
        const worthwhile = stage === "worthwhile";
        const filtered = stage === "filtered";
        const color = worthwhile ? "#22c7a9" : filtered ? "#6f8cff" : "#50638f";
        return <mesh key={index} position={[x, y, worthwhile ? 0.25 : 0]}>
          <boxGeometry args={[worthwhile ? 0.72 : 0.34, worthwhile ? 0.38 : 0.24, worthwhile ? 0.18 : 0.1]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={worthwhile ? 2.5 : filtered ? 0.9 : 0.35} transparent opacity={stage === "raw" ? 0.65 : 1} />
        </mesh>;
      })}
      <Line points={[[0.75, -0.08, 0], [0.75, -1.2, 0]]} color="#22c7a9" lineWidth={1.5} transparent opacity={0.8} />
      <Html position={[1.25, -1.45, 0.3]} center distanceFactor={8}><div className="scene-match-card"><small>EXPLAINED MATCH</small><strong>88</strong><span>Atlas Workflow</span></div></Html>
    </group>
  );
}

export function CareerSignalScene() {
  const { ref, visible } = useVisible<HTMLDivElement>();
  const { reduced, lowPower } = useSceneCapability();
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  return (
    <div ref={ref} className="scene-shell" aria-label="Career Radar filters weak signals and highlights worthwhile opportunities">
      {!reduced && !lowPower && visible && !webglUnavailable ? (
        <Canvas
          camera={{ position: [0, 0.4, 7], fov: 42 }}
          dpr={lowPower ? 1 : [1, 1.5]}
          fallback={<RadarFallback />}
          gl={{ alpha: true, antialias: !lowPower, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.domElement.addEventListener("webglcontextlost", () => setWebglUnavailable(true), { once: true })}
        >
          <SignalField lowPower={lowPower} /><AdaptiveDpr pixelated />
        </Canvas>
      ) : <RadarFallback />}
    </div>
  );
}

function RadarFallback() {
  return <div className="radar-fallback" aria-hidden="true"><i /><i /><i /><span className="fallback-signal s1" /><span className="fallback-signal s2" /><span className="fallback-signal s3" /></div>;
}

const clusters = [
  { label: "Experience", color: "#3157e8", pos: [0, 1.9, 0] as [number, number, number] },
  { label: "Skills", color: "#22c7a9", pos: [0, 1.15, 0] as [number, number, number] },
  { label: "Projects", color: "#3157e8", pos: [0, 0.38, 0] as [number, number, number] },
  { label: "Tools", color: "#22c7a9", pos: [0, -0.38, 0] as [number, number, number] },
  { label: "Education", color: "#6c83c9", pos: [0, -1.15, 0] as [number, number, number] },
  { label: "Preferences", color: "#ff7a59", pos: [0, -1.9, 0] as [number, number, number] },
];

function EvidenceGraph({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) {
  const profile: [number, number, number] = [-2.7, 0, 0];
  const target: [number, number, number] = [2.7, 0, 0];
  return (
    <group>
      <ambientLight intensity={1.6} /><pointLight position={[0, 3, 5]} intensity={22} color="#7091ff" />
      {clusters.map((node) => <group key={node.label}>
        <Line points={[profile, node.pos]} color={selected === node.label ? "#6f8cff" : "#344a83"} lineWidth={selected === node.label ? 2 : 1} transparent opacity={selected === node.label ? 0.95 : 0.45} />
        <Line points={[node.pos, target]} color={selected === node.label ? "#22c7a9" : "#26395f"} lineWidth={selected === node.label ? 2 : 1} transparent opacity={selected === node.label ? 0.9 : 0.32} />
        <mesh position={node.pos} onClick={(event) => { event.stopPropagation(); onSelect(node.label); }}>
          <boxGeometry args={[1.35, 0.42, selected === node.label ? 0.2 : 0.12]} />
          <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={selected === node.label ? 2.6 : 1} />
        </mesh>
        <Html position={[node.pos[0], node.pos[1], node.pos[2] + 0.16]} center distanceFactor={9}>
          <button className={`scene-label ${selected === node.label ? "active" : ""}`} onClick={() => onSelect(node.label)}>{node.label}</button>
        </Html>
      </group>)}
      <mesh position={profile}><boxGeometry args={[1.5, 0.9, 0.18]} /><meshStandardMaterial color="#243d91" emissive="#3157e8" emissiveIntensity={1.4} /></mesh>
      <Html position={profile} center distanceFactor={8}><span className="scene-core-label">Verified<br />career profile</span></Html>
      <mesh position={target}><boxGeometry args={[1.5, 1.05, 0.2]} /><meshStandardMaterial color="#164d52" emissive="#22c7a9" emissiveIntensity={1.4} /></mesh>
      <Html position={target} center distanceFactor={8}><span className="scene-target-label">Sample role<br /><b>88 match</b></span></Html>
    </group>
  );
}

const clusterFacts: Record<string, string[]> = {
  Experience: ["3 years workflow operations", "Client discovery and delivery"],
  Skills: ["TypeScript", "API integration", "Process analysis"],
  Projects: ["Job ingestion prototype", "Support triage automation"],
  Tools: ["n8n", "Supabase", "OpenAI"],
  Education: ["Information systems coursework", "Continuous technical learning"],
  Preferences: ["Remote or hybrid", "Asia/Manila collaboration"],
};

export function CareerConstellationScene() {
  const { ref, visible } = useVisible<HTMLDivElement>();
  const { reduced, lowPower } = useSceneCapability();
  const [selected, setSelected] = useState("Skills");
  const [flat, setFlat] = useState(false);
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  const canRender = !reduced && !lowPower && !flat && visible && !webglUnavailable;
  return (
    <div ref={ref} className="constellation-experience">
      <div className="scene-toolbar"><span>Demonstration Data</span><button type="button" onClick={() => setFlat((value) => !value)}>{flat ? "Show depth view" : "Use flat diagram"}</button></div>
      <div className="constellation-canvas" aria-label="Career evidence map connecting a verified profile to a sample job">
        {canRender ? <Canvas camera={{ position: [0, 0, 7.5], fov: 42 }} dpr={[1, 1.4]} fallback={<FlatEvidenceMap selected={selected} onSelect={setSelected} />} gl={{ alpha: true, powerPreference: "high-performance" }} onCreated={({ gl }) => gl.domElement.addEventListener("webglcontextlost", () => setWebglUnavailable(true), { once: true })}><EvidenceGraph selected={selected} onSelect={setSelected} /><AdaptiveDpr /></Canvas> : (
          <FlatEvidenceMap selected={selected} onSelect={setSelected} />
        )}
      </div>
      <div className="cluster-detail" aria-live="polite"><span>Relevant cluster</span><h3>{selected}</h3><ul>{clusterFacts[selected].map((fact) => <li key={fact}>{fact}</li>)}</ul><p><i /> Illuminated because this evidence supports the sample Automation Engineer role.</p></div>
    </div>
  );
}

function FlatEvidenceMap({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) {
  return <div className="flat-constellation"><div className="flat-core">Verified<br />career profile</div><div className="flat-evidence-stack">{clusters.map((cluster) => <button type="button" key={cluster.label} className={`flat-node ${selected === cluster.label ? "active" : ""}`} onClick={() => onSelect(cluster.label)}>{cluster.label}</button>)}</div><div className="flat-target">Sample role<strong>88 match</strong></div></div>;
}
