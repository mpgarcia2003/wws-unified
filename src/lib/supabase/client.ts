import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client — used by the shade builder for
 * swatch requests, order customization data, etc.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
