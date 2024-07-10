/// src/supabaseClient.ts
// src/supabaseClient.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL as string
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY as string

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and key must be provided')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
export { supabaseUrl }
