"use client";

import { motion } from "framer-motion";
import { Sparkles, PenTool, Coffee } from "lucide-react";

export default function Hero() {
  return (
    <section className="px-6 md:px-10 pt-10 md:pt-16 pb-20 relative overflow-hidden">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-red mb-4 flex items-center gap-2">
            <Sparkles size={14} /> MERN stack developer, based in Pakistan
          </p>

          <h1 className="font-display font-black text-6xl md:text-8xl leading-[0.95] mb-6 max-w-4xl">
            Amna Mushtaq&apos;s <span className="italic">notebook</span> of things she builds.
          </h1>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <p className="text-muted text-lg leading-relaxed max-w-md">
              I build fast, interactive interfaces with React, Next.js and
              Tailwind, and I&apos;m going full-stack &mdash; Node, Express,
              TypeScript, PostgreSQL and MongoDB. I care about solving real,
              messy problems, and I&apos;m learning product design so I can
              own an idea from sketch to shipped.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#work"
                className="px-6 py-3 bg-ink text-paper rounded-sm text-sm font-medium hover:bg-red transition-colors"
              >
                See my work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border-2 border-ink rounded-sm text-sm font-medium hover:border-red hover:text-red transition-colors"
              >
                Say hi
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 absolute -right-2 top-2 text-muted rotate-6">
            <PenTool size={20} />
          </div>
          <div className="hidden md:flex items-center gap-2 absolute right-24 top-24 text-muted -rotate-12">
            <Coffee size={22} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
