import Clipping from "./Clipping";
import GitHubStats from "./GitHubStats";
import { BookMarked, GraduationCap } from "lucide-react";

const wordBuilds = [
  {
    parts: ["front", "end"],
    note: "React, Next.js, Tailwind — the layer people actually touch",
  },
  {
    parts: ["back", "end"],
    note: "Node, Express, TypeScript — the logic behind the screen",
  },
  {
    parts: ["full", "stack"],
    note: "PostgreSQL and MongoDB both, depending on the problem",
  },
  {
    parts: ["re", "spons", "ive"],
    note: "root + suffix — layouts that adapt instead of break",
  },
];

const alsoUse = ["JavaScript & TypeScript", "API integration", "Git & GitHub"];
const learning = ["Product design", "Node.js & Express"];

export default function About() {
  return (
    <section id="about" className="px-6 md:px-10 py-24 border-t border-line">
      <div className="max-w-content mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-plum mb-5">
            About
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            How I got here.
          </h2>
          <p className="font-hand text-xl text-red mb-6">By Amna, herself</p>

          <div className="columns-1 sm:columns-2 gap-6 text-[15px] leading-relaxed text-ink [&>p]:mb-4">
            <p>
              I&apos;m a MERN stack developer &mdash; React, Next.js and
              Tailwind on the frontend, and I&apos;m building out Node,
              Express and TypeScript on the backend, with both PostgreSQL and
              MongoDB in my toolkit depending on what a project actually
              needs.
            </p>
            <p>
              I care about solving real problems, the messy kind that show up
              in actual products, not just tutorials. I&apos;m also teaching
              myself product design, because I want to be able to take an
              idea from a rough sketch all the way to something people can
              use. This site is where I keep it all as I build it.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-line">
            <div className="flex items-center gap-2 text-sm text-muted">
              <GraduationCap size={16} /> Student
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <BookMarked size={16} /> MERN stack developer
            </div>
          </div>

          <GitHubStats />
        </div>

        <Clipping rotate={2} tape={false} className="p-6 self-start">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
            Currently
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between border-b border-dashed border-line pb-3">
              <span>Building</span>
              <span className="text-muted text-right">full-stack projects, one at a time</span>
            </li>
            <li className="flex justify-between border-b border-dashed border-line pb-3">
              <span>Learning</span>
              <span className="text-muted text-right">product design &amp; backend depth</span>
            </li>
            <li className="flex justify-between">
              <span>Open to</span>
              <span className="text-muted text-right">freelance frontend and full-stack work</span>
            </li>
          </ul>

          <div className="mt-6 pt-6 border-t border-dashed border-line">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
              Also use
            </p>
            <ul className="space-y-1 text-sm mb-4">
              {alsoUse.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
              Learning now
            </p>
            <ul className="space-y-1 text-sm">
              {learning.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </Clipping>
      </div>

      <div className="max-w-content mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {wordBuilds.map(({ parts, note }) => (
          <div
            key={parts.join("")}
            className="rounded-xl border border-line bg-card p-5 hover:border-pine/50 transition-colors"
          >
            <div className="font-display text-2xl mb-3 flex flex-wrap items-baseline">
              {parts.map((p, i) => (
                <span key={p} className="flex items-baseline">
                  <span className={i % 2 === 0 ? "text-ink" : "text-red"}>
                    {p}
                  </span>
                  {i < parts.length - 1 && (
                    <span className="text-tape mx-0.5">&middot;</span>
                  )}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted leading-relaxed">{note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
