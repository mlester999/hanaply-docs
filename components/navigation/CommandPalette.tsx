"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, BookOpen, Boxes, CircleDollarSign, FileStack, Radar, Route, Search, ShieldCheck, Smartphone } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const actions = [
  { label: "Open Career Radar", hint: "Interactive demo", href: "/#career-radar", icon: Radar },
  { label: "Open Application Packs", hint: "Product visualization", href: "/#application-packs", icon: FileStack },
  { label: "Open Roadmap", hint: "Phases and gates", href: "/roadmap", icon: Route },
  { label: "Open Architecture", hint: "System explorer", href: "/architecture", icon: Boxes },
  { label: "Open Pricing", hint: "Plus and Pro vision", href: "/#pricing", icon: CircleDollarSign },
  { label: "Open Mobile Future", hint: "Shared platform direction", href: "/#mobile", icon: Smartphone },
  { label: "Open Build Status", hint: "Real implementation status", href: "/build-status", icon: ShieldCheck },
  { label: "Search documentation", hint: "Product reference", href: "/docs", icon: BookOpen },
];

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => actions.filter((item) => `${item.label} ${item.hint}`.toLowerCase().includes(query.toLowerCase())), [query]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => inputRef.current?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.classList.add("dialog-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("dialog-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  const go = (href: string) => { onClose(); router.push(href); };
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="command-dialog" role="dialog" aria-modal="true" aria-label="Explore Hanaply">
        <div className="command-input"><Search size={20} /><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Where would you like to go?" aria-label="Search destinations" /></div>
        <div className="command-results">
          <p className="command-label">Explore the product vision</p>
          {results.map((item, index) => <button type="button" key={item.href} onClick={() => go(item.href)} autoFocus={index === 0 && !query}>
            <span className="command-icon"><item.icon size={18} /></span><span><strong>{item.label}</strong><small>{item.hint}</small></span><ArrowUpRight size={17} />
          </button>)}
          {!results.length && <p className="empty-state">No matching destination. Try “roadmap” or “truth”.</p>}
        </div>
        <div className="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>esc</kbd> Close</span></div>
      </section>
    </div>
  );
}
