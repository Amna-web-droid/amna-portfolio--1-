"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send } from "lucide-react";

const GREETING = {
  role: "assistant",
  content:
    "Hi! I'm a little guide for Amna's portfolio. Ask me about her skills, projects, or how to get in touch.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages([...nextMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...nextMessages,
        { role: "assistant", content: "Sorry, I couldn't reach the server. Try again in a moment." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="clipping clipping-notape mb-3 w-[90vw] max-w-sm h-[28rem] flex flex-col rounded-sm overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-line bg-paper">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-red" />
              <p className="font-display font-bold text-sm">Ask about this site</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-muted hover:text-red transition-colors"
            >
              <X size={17} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  "text-sm leading-relaxed max-w-[85%] px-3 py-2 rounded-sm " +
                  (m.role === "assistant"
                    ? "bg-paper border border-line"
                    : "bg-ink text-paper ml-auto")
                }
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-muted px-3 py-2 font-mono">thinking...</div>
            )}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t border-line">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-transparent border border-line rounded-sm px-3 py-2 text-sm outline-none focus:border-ink"
            />
            <button
              type="submit"
              disabled={loading}
              aria-label="Send"
              className="w-9 h-9 flex items-center justify-center bg-ink text-paper rounded-sm hover:bg-red transition-colors disabled:opacity-50"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <div className="flex items-center justify-end gap-3">
        {!open && (
          <span className="hidden sm:block font-hand text-lg text-ink bg-paper/90 border border-line px-3 py-1 rounded-full shadow-sm">
            ask me anything
          </span>
        )}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close chat guide" : "Open chat guide"}
          className={
            "w-14 h-14 rounded-full bg-ink text-paper flex items-center justify-center shadow-lg hover:scale-105 transition-transform " +
            (!open ? "chat-pulse" : "")
          }
        >
          {open ? <X size={22} /> : <Sparkles size={22} />}
        </button>
      </div>
    </div>
  );
}
