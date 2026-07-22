"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Html, Line, OrbitControls } from "@react-three/drei";
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

const signalPositions: [number, number, number][] = [
  [-2.8, 0.25, -0.8], [-2.1, 1.3, -0.2], [-1.45, -1.1, 0.2], [2.55, 1.15, -0.4],
  [2.7, -0.65, 0.1], [1.55, 0.35, 0.5], [0.7, -1.55, -0.4], [-0.55, 1.65, -0.6],
];

function SignalField({ lowPower }: { lowPower: boolean }) {
  const scan = useRef<THREE.Group>(null);
  const nodes = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (scan.current) scan.current.rotation.z -= delta * 0.42;
    if (nodes.current) nodes.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.06;
  });
  return (
    <group rotation={[-Math.PI / 2.35, 0, 0.1]}>
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 1, 4]} color="#7091ff" intensity={18} distance={12} />
      {[1.05, 2.1, 3.15].map((radius) => <mesh key={radius}><torusGeometry args={[radius, 0.012, 8, lowPower ? 64 : 120]} /><meshBasicMaterial color="#5276f3" transparent opacity={0.38} /></mesh>)}
      <group ref={scan}>
        <mesh position={[1.65, 0, 0.01]} rotation={[0, 0, -0.55]}><planeGeometry args={[3.2, 0.035]} /><meshBasicMaterial color="#5d7df1" transparent opacity={0.7} /></mesh>
        <mesh position={[0, 0, 0.015]}><circleGeometry args={[3.2, 48, 0, 0.58]} /><meshBasicMaterial color="#3157e8" transparent opacity={0.08} side={THREE.DoubleSide} /></mesh>
      </group>
      <group ref={nodes}>
        {signalPositions.map((position, index) => {
          const strong = index === 5 || index === 7;
          return <group key={index} position={position}>
            <mesh><sphereGeometry args={[strong ? 0.105 : 0.065, 16, 16]} /><meshStandardMaterial color={strong ? "#22c7a9" : "#5e78bd"} emissive={strong ? "#22c7a9" : "#3157e8"} emissiveIntensity={strong ? 3 : 0.6} /></mesh>
            {strong && <mesh><ringGeometry args={[0.16, 0.19, 28]} /><meshBasicMaterial color="#22c7a9" transparent opacity={0.55} side={THREE.DoubleSide} /></mesh>}
          </group>;
        })}
      </group>
      <mesh position={[0, 0, 0.08]}><sphereGeometry args={[0.16, 24, 24]} /><meshStandardMaterial color="#f6f8fc" emissive="#3157e8" emissiveIntensity={2.4} /></mesh>
    </group>
  );
}

export function CareerSignalScene() {
  const { ref, visible } = useVisible<HTMLDivElement>();
  const { reduced, lowPower } = useSceneCapability();
  const [webglUnavailable, setWebglUnavailable] = useState(false);
  return (
    <div ref={ref} className="scene-shell" aria-label="Career Radar filters weak signals and highlights worthwhile opportunities">
      {!reduced && visible && !webglUnavailable ? (
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
  { label: "Experience", color: "#3157e8", pos: [-2.7, 1.2, 0.2] as [number, number, number] },
  { label: "Skills", color: "#22c7a9", pos: [2.55, 1.35, 0.4] as [number, number, number] },
  { label: "Projects", color: "#3157e8", pos: [-2.5, -1.4, 0.5] as [number, number, number] },
  { label: "Tools", color: "#22c7a9", pos: [2.65, -1.15, 0.25] as [number, number, number] },
  { label: "Education", color: "#6c83c9", pos: [0.2, 2.15, -0.5] as [number, number, number] },
  { label: "Preferences", color: "#ff7a59", pos: [0.1, -2.2, -0.3] as [number, number, number] },
];

function Constellation({ selected, onSelect }: { selected: string; onSelect: (value: string) => void }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (group.current) group.current.rotation.y += delta * 0.05; });
  const center: [number, number, number] = [0, 0, 0];
  return (
    <group ref={group}>
      <ambientLight intensity={1.6} /><pointLight position={[0, 3, 5]} intensity={22} color="#7091ff" />
      {clusters.map((node) => <group key={node.label}>
        <Line points={[center, node.pos]} color={selected === node.label ? "#22c7a9" : "#3157e8"} lineWidth={selected === node.label ? 2 : 1} transparent opacity={selected === node.label ? 0.9 : 0.3} />
        <mesh position={node.pos} onClick={(event) => { event.stopPropagation(); onSelect(node.label); }}>
          <sphereGeometry args={[selected === node.label ? 0.25 : 0.18, 24, 24]} />
          <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={selected === node.label ? 2.6 : 1} />
        </mesh>
        <Html position={[node.pos[0], node.pos[1] - 0.38, node.pos[2]]} center distanceFactor={9}>
          <button className={`scene-label ${selected === node.label ? "active" : ""}`} onClick={() => onSelect(node.label)}>{node.label}</button>
        </Html>
      </group>)}
      <mesh><sphereGeometry args={[0.43, 32, 32]} /><meshStandardMaterial color="#f6f8fc" emissive="#3157e8" emissiveIntensity={2.4} /></mesh>
      <Html position={[0, -0.72, 0]} center distanceFactor={8}><span className="scene-core-label">Career Identity</span></Html>
      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.65} rotateSpeed={0.4} />
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
      <div className="scene-toolbar"><span>Demonstration Data</span><button type="button" onClick={() => setFlat((value) => !value)}>{flat ? "Show spatial view" : "Use flat diagram"}</button></div>
      <div className="constellation-canvas" aria-label="Career profile constellation with selectable evidence clusters">
        {canRender ? <Canvas camera={{ position: [0, 0, 7.5], fov: 42 }} dpr={[1, 1.4]} fallback={<div className="flat-constellation"><div className="flat-core">Career<br />Identity</div></div>} gl={{ alpha: true, powerPreference: "high-performance" }} onCreated={({ gl }) => gl.domElement.addEventListener("webglcontextlost", () => setWebglUnavailable(true), { once: true })}><Constellation selected={selected} onSelect={setSelected} /><AdaptiveDpr /></Canvas> : (
          <div className="flat-constellation">
            <div className="flat-core">Career<br />Identity</div>
            {clusters.map((cluster, index) => <button type="button" key={cluster.label} className={`flat-node n${index + 1} ${selected === cluster.label ? "active" : ""}`} onClick={() => setSelected(cluster.label)}>{cluster.label}</button>)}
          </div>
        )}
      </div>
      <div className="cluster-detail" aria-live="polite"><span>Relevant cluster</span><h3>{selected}</h3><ul>{clusterFacts[selected].map((fact) => <li key={fact}>{fact}</li>)}</ul><p><i /> Illuminated because this evidence supports the sample Automation Engineer role.</p></div>
    </div>
  );
}
