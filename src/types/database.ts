// This file will contain auto-generated TypeScript types from your Supabase schema
//
// To generate types after running migrations:
// npx supabase gen types typescript --project-id your-project-ref > src/types/database.ts
//
// Or if using local development:
// npx supabase gen types typescript --local > src/types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Placeholder types - will be replaced when you generate from your Supabase project
export interface Database {
  public: {
    Tables: {
      // Tables will be auto-generated here
    }
    Views: {
      // Views will be auto-generated here
    }
    Functions: {
      // Functions will be auto-generated here
    }
    Enums: {
      // Enums will be auto-generated here
    }
  }
}
