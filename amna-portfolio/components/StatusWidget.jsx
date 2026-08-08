import { Radio } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";

async function getStatus() {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase
    .from("site_status")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return data.current_focus;
}

export default async function StatusWidget() {
  const status = await getStatus();
  if (!status) return null;

  return (
    <div className="inline-flex items-center gap-2 mt-6 px-3 py-1.5 border border-line rounded-full text-sm">
      <Radio size={13} className="text-green" />
      <span className="text-muted">Currently:</span>
      <span>{status}</span>
    </div>
  );
}
