import { createClient } from "@supabase/supabase-js";

// Add Vite environment type declaration
interface ImportMetaEnv {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_ANON_KEY: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL and Anon Key must be provided in environment variables",
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Enforce .select() usage through query builder wrapper
export const safeSelect = (table: string) => ({
  select: (columns: string) =>
    supabase.from(table).select(columns).throwOnError(),
});

// Type-safe query helper with proper generics
export const queryBuilder = <T extends Record<string, unknown>>(
  table: string,
) => ({
  select: (columns: string) => ({
    eq: (column: keyof T, value: unknown) =>
      safeSelect(table)
        .select(columns)
        .eq(column as string, value),
  }),
});
