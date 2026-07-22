"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, Copy, Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { DocPage } from "@/content/docs";
import { docs } from "@/content/docs";

export function DocsIndex() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => docs.filter((doc) => `${doc.title} ${doc.summary} ${doc.sections.map((section) => section.heading).join(" ")}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <div className="docs-index"><div className="docs-search"><Search size={20} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product documentation" aria-label="Search documentation" /><kbd>⌘K</kbd></div><div className="docs-card-grid">{results.map((doc, index) => <Link key={doc.slug} href={`/docs/${doc.slug}`}><span>{String(index + 1).padStart(2, "0")}</span>{doc.phase && <small>{doc.phase}</small>}<BookOpen size={21} /><h2>{doc.title}</h2><p>{doc.summary}</p><strong>Read document <ArrowRight size={15} /></strong></Link>)}</div>{!results.length && <div className="docs-empty"><Search size={24} /><h2>No document matched.</h2><p>Try “security”, “roadmap”, or “career”.</p></div>}</div>;
}

export function DocsShell({ doc }: { doc: DocPage }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState("");
  const currentIndex = docs.findIndex((item) => item.slug === doc.slug);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0);
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const copyLink = async (heading: string) => {
    const id = toId(heading); await navigator.clipboard?.writeText(`${window.location.origin}${pathname}#${id}`); setCopied(id); window.setTimeout(() => setCopied(""), 1400);
  };
  return <div className={`docs-shell ${dark ? "docs-dark" : ""}`}>
    <div className="reading-progress" style={{ width: `${progress}%` }} />
    <button className="docs-menu-button" type="button" onClick={() => setMenuOpen(true)}><Menu size={18} />Browse docs</button>
    <aside className={menuOpen ? "open" : ""}><div className="docs-side-head"><Link href="/docs"><BookOpen size={18} />Hanaply docs</Link><button type="button" onClick={() => setMenuOpen(false)}><X size={19} /><span className="sr-only">Close documentation menu</span></button></div><nav>{docs.map((item) => <Link key={item.slug} href={`/docs/${item.slug}`} className={item.slug === doc.slug ? "active" : ""} onClick={() => setMenuOpen(false)}>{item.title}<ChevronRight size={14} /></Link>)}</nav><Link className="back-vision" href="/"><ArrowLeft size={15} />Back to vision</Link></aside>
    <article className="docs-article"><header><span>{doc.eyebrow}</span>{doc.phase && <strong>{doc.phase}</strong>}<h1>{doc.title}</h1><p>{doc.summary}</p></header>{doc.sections.map((section) => <section key={section.heading} id={toId(section.heading)}><div className="section-anchor"><h2>{section.heading}</h2><button type="button" onClick={() => copyLink(section.heading)} aria-label={`Copy link to ${section.heading}`}>{copied === toId(section.heading) ? <Check size={16} /> : <Copy size={16} />}</button></div><p>{section.body}</p>{section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}</section>)}<nav className="doc-pager">{currentIndex > 0 ? <Link href={`/docs/${docs[currentIndex - 1].slug}`}><ArrowLeft size={15} /><span><small>Previous</small>{docs[currentIndex - 1].title}</span></Link> : <span />}{currentIndex < docs.length - 1 && <Link href={`/docs/${docs[currentIndex + 1].slug}`}><span><small>Next</small>{docs[currentIndex + 1].title}</span><ArrowRight size={15} /></Link>}</nav></article>
    <aside className="docs-toc"><div className="docs-theme"><span>Reading mode</span><button type="button" onClick={() => setDark((value) => !value)}>{dark ? <Sun size={15} /> : <Moon size={15} />}{dark ? "Light" : "Dark"}</button></div><span>On this page</span>{doc.sections.map((section) => <a key={section.heading} href={`#${toId(section.heading)}`}>{section.heading}</a>)}<div className="docs-status-note"><i />Product vision documentation</div></aside>
    {menuOpen && <button className="docs-overlay" type="button" aria-label="Close documentation menu" onClick={() => setMenuOpen(false)} />}
  </div>;
}

const toId = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
