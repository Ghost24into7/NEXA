import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      calculations: {
        Row: {
          id: string
          user_id: string | null
          expression: string
          result: string
          mode: string
          precision: number
          tags: string[] | null
          created_at: string
        }
      }
      custom_functions: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          code: string
          language: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
      }
    }
  }
}
