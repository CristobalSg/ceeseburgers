create extension if not exists pgcrypto;

create table if not exists public.ceesepuntos_clientes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  rut text not null,
  username text not null,
  alias text not null,
  aparecer_anonimo boolean not null default false,
  instagram text,
  whatsapp text,
  fecha_cumpleanos date,
  terminos_aceptados boolean not null default false,
  puntos_actuales integer not null default 0 check (puntos_actuales >= 0),
  ultima_compra date,
  referidos_mes integer not null default 0 check (referidos_mes >= 0)
);

alter table public.ceesepuntos_clientes enable row level security;

create unique index if not exists ceesepuntos_clientes_rut_key
on public.ceesepuntos_clientes (lower(rut));

create unique index if not exists ceesepuntos_clientes_username_key
on public.ceesepuntos_clientes (lower(username));

drop index if exists public.ceesepuntos_clientes_instagram_key;

create unique index if not exists ceesepuntos_clientes_instagram_key
on public.ceesepuntos_clientes (lower(instagram))
where instagram is not null;

drop index if exists public.ceesepuntos_clientes_whatsapp_key;

create unique index if not exists ceesepuntos_clientes_whatsapp_key
on public.ceesepuntos_clientes (whatsapp)
where whatsapp is not null;

alter table public.ceesepuntos_clientes
  alter column instagram drop not null,
  alter column whatsapp drop not null;

drop policy if exists "Anyone can register ceesepuntos clients" on public.ceesepuntos_clientes;

create policy "Anyone can register ceesepuntos clients"
on public.ceesepuntos_clientes
for insert
to anon
with check (
  rut <> ''
  and username <> ''
  and alias <> ''
  and terminos_aceptados = true
  and puntos_actuales = 0
  and ultima_compra is null
  and referidos_mes = 0
);

revoke all on public.ceesepuntos_clientes from anon, authenticated;
grant insert on public.ceesepuntos_clientes to anon;

create or replace view public.ceesepuntos_ranking_public as
select
  id,
  case
    when aparecer_anonimo then 'Burger fan anónimo'
    when nullif(alias, '') is not null then alias
    else username
  end as public_name,
  puntos_actuales,
  ultima_compra,
  referidos_mes
from public.ceesepuntos_clientes
order by puntos_actuales desc, ultima_compra desc nulls last, created_at asc;

revoke all on public.ceesepuntos_ranking_public from anon, authenticated;
grant select on public.ceesepuntos_ranking_public to anon, authenticated;
