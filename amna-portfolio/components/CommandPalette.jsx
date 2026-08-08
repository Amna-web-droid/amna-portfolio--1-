"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  User,
  Briefcase,
  BarChart3,
  Palette,
  BookOpen,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";

const commands = [
  { label: "Home", href: "/", Icon: Home },
  { label: "About", href: "/#about", Icon: User },
  { label: "Work / Projects", href: "/#work", Icon: Briefcase },
  { label: "Skills", href: "/skills", Icon: BarChart3 },
  { label: "Designs", href: "/#designs", Icon: Palette },
  { label: "Journey", href: "/journey", Icon: BookOpen },
  { label: "Contact", href: "/#contact", Icon: Mail },
  { label: "GitHub", href: "https://github.com/Amna-web-droid", Icon: Github, external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amna-mushtaq-743380389/",
    Icon: Linkedin,
    external: true,
  },
  { label: "Email me", href: "mailto:amnamushtaq338@gmail.com", Icon: Mail, external: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function handleOpenEvent() {
      setOpen(true);
    }
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleOpenEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  function handleSelect(cmd) {
    setOpen(false);
    if (cmd.external) {
      window.open(cmd.href, "_blank", "noreferrer");
    } else {
      router.push(cmd.href);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="clipping clipping-notape w-full max-w-lg rounded-sm overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
          <Search size={16} className="text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to a section..."
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <kbd className="font-mono text-[10px] text-muted border border-line rounded px-1.5 py-0.5">
            esc
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length > 0 ? (
            filtered.map((cmd) => (
              <button
                key={cmd.label}
                onClick={() => handleSelect(cmd)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-paper transition-colors text-left"
              >
                <cmd.Icon size={16} className="text-muted" />
                {cmd.label}
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-muted">No matches.</p>
          )}
        </div>
      </div>
    </div>
  );
}
