create extension if not exists pgcrypto;

create table if not exists public.productos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  nombre text not null,
  detalle text not null,
  valor integer not null check (valor >= 0),
  imagen_nombre text,
  imagen_path text,
  imagen_url text,
  activo boolean not null default true
);

create table if not exists public.producto_ingredientes_eliminar (
  id uuid primary key default gen_random_uuid(),
  producto_id uuid not null references public.productos(id) on delete cascade,
  nombre text not null,
  orden integer not null default 0,
  created_at timestamptz not null default now(),
  constraint producto_ingrediente_nombre_unico unique (producto_id, nombre)
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists productos_set_updated_at on public.productos;

create trigger productos_set_updated_at
before update on public.productos
for each row
execute function public.set_updated_at();

alter table public.productos enable row level security;
alter table public.producto_ingredientes_eliminar enable row level security;

drop policy if exists "Authenticated users can manage products" on public.productos;
drop policy if exists "Authenticated users can manage removable product ingredients" on public.producto_ingredientes_eliminar;

create policy "Authenticated users can manage products"
on public.productos
for all
to authenticated
using (true)
with check (true);

create policy "Authenticated users can manage removable product ingredients"
on public.producto_ingredientes_eliminar
for all
to authenticated
using (true)
with check (true);

create index if not exists productos_created_at_idx
on public.productos (created_at desc);

create index if not exists productos_activo_idx
on public.productos (activo);

create index if not exists producto_ingredientes_eliminar_producto_id_idx
on public.producto_ingredientes_eliminar (producto_id);
