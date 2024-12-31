import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://viwtxbfmkziochmtmfnt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd3R4YmZta3ppb2NobXRtZm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ2OTU1NDYsImV4cCI6MjA1MDI3MTU0Nn0.BNjkKVLP2AbH2KxRh2LjDuZ_4nkzchGZMYkqiDclvQ4'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
});