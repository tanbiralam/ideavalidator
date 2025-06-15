import { createClient } from "@supabase/supabase-js";
import type { StoredIdea } from "../../types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<{
  public: {
    Tables: {
      ideas: {
        Row: StoredIdea;
        Insert: Omit<StoredIdea, "id">;
        Update: Partial<StoredIdea>;
      };
    };
  };
}>(supabaseUrl, supabaseAnonKey);

export async function storeIdea(idea: Omit<StoredIdea, "id">) {
  const { data, error } = await supabase
    .from("ideas")
    .insert(idea)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getExampleIdeas(limit = 5) {
  const { data, error } = await supabase
    .from("ideas")
    .select()
    .order("score", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}
