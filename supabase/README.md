# Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env` and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Open Supabase Dashboard > SQL Editor.
4. Run `supabase/orders.sql`.

The app uses only the official `@supabase/supabase-js` client from the frontend.
There is no custom backend and no authentication. RLS is enabled, with a single
public `INSERT` policy for anonymous checkout submissions. No `SELECT`, `UPDATE`,
or `DELETE` policy is created, so public clients cannot read or modify orders.
