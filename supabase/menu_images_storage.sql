-- Storage setup for the admin image module.
-- Run this once in Supabase SQL Editor.

insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Authenticated users can list menu images" on storage.objects;
drop policy if exists "Authenticated users can upload menu images" on storage.objects;

create policy "Authenticated users can list menu images"
on storage.objects for select
to authenticated
using (bucket_id = 'menu-images');

create policy "Authenticated users can upload menu images"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'menu-images'
  and (storage.foldername(name))[1] = 'productos'
  and lower((storage.extension(name))) = 'webp'
);
