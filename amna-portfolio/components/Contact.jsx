"use client";

import { Send } from "lucide-react";
import Clipping from "./Clipping";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqrdaqw";

export default function Contact() {
  return (
    <section id="contact" className="px-6 md:px-10 py-20 border-t-2 border-ink">
      <div className="max-w-xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 text-center">
          Section D
        </p>
        <h2 className="font-display font-bold text-4xl mb-1 text-center">Say hello.</h2>
        <p className="font-hand text-xl text-red mb-10 text-center">
          got a project, or just want to say hi?
        </p>

        <Clipping rotate={-0.5} className="p-8 md:p-10">
          <form action={FORMSPREE_ENDPOINT} method="POST" className="space-y-5">
            {/* Honeypot — hidden from real visitors, bots often fill it in */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full bg-transparent border-0 border-b-2 border-line focus:border-red outline-none py-2 text-ink placeholder:text-muted/50"
                placeholder="What should I call you?"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-transparent border-0 border-b-2 border-line focus:border-red outline-none py-2 text-ink placeholder:text-muted/50"
                placeholder="so I can write back"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                className="w-full bg-transparent border-0 border-b-2 border-line focus:border-red outline-none py-2 text-ink placeholder:text-muted/50 resize-none"
                placeholder="Tell me a little about it..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper rounded-sm text-sm font-medium hover:bg-red transition-colors"
            >
              <Send size={15} /> Send it over
            </button>
          </form>
        </Clipping>
      </div>
    </section>
  );
}
