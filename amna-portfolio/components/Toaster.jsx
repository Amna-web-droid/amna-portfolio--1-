"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export function notify(message, type = "success") {
  window.dispatchEvent(new CustomEvent("show-toast", { detail: { message, type } }));
}

export default function Toaster() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    function handleToast(e) {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, ...e.detail }]);
      setTimeout(() => {
        setToasts((t) => t.filter((toast) => toast.id !== id));
      }, 3500);
    }
    window.addEventListener("show-toast", handleToast);
    return () => window.removeEventListener("show-toast", handleToast);
  }, []);

  function dismiss(id) {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  }

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[70] flex flex-col gap-2 max-w-xs">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={
            "clipping clipping-notape flex items-start gap-2 px-4 py-3 rounded-sm text-sm " +
            (toast.type === "error" ? "border border-red" : "")
          }
        >
          {toast.type === "error" ? (
            <AlertCircle size={16} className="text-red mt-0.5 shrink-0" />
          ) : (
            <CheckCircle2 size={16} className="text-green mt-0.5 shrink-0" />
          )}
          <p className="flex-1">{toast.message}</p>
          <button onClick={() => dismiss(toast.id)} aria-label="Dismiss" className="text-muted hover:text-ink">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
