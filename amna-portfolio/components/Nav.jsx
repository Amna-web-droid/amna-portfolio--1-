"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/skills", label: "Skills" },
  { href: "/#designs", label: "Designs" },
  { href: "/journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm">
      <div className="max-w-content mx-auto px-6 md:px-10 pt-6 pb-3">
        <div className="flex items-end justify-between">
          <Link href="/" className="font-display italic text-2xl">
            Amna
          </Link>
          <p className="hidden sm:block font-hand text-xl text-muted -mb-1">
            a running notebook
          </p>
        </div>

        <div className="border-t-2 border-ink mt-3 pt-2 flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-widest uppercase text-muted truncate">
            Vol. 01 &mdash; MERN Stack Dev
          </p>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border border-green text-green whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              Available for freelance
            </span>
            <nav>
              <ul className="flex items-center gap-5 lg:gap-6">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm hover:text-red transition-colors whitespace-nowrap"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ThemeToggle />
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen(!open)}
              className="p-1.5"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden mt-4 pb-2 border-t border-line pt-4">
            <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border border-green text-green mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              Available for freelance
            </span>
            <ul className="flex flex-col gap-3">
              {links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-base hover:text-red transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
