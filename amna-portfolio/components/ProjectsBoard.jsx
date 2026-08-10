"use client";

import { useMemo, useState } from "react";
import { Tag } from "lucide-react";
import ProjectSection from "./ProjectSection";

export default function ProjectsBoard({ frontend, backend, fullstack }) {
  const [activeTag, setActiveTag] = useState(null);

  const allTags = useMemo(() => {
    const set = new Set();
    [...frontend, ...backend, ...fullstack].forEach((p) => {
      (p.tags || []).forEach((t) => set.add(t));
    });
    return Array.from(set).sort();
  }, [frontend, backend, fullstack]);

  function filterByTag(list) {
    if (!activeTag) return list;
    return list.filter((p) => (p.tags || []).includes(activeTag));
  }

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted mr-1">
            <Tag size={12} /> Filter
          </span>
          <button
            onClick={() => setActiveTag(null)}
            className={
              "px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide border transition-colors " +
              (!activeTag
                ? "bg-ink text-paper border-ink"
                : "border-line text-muted hover:border-ink hover:text-ink")
            }
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={
                "px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide border transition-colors " +
                (activeTag === tag
                  ? "bg-ink text-paper border-ink"
                  : "border-line text-muted hover:border-ink hover:text-ink")
              }
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <ProjectSection
        id="frontend"
        sectionLabel="B.1 — Frontend"
        title="Frontend projects"
        blurb="Interfaces I designed and built end to end."
        projects={filterByTag(frontend)}
        accent="text-red"
      />
      <ProjectSection
        id="backend"
        sectionLabel="B.2 — Backend"
        title="Backend projects"
        blurb="APIs, servers, and the logic behind the screen."
        projects={filterByTag(backend)}
        accent="text-green"
      />
      <ProjectSection
        id="fullstack"
        sectionLabel="B.3 — Full-stack"
        title="Full-stack projects"
        blurb="End-to-end builds — frontend and backend together."
        projects={filterByTag(fullstack)}
        accent="text-gold"
      />
    </>
  );
}
