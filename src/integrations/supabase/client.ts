import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://viwtxbfmkziochmtmfnt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd3R4YmZta3ppb2NobXRtZm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4MjU2MDAsImV4cCI6MjAxOTQwMTYwMH0.GE-B1-6i1LHJHsxjYLkqGTYEKVEFpDqbhWAF0VB9QYs'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})