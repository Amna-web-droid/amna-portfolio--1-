import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JourneyEntry from "@/components/JourneyEntry";
import ReadingProgress from "@/components/ReadingProgress";
import { journeyBooks as staticBooks } from "@/data/journeyBooks";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export const revalidate = 10;

const rotations = [-1, 1, -1.5, 1.5, -0.5];

async function getBook(id) {
  if (!isSupabaseConfigured()) {
    const book = staticBooks.find((b) => b.id === id);
    if (!book) return null;
    return { title: book.title, icon: book.icon, concepts: book.concepts || [] };
  }

  const { data: book, error: bookError } = await supabase
    .from("journey_books")
    .select("*")
    .eq("id", id)
    .single();

  if (bookError || !book) return null;

  const { data: concepts } = await supabase
    .from("journey_concepts")
    .select("*")
    .eq("book_id", id)
    .order("created_at", { ascending: true });

  return {
    title: book.title,
    icon: book.icon,
    concepts: (concepts || []).map((c) => ({
      title: c.title,
      note: c.description,
      code: c.code,
      language: c.language,
    })),
  };
}

export default async function BookPage({ params }) {
  const book = await getBook(params.id);
  if (!book) notFound();

  return (
    <>
      <ReadingProgress />
      <Nav />
      <main className="px-6 md:px-10 py-16">
        <div className="max-w-content mx-auto">
          <Link
            href="/journey"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-red transition-colors mb-8"
          >
            <ArrowLeft size={15} /> Back to the shelf
          </Link>

          <div className="flex items-center gap-4 mb-2">
            <span className="text-5xl">{book.icon || "📘"}</span>
            <h1 className="font-display font-bold text-5xl">{book.title}</h1>
          </div>
          <p className="font-hand text-xl text-red mb-14">
            concepts, in the order I learned them
          </p>

          {book.concepts.length > 0 ? (
            <div className="max-w-2xl mx-auto space-y-16">
              {book.concepts.map((c, i) => (
                <JourneyEntry
                  key={c.title + i}
                  entry={c}
                  rotate={rotations[i % rotations.length]}
                />
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-line rounded-sm py-16 text-center text-muted font-mono text-xs">
              no concepts yet — add some from /admin
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
