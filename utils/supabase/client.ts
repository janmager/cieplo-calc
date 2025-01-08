import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = process.env.SUPABASE_URL
// const supabaseKey = process.env.SUPABASE_KEY

const supabaseUrl = 'https://opewhxnwoeymcltcxllc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9wZXdoeG53b2V5bWNsdGN4bGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1NTU3MTIsImV4cCI6MjA1MDEzMTcxMn0.KqVPY_6fR2O0zSqJtkR0b7xxgUdpil65cpNV8pIYj5Q'

export const supabase: any = createClient(supabaseUrl as string, supabaseKey as string)