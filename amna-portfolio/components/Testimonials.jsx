import { Quote } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import Clipping from "./Clipping";

const rotations = [-1, 1.5, -1.5];

async function getTestimonials() {
  if (!isSupabaseConfigured()) return [];

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

export default async function Testimonials() {
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section className="px-6 md:px-10 py-16 border-t-2 border-ink">
      <div className="max-w-content mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-plum mb-2">
          Section E
        </p>
        <h2 className="font-display font-bold text-4xl mb-1">Kind words.</h2>
        <p className="font-hand text-xl text-red mb-10">from people I&apos;ve worked with</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Clipping key={t.id} rotate={rotations[i % rotations.length]} className="p-6">
              <Quote size={22} className="text-red mb-3" />
              <p className="text-sm text-ink/90 leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-display font-bold text-sm">{t.name}</p>
              {t.role && <p className="text-xs text-muted">{t.role}</p>}
            </Clipping>
          ))}
        </div>
      </div>
    </section>
  );
}
