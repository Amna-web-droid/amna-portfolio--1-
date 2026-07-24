import Link from "next/link";
import Clipping from "./Clipping";

export default function BookCard({ book, rotate = 0 }) {
  return (
    <Link href={`/journey/${book.id}`}>
      <Clipping
        rotate={rotate}
        className="p-6 text-center hover:border-red/50 transition-colors cursor-pointer h-full flex flex-col items-center justify-center gap-3 min-h-[180px]"
      >
        <span className="text-5xl">{book.icon || "📘"}</span>
        <h3 className="font-display font-bold text-lg">{book.title}</h3>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {book.conceptCount} {book.conceptCount === 1 ? "concept" : "concepts"}
        </p>
      </Clipping>
    </Link>
  );
}
