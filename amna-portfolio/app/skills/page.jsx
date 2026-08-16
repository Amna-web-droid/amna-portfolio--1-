import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Clipping from "@/components/Clipping";
import SkillBar from "@/components/SkillBar";
import Reveal from "@/components/Reveal";
import { skillGroups } from "@/data/skills";

export const metadata = {
  title: "Skills — Amna Mushtaq",
  description: "A breakdown of Amna Mushtaq's MERN stack skills — frontend, backend, databases, and more.",
};

const rotations = [-1, 1, -0.5, 1.5];

export default function SkillsPage() {
  return (
    <>
      <Nav />
      <main className="px-6 md:px-10 py-16">
        <div className="max-w-content mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2">
            Section E
          </p>
          <h1 className="font-display font-bold text-5xl mb-2">The toolkit.</h1>
          <p className="font-hand text-xl text-red mb-14">
            what I actually build with, today
          </p>

          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {skillGroups.map((group, i) => (
              <Reveal key={group.category} delay={(i % 2) * 0.12}>
              <Clipping
                rotate={rotations[i % rotations.length]}
                className="p-7 md:p-8"
              >
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-4">
                  {group.category}
                </p>
                {group.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    accent={group.accent}
                  />
                ))}
              </Clipping>
              </Reveal>
            ))}
          </div>

          <p className="font-mono text-xs text-muted mt-12 text-center max-w-lg mx-auto">
            These numbers are honest, not decorative — I&apos;d rather show
            where I&apos;m still building depth than round everything up.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
