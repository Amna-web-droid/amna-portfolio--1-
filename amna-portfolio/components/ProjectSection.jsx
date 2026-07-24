import ProjectCard from "./ProjectCard";

const rotations = [-1.5, 1, -1, 1.5, -2, 2];

export default function ProjectSection({ id, sectionLabel, title, blurb, projects, accent = "text-red" }) {
  return (
    <div id={id} className="py-14 first:pt-0">
      <p className={`font-mono text-[10px] uppercase tracking-widest mb-3 ${accent}`}>
        {sectionLabel}
      </p>
      <h3 className="font-display font-bold text-3xl mb-2">{title}</h3>
      {blurb && <p className="text-muted max-w-lg mb-10">{blurb}</p>}

      {projects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} rotate={rotations[i % rotations.length]} />
          ))}
        </div>
      ) : (
        <div className="border-2 border-dashed border-line rounded-sm py-12 text-center text-muted font-mono text-xs">
          nothing pinned here yet — add one in data/projects.js
        </div>
      )}
    </div>
  );
}
