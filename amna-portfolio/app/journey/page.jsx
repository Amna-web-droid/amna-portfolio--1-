import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookCard from "@/components/BookCard";
import { journeyBooks as staticBooks } from "@/data/journeyBooks";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Journey — Amna Mushtaq",
  description: "A shelf of notebooks — one per language or topic Amna is learning.",
};

const rotations = [-1.5, 1, -1, 1.5, -0.5, 2];

async function getBooks() {
  if (!isSupabaseConfigured()) {
    return staticBooks.map((b) => ({ ...b, conceptCount: b.concepts?.length || 0 }));
  }

  const [{ data: books, error: booksError }, { data: concepts }] = await Promise.all([
    supabase.from("journey_books").select("*").order("created_at", { ascending: false }),
    supabase.from("journey_concepts").select("id, book_id"),
  ]);

  if (booksError || !books) return [];

  const counts = {};
  (concepts || []).forEach((c) => {
    counts[c.book_id] = (counts[c.book_id] || 0) + 1;
  });

  return books.map((b) => ({
    id: b.id,
    title: b.title,
    icon: b.icon,
    conceptCount: counts[b.id] || 0,
  }));
}

export default async function JourneyPage() {
  const books = await getBooks();

  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 py-16">
        <div className="max-w-content mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
            Vol. 01 &middot; Ongoing
          </p>
          <h1 className="font-display font-bold text-5xl mb-2">The shelf.</h1>
          <p className="font-hand text-xl text-red mb-14">
            one notebook per thing I&apos;m learning
          </p>

          {books.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {books.map((b, i) => (
                <BookCard key={b.id} book={b} rotate={rotations[i % rotations.length]} />
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-line rounded-sm py-16 text-center text-muted font-mono text-xs">
              no notebooks yet — add one from /admin
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
