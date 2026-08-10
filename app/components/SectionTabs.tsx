"use client";
import { useEffect, useState } from "react";
import type { SubItem } from "../nav-config";

const HEADER_OFFSET = 64;

export default function SectionTabs({ sections }: { sections: SubItem[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sections.some((s) => s.id === hash)) setActive(hash);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: `-${HEADER_OFFSET + 60}px 0px -65% 0px`, threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - (HEADER_OFFSET + 52);
      window.scrollTo({ top: y, behavior: "smooth" });
      history.replaceState(null, "", `#${id}`);
    }
    setActive(id);
  };

  return (
    <div
      style={{
        position: "sticky", top: HEADER_OFFSET, zIndex: 400,
        background: "rgba(255,255,255,0.97)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--blue-line)",
        boxShadow: "0 2px 12px rgba(6,23,44,0.05)",
      }}
    >
      <div
        className="mob-pad scroll-hide"
        style={{
          maxWidth: 1200, margin: "0 auto", padding: "0 24px",
          display: "flex", gap: 4, overflowX: "auto",
        }}
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={handleClick(s.id)}
            style={{
              padding: "16px 18px", fontSize: 14.5, fontWeight: 700, whiteSpace: "nowrap",
              color: active === s.id ? "var(--navy-950)" : "var(--text-mute)",
              borderBottom: active === s.id ? "2px solid var(--orange)" : "2px solid transparent",
              textDecoration: "none", fontFamily: "var(--font-sans)", transition: "color 0.2s",
            }}
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
