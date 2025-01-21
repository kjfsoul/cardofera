import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL and Anon Key must be provided in environment variables");
}
export const supabase = createClient(supabaseUrl, supabaseKey);
// Enforce .select() usage through query builder wrapper
export const safeSelect = (table) => ({
    select: (columns) => supabase.from(table).select(columns).throwOnError(),
});
// Type-safe query helper with proper generics
export const queryBuilder = (table) => ({
    select: (columns) => ({
        eq: (column, value) => safeSelect(table)
            .select(columns)
            .eq(column, value),
    }),
});
