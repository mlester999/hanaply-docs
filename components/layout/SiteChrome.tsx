"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { CommandPalette } from "@/components/navigation/CommandPalette";

const nav = [
  ["Vision", "/#vision"],
  ["Career Radar", "/#career-radar"],
  ["Application Packs", "/#application-packs"],
  ["Roadmap", "/roadmap"],
  ["Architecture", "/architecture"],
  ["Pricing", "/#pricing"],
  ["Docs", "/docs"],
] as const;

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("vision");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === "Escape") setMenuOpen(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (pathname !== "/" || !("IntersectionObserver" in window)) return;
    const sections = ["vision", "career-radar", "application-packs", "pricing"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-18% 0px -64%", threshold: [0, 0.1, 0.35] });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className={`site-header ${scrolled || pathname !== "/" ? "is-scrolled" : ""}`}>
        <div className="nav-shell">
          <Link className="brand" href="/" aria-label="Hanaply vision home">
            <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
            <span>hanaply</span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {nav.map(([label, href]) => {
              const section = href.startsWith("/#") ? href.slice(2) : "";
              const active = section ? pathname === "/" && activeSection === section : pathname.startsWith(href);
              return <Link key={href} href={href} className={active ? "active" : ""} onClick={() => section && setActiveSection(section)}>{label}</Link>;
            })}
          </nav>
          <div className="nav-actions">
            <button className="command-trigger" type="button" onClick={() => setPaletteOpen(true)} aria-label="Open command palette">
              <Search size={16} /><span>Explore</span><kbd>⌘K</kbd>
            </button>
            <button className="menu-trigger" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen((value) => !value)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}<span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation">
            {nav.map(([label, href]) => <Link key={href} href={href} onClick={() => { setMenuOpen(false); if (href.startsWith("/#")) setActiveSection(href.slice(2)); }}>{label}<span aria-hidden="true">↗</span></Link>)}
          </nav>
        )}
      </header>
      <main id="main-content">{children}</main>
      <Footer />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand" href="/"><span className="brand-mark" aria-hidden="true"><i /><i /><i /></span><span>hanaply</span></Link>
        <p>Hanap smarter. Apply stronger.</p>
      </div>
      <div className="footer-note">
        <strong>Product Vision Experience</strong>
        <p>Hanaply is being designed. Demonstrations on this site are not live product capabilities.</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/roadmap">Roadmap</Link>
        <Link href="/architecture">Architecture</Link>
        <Link href="/docs">Documentation</Link>
      </nav>
    </footer>
  );
}
