// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://viwtxbfmkziochmtmfnt.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd3R4YmZta3ppb2NobXRtZm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2OTU1NDYsImV4cCI6MjA1MDI3MTU0Nn0.BNjkKVLP2AbH2KxRh2LjDuZ_4nkzchGZMYkqiDclvQ4";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);