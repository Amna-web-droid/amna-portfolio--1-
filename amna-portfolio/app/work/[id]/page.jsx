import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Clipping from "@/components/Clipping";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

export const revalidate = 10;

async function getProject(id) {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    title: data.title,
    description: data.description,
    category: data.category,
    tags: data.tags
      ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    screenshot: data.screenshot_url,
    github: data.github,
    live: data.live,
  };
}

export async function generateMetadata({ params }) {
  const project = await getProject(params.id);
  if (!project) return { title: "Project — Amna Mushtaq" };
  return {
    title: `${project.title} — Amna Mushtaq`,
    description: project.description,
  };
}

const categoryLabels = {
  frontend: "Frontend project",
  backend: "Backend project",
  fullstack: "Full-stack project",
};

export default async function ProjectDetailPage({ params }) {
  const project = await getProject(params.id);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 py-16">
        <div className="max-w-content mx-auto max-w-3xl">
          <nav className="flex items-center gap-1.5 text-xs text-muted mb-4 font-mono">
            <Link href="/" className="hover:text-red transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#work" className="hover:text-red transition-colors">
              Work
            </Link>
            <span>/</span>
            <span className="text-ink">{project.title}</span>
          </nav>

          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-red transition-colors mb-8"
          >
            <ArrowLeft size={15} /> Back to the pinboard
          </Link>

          <p className="font-mono text-xs uppercase tracking-widest text-red mb-3">
            {categoryLabels[project.category] || "Project"}
          </p>
          <h1 className="font-display font-black text-4xl md:text-5xl mb-6">
            {project.title}
          </h1>

          {project.screenshot && (
            <Clipping rotate={-1} className="p-3 mb-8">
              <div className="relative aspect-[16/10] bg-paper overflow-hidden">
                <Image
                  src={project.screenshot}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover object-top"
                />
              </div>
            </Clipping>
          )}

          <p className="text-lg text-ink/90 leading-relaxed mb-6">
            {project.description}
          </p>

          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs uppercase tracking-wide px-2.5 py-1 bg-paper border border-line text-muted rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-5 pt-6 border-t border-line">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-ink rounded-sm text-sm font-medium hover:border-red hover:text-red transition-colors"
              >
                <Github size={16} /> View code
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-paper rounded-sm text-sm font-medium hover:bg-red transition-colors"
              >
                <ExternalLink size={16} /> View live
              </a>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
