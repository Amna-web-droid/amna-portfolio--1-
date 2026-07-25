import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

// A custom fetch that always skips caching — this is what actually
// talks to Supabase, so every read is guaranteed fresh, with no
// layer (browser, Vercel edge, or Next.js) allowed to serve a stale copy.
function noStoreFetch(input, init = {}) {
  return fetch(input, { ...init, cache: "no-store" });
}

// Falls back to placeholder strings so the app doesn't crash before
// Supabase is configured — every call site checks isSupabaseConfigured()
// first and shows a friendly message instead of querying.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
  {
    global: { fetch: noStoreFetch },
  }
);
