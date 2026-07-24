"use client";

import { motion } from "framer-motion";

const accentMap = {
  red: "bg-red",
  green: "bg-green",
  gold: "bg-gold",
  plum: "bg-plum",
};

export default function SkillBar({ name, level, accent = "red" }) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium">{name}</span>
        <span className="font-mono text-[10px] text-muted">{level}%</span>
      </div>
      <div className="h-2.5 w-full bg-paper border border-line rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${accentMap[accent] || accentMap.red}`}
        />
      </div>
    </div>
  );
}
