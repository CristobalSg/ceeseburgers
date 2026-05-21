create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  order_type text not null check (order_type in ('pickup', 'delivery')),
  address text,
  payment_method text not null check (payment_method in ('transfer', 'cash')),
  cash_payment_type text check (cash_payment_type in ('exact', 'amount')),
  cash_amount integer,
  subtotal integer not null check (subtotal >= 0),
  delivery_fee integer not null default 0 check (delivery_fee >= 0),
  delivery_estimate_min integer,
  delivery_estimate_max integer,
  total integer not null check (total >= 0),
  total_items integer not null check (total_items > 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  whatsapp_message text not null,
  items jsonb not null,
  metadata jsonb not null default '{}'::jsonb
);

alter table public.orders enable row level security;

drop policy if exists "Anyone can create orders" on public.orders;

create policy "Anyone can create orders"
on public.orders
for insert
to anon
with check (
  customer_name <> ''
  and total_items > 0
  and jsonb_typeof(items) = 'array'
  and jsonb_array_length(items) > 0
);

create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status);
