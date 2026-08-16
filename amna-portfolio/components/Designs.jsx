import Image from "next/image";
import { Figma } from "lucide-react";
import { designs as staticDesigns } from "@/data/designs";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import Clipping from "./Clipping";
import Reveal from "./Reveal";

const rotations = [-1.5, 1, -1, 1.5];

async function getDesigns() {
  if (!isSupabaseConfigured()) return staticDesigns;

  const { data, error } = await supabase
    .from("designs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return staticDesigns;

  return data.map((row) => ({
    title: row.title,
    description: row.description,
    image: row.image_url,
    figma: row.figma,
  }));
}

export default async function Designs() {
  const designs = await getDesigns();

  return (
    <section id="designs" className="px-6 md:px-10 py-16 border-t-2 border-ink">
      <div className="max-w-content mx-auto">
        <Reveal>
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
          Section C
        </p>
        <h2 className="font-display font-bold text-4xl mb-1">Design sketches.</h2>
        <p className="font-hand text-xl text-red mb-10">Figma explorations, before the code</p>
        </Reveal>

        {designs.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {designs.map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 0.1}>
              <Clipping rotate={rotations[i % rotations.length]} className="p-3 pb-5">
                <div className="relative aspect-[4/3] bg-paper overflow-hidden torn-bottom">
                  {d.image ? (
                    <Image
                      src={d.image}
                      alt={d.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-mono text-xs text-muted border border-dashed border-line">
                      add an image →
                    </div>
                  )}
                </div>
                <div className="px-2 pt-4">
                  <h3 className="font-display font-bold text-lg mb-1.5">{d.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-3">{d.description}</p>
                  {d.figma && (
                    <a
                      href={d.figma}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm pt-2 mt-1 border-t border-dashed border-line hover:text-red transition-colors"
                    >
                      <Figma size={15} /> View in Figma
                    </a>
                  )}
                </div>
              </Clipping>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="border-2 border-dashed border-line rounded-sm py-12 text-center text-muted font-mono text-xs">
            nothing pinned here yet — add one from /admin
          </div>
        )}
      </div>
    </section>
  );
}
