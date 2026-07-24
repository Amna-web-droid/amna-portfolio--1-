import { frontendProjects, backendProjects, fullstackProjects } from "@/data/projects";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import ProjectSection from "./ProjectSection";

async function getProjects(category, fallback) {
  if (!isSupabaseConfigured()) return fallback;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error || !data) return fallback;

  return data.map((row) => ({
    title: row.title,
    description: row.description,
    tags: row.tags
      ? row.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    screenshot: row.screenshot_url,
    github: row.github,
    live: row.live,
  }));
}

export default async function Projects() {
  const [frontend, backend, fullstack] = await Promise.all([
    getProjects("frontend", frontendProjects),
    getProjects("backend", backendProjects),
    getProjects("fullstack", fullstackProjects),
  ]);

  return (
    <section id="work" className="px-6 md:px-10 py-10 border-t-2 border-ink">
      <div className="max-w-content mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
          Section B
        </p>
        <h2 className="font-display font-bold text-4xl mb-1">The pinboard.</h2>
        <p className="font-hand text-xl text-red mb-4">everything I&apos;ve built so far</p>
        {!isSupabaseConfigured() && (
          <p className="font-mono text-xs text-muted mb-8 border border-dashed border-line px-3 py-2 inline-block">
            showing sample data — connect Supabase to add your own from /admin
          </p>
        )}

        <ProjectSection
          id="frontend"
          sectionLabel="B.1 — Frontend"
          title="Frontend projects"
          blurb="Interfaces I designed and built end to end."
          projects={frontend}
          accent="text-red"
        />
        <ProjectSection
          id="backend"
          sectionLabel="B.2 — Backend"
          title="Backend projects"
          blurb="APIs, servers, and the logic behind the screen."
          projects={backend}
          accent="text-green"
        />
        <ProjectSection
          id="fullstack"
          sectionLabel="B.3 — Full-stack"
          title="Full-stack projects"
          blurb="End-to-end builds — frontend and backend together."
          projects={fullstack}
          accent="text-gold"
        />
      </div>
    </section>
  );
}
