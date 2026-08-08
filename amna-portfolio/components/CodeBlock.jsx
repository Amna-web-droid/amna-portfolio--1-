"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard not available — silently ignore
    }
  }

  return (
    <div className="relative group">
      <pre className="bg-ink text-paper text-xs md:text-[13px] font-mono rounded-sm p-4 pr-12 overflow-x-auto">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-sm bg-paper/10 text-paper hover:bg-paper/20 transition-colors"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );
}
