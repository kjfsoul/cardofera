import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://viwtxbfmkziochmtmfnt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpd3R4YmZta3ppb2NobXRtZm50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ5MzI5NzAsImV4cCI6MjAyMDUwODk3MH0.0_KQby_0NFQwJe4L_PCgAoRQEP4EoWvx-nXA3QJWZ_4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});