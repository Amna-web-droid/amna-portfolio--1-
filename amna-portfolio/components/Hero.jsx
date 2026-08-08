"use client";

import { motion } from "framer-motion";
import { Sparkles, PenTool } from "lucide-react";

export default function Hero({ children }) {
  return (
    <section id="top" className="px-6 md:px-10 pt-10 md:pt-16 pb-20 relative overflow-hidden">
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

          {children}

          {/* Floating sticky-note tag — the "empty space" filler */}
          <motion.div
            initial={{ opacity: 0, y: -10, rotate: -8 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ rotate: 0, scale: 1.03 }}
            className="hidden lg:block absolute -right-4 top-6 bg-tape/25 border border-tape/60 px-4 py-2.5 rounded-sm shadow-sm"
          >
            <p className="font-mono text-xs text-ink whitespace-nowrap">
              const isBuilding = true;
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden lg:flex items-center justify-center absolute right-10 top-40 w-11 h-11 rounded-full bg-ink text-paper shadow-md -rotate-12"
          >
            <PenTool size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
