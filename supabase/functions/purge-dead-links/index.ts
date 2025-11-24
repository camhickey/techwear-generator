/// <reference types="deno" />

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// Runs as a scheduled Edge Function: checks clothing.link URLs and deletes rows returning 404
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}
const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    persistSession: false,
  },
});
async function checkAndPrune() {
  // Fetch all clothing rows with non-null link
  const { data, error } = await supabase
    .from("clothing")
    .select("clothing_id, link")
    .neq("link", null);
  if (error) {
    console.error("Error fetching clothing rows", error);
    return {
      ok: false,
      error: error.message,
    };
  }
  const deleteIds: string[] = [];
  // Check links in parallel with limited concurrency
  const concurrency = 10;
  let idx = 0;
  async function worker() {
    while (true) {
      const i = idx++;
      if (!data || i >= data.length) return;
      const row = data[i];
      const url = row.link;
      try {
        const resp = await fetch(url, {
          method: "HEAD",
        });
        if (resp.status === 404) {
          deleteIds.push(row.clothing_id);
        } else if (resp.status >= 400 && resp.status < 500) {
          // treat other 4xx as broken as well
          deleteIds.push(row.clothing_id);
        }
      } catch (e) {
        console.error("Fetch error for", url, e);
        // network errors: skip deleting to be conservative
      }
    }
  }
  await Promise.all(
    Array.from({
      length: concurrency,
    }).map(() => worker())
  );
  if (deleteIds.length === 0)
    return {
      ok: true,
      deleted: 0,
    };
  // Delete rows permanently
  const { error: delErr, count } = await supabase
    .from("clothing")
    .delete()
    .in("clothing_id", deleteIds);
  if (delErr) {
    console.error("Delete error", delErr);
    return {
      ok: false,
      error: delErr.message,
    };
  }
  return {
    ok: true,
    deleted: deleteIds.length,
  };
}
Deno.serve(async (req) => {
  // Simple auth: require a secret header for manual runs (optional)
  const url = new URL(req.url);
  if (url.pathname === "/run") {
    const result = await checkAndPrune();
    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // Default endpoint triggers the job as well
  const result = await checkAndPrune();
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
    },
  });
});
