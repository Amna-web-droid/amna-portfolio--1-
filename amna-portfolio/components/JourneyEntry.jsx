import Clipping from "./Clipping";
import CodeBlock from "./CodeBlock";
import { Clock } from "lucide-react";

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function readingTime(text) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return minutes;
}

export default function JourneyEntry({ entry, rotate = 0 }) {
  const { date, title, note, code, language } = entry;
  const minutes = readingTime(note + " " + (code || ""));

  return (
    <Clipping rotate={rotate} className="p-7 md:p-9">
      <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {date ? formatDate(date) : ""}
        </p>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted">
            <Clock size={11} /> {minutes} min read
          </span>
          {language && (
            <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 bg-paper border border-line text-muted">
              {language}
            </span>
          )}
        </div>
      </div>

      <h3 className="font-display font-bold text-2xl mb-2">{title}</h3>
      <p className="text-[15px] text-ink/90 leading-relaxed mb-4">{note}</p>

      {code && <CodeBlock code={code} />}
    </Clipping>
  );
}
