# Supabase setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env` and set:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
3. Open Supabase Dashboard > SQL Editor.
4. Run `supabase/orders.sql`.
5. To enable the admin image module, run `supabase/menu_images_storage.sql` and create the admin users in Supabase Auth.
6. To enable admin products, run `supabase/productos.sql`.

The app uses only the official `@supabase/supabase-js` client from the frontend.
There is no custom backend. RLS is enabled, with a single public `INSERT` policy
for anonymous checkout submissions. No `SELECT`, `UPDATE`, or `DELETE` policy is
created, so public clients cannot read or modify orders. The admin image module
uses Supabase Auth with the public publishable key only; never expose service-role
or private keys in the frontend.

The admin image module must use only the Supabase Storage bucket named
`menu-images`. Uploading, listing, and public URL generation must all call
`supabase.storage.from("menu-images")`; do not create or target any other bucket.
Images are stored under `productos/` inside that bucket.
