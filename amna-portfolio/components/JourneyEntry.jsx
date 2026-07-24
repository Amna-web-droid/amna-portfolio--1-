import Clipping from "./Clipping";

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function JourneyEntry({ entry, rotate = 0 }) {
  const { date, title, note, code, language } = entry;

  return (
    <Clipping rotate={rotate} className="p-7 md:p-9">
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {date ? formatDate(date) : ""}
        </p>
        {language && (
          <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 bg-paper border border-line text-muted">
            {language}
          </span>
        )}
      </div>

      <h3 className="font-display font-bold text-2xl mb-2">{title}</h3>
      <p className="text-[15px] text-ink/90 leading-relaxed mb-4">{note}</p>

      {code && (
        <pre className="bg-ink text-paper text-xs md:text-[13px] font-mono rounded-sm p-4 overflow-x-auto">
          <code>{code}</code>
        </pre>
      )}
    </Clipping>
  );
}
