"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import Clipping from "./Clipping";

export default function ProjectCard({ project, rotate = 0 }) {
  const { id, title, description, tags, screenshot, github, live } = project;
  const detailHref = id ? `/work/${id}` : null;

  return (
    <Clipping rotate={rotate} className="p-3 pb-5">
      <div className="relative aspect-[16/10] bg-paper overflow-hidden torn-bottom">
        {screenshot ? (
          <Image
            src={screenshot}
            alt={"Screenshot of " + title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-top grayscale-[15%] contrast-[1.05] transition-transform duration-300 hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-muted border border-dashed border-line">
            add a screenshot →
          </div>
        )}
      </div>

      <div className="px-2 pt-4">
        {detailHref ? (
          <Link href={detailHref} className="group inline-flex items-center gap-1.5">
            <h3 className="font-display font-bold text-lg group-hover:text-red transition-colors">
              {title}
            </h3>
            <ArrowUpRight
              size={15}
              className="text-muted group-hover:text-red transition-colors"
            />
          </Link>
        ) : (
          <h3 className="font-display font-bold text-lg">{title}</h3>
        )}
        <p className="text-sm text-muted leading-relaxed mb-3 mt-1.5">{description}</p>

        {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-wide px-2 py-1 bg-paper border border-line text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 pt-2 border-t border-dashed border-line">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm mt-3 hover:text-red transition-colors"
            >
              <Github size={15} /> Code
            </a>
          )}
          {live && (
            <a
              href={live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm mt-3 hover:text-red transition-colors"
            >
              <ExternalLink size={15} /> Live
            </a>
          )}
        </div>
      </div>
    </Clipping>
  );
}
