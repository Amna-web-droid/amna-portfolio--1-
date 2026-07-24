import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Clipping from "@/components/Clipping";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 py-24 flex items-center justify-center min-h-[60vh]">
        <Clipping rotate={-1} className="p-10 md:p-14 text-center max-w-md">
          <p className="font-mono text-xs uppercase tracking-widest text-red mb-4">
            Page not found
          </p>
          <h1 className="font-display font-black text-6xl mb-4">404</h1>
          <p className="text-muted mb-8">
            This page must have slipped out of the notebook. Let&apos;s get you
            back to a page that exists.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-ink text-paper rounded-sm text-sm font-medium hover:bg-red transition-colors"
          >
            Back to the homepage
          </Link>
        </Clipping>
      </main>
      <Footer />
    </>
  );
}
