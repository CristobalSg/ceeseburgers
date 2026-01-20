import { products } from "./Products";
import type { Product } from "./Products";
import { useState } from "react";

export function MenuPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');

  function addToCart(slug: string) {
    setCart((prev) => ({ ...prev, [slug]: (prev[slug] ?? 0) + 1 }));
  }

  function removeFromCart(slug: string) {
    setCart((prev) => {
      const copy = { ...prev };
      if (!copy[slug]) return prev;
      copy[slug] = copy[slug] - 1;
      if (copy[slug] <= 0) delete copy[slug];
      return copy;
    });
  }

  function parsePrice(price: string) {
    const digits = price.replace(/\D/g, "");
    return parseInt(digits || "0", 10);
  }

  function formatPrice(amount: number) {
    return new Intl.NumberFormat("es-CL").format(amount);
  }

  const cartItems = Object.entries(cart).map(([slug, qty]) => {
    const product = products.find((p) => p.slug === slug)!;
    const price = parsePrice(product.price);
    return { product, qty, price };
  });

  const total = cartItems.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <section className="space-y-6">
      <div className="grid gap-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">Menú completo</p>
        <h3 className="text-3xl font-bold text-slate-900">Todos nuestros productos</h3>
        <p className="text-base text-slate-600">Explora el menú completo y haz clic en cualquier producto para ver más detalles.</p>
      </div>

      <div className="grid gap-4 grid-cols-2">
        {products.map((product: Product) => {
          const cardHref = `/producto/${product.slug}`;
          return (
            <a
              key={product.slug}
              href={cardHref}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-lg transition-transform duration-200 hover:scale-105 flex flex-col bg-white"
            >
              <div className="relative w-full aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-full object-cover transition duration-200"
                />
              </div>

              <div className="p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-sm font-semibold text-slate-900">{product.name}</h4>
                  <span className="text-sm font-semibold text-red-700">{product.price}</span>
                </div>
                <p className="mt-2 text-sm text-slate-700">{product.description}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Floating CTA (centered, small float animation). Hidden when modal open */}
      {!isOpen && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <style>{`@keyframes floatY{0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}`}</style>
          <button
            aria-label="Abrir carrito"
            onClick={() => setIsOpen(true)}
            style={{ animation: "floatY 3s ease-in-out infinite" }}
            className="inline-flex items-center gap-3 rounded-full bg-red-700 px-4 py-3 text-white shadow-2xl"
          >
            Pedir ahora
            {Object.keys(cart).length > 0 ? (
              <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">{Object.values(cart).reduce((a,b)=>a+b,0)}</span>
            ) : null}
          </button>
        </div>
      )}

      {/* Modal */}
      {isOpen ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md rounded-t-2xl bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Selecciona productos</h3>
              <button className="text-sm text-slate-500" onClick={() => setIsOpen(false)}>Cerrar</button>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-3">
              {products.map((product) => (
                <button
                  key={product.slug}
                  onClick={() => addToCart(product.slug)}
                  className="flex flex-col items-center gap-2"
                >
                  <img src={product.image} alt={product.imageAlt} className="h-16 w-16 rounded-md object-cover" />
                  <span className="text-xs text-center">{product.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-4 border-t pt-3">
              <div className="mb-3">
                <div className="text-sm font-medium">¿Cómo quieres tu pedido?</div>
                <div className="mt-2 flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="orderType"
                      value="pickup"
                      checked={orderType === 'pickup'}
                      onChange={() => setOrderType('pickup')}
                      className="h-4 w-4"
                    />
                    <span>Retiro en local</span>
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="orderType"
                      value="delivery"
                      checked={orderType === 'delivery'}
                      onChange={() => setOrderType('delivery')}
                      className="h-4 w-4"
                    />
                    <span>Delivery</span>
                  </label>
                </div>

                {orderType === 'delivery' ? (
                  <div className="mt-3">
                    <label className="text-xs text-slate-600">Dirección de entrega</label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle, número, referencia"
                      className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                ) : null}
              </div>
              <h4 className="text-sm font-semibold">Tu carrito</h4>
              <div className="mt-2 max-h-40 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-slate-500">No hay productos seleccionados.</p>
                ) : (
                  cartItems.map((it) => (
                    <div key={it.product.slug} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <img src={it.product.image} alt={it.product.imageAlt} className="h-10 w-10 rounded-md object-cover" />
                        <div>
                          <div className="text-sm font-medium">{it.product.name}</div>
                          <div className="text-xs text-slate-500">{it.qty} x ${formatPrice(it.price)}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeFromCart(it.product.slug)} className="text-sm text-red-600">-</button>
                        <div className="text-sm font-semibold">{it.qty}</div>
                        <button onClick={() => addToCart(it.product.slug)} className="text-sm text-green-600">+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-slate-700">Total</div>
                <div className="text-lg font-bold text-slate-900">${formatPrice(total)}</div>
              </div>

              <div className="mt-4">
                <button
                  disabled={
                    cartItems.length === 0 || (orderType === 'delivery' && address.trim() === '')
                  }
                  onClick={() => {
                    // build message
                    const lines = ["Hola, quiero hacer un pedido:"];
                    lines.push(`Tipo: ${orderType === 'delivery' ? 'Delivery' : 'Retiro en local'}`);
                    if (orderType === 'delivery') {
                      lines.push(`Dirección: ${address}`);
                    }
                    cartItems.forEach((it) => {
                      lines.push(`- ${it.product.name} x${it.qty} - $${formatPrice(it.price * it.qty)}`);
                    });
                    lines.push(`Total: $${formatPrice(total)}`);
                    const message = lines.join("\n");
                    const phone = "56945568889";
                    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                    window.open(url, "_blank");
                  }}
                  className="w-full rounded-full bg-green-600 px-4 py-2 text-white disabled:opacity-50"
                >
                  Pedir por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
