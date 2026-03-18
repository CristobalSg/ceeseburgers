import { products } from "./Products";
import { StarIcon, TagIcon } from "@heroicons/react/24/solid";
import comboFamiliarImg from "../../img/combos/combo-familiar.png";
import comboClasicasFullImg from "../../img/combos/combo-clasicas-full.png";
import comboBaconLoversImg from "../../img/combos/combo-bacon-lovers.png";
import { useState } from "react";

type MenuCombo = {
  id: string;
  title: string;
  description: string;
  priceLabel: string;
  image: string;
  items?: { slug: string; qty: number }[];
  favorite?: boolean;
  note?: string;
  comingSoon?: boolean;
};

type MenuCategoryItem = {
  name: string;
  description: string;
  priceLabel: string;
  image: string;
  imageAlt: string;
  badge?: string;
};

type MenuTab = "hamburguesas" | "acompanamientos" | "bebidas" | "salsas";

export function MenuPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [promoToConfirm, setPromoToConfirm] = useState<MenuCombo | null>(null);
  const [cart, setCart] = useState<Record<string, { qty: number; note?: string }>>({});
  const [showNoteEditor, setShowNoteEditor] = useState<Record<string, boolean>>({});
  const [tagHint, setTagHint] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState('');
  const [activeMenuTab, setActiveMenuTab] = useState<MenuTab>("hamburguesas");

  function addToCart(slug: string) {
    const prevCount = Object.values(cart).reduce((s, it) => s + it.qty, 0);
    setCart((prev) => ({ ...prev, [slug]: { qty: (prev[slug]?.qty ?? 0) + 1, note: prev[slug]?.note } }));
    if (prevCount === 0) {
      setTagHint(slug);
      setTimeout(() => setTagHint(null), 6000);
    }
  }

  function removeFromCart(slug: string) {
    setCart((prev) => {
      const copy = { ...prev };
      if (!copy[slug]) return prev;
      copy[slug] = { qty: copy[slug].qty - 1, note: copy[slug].note };
      if (copy[slug].qty <= 0) delete copy[slug];
      return copy;
    });
  }

  function toggleNoteEditor(slug: string) {
    setShowNoteEditor((prev) => ({ ...prev, [slug]: !prev[slug] }));
  }

  function parsePrice(price: string) {
    const digits = price.replace(/\D/g, "");
    return parseInt(digits || "0", 10);
  }

  function formatPrice(amount: number) {
    return new Intl.NumberFormat("es-CL").format(amount);
  }

  const cartItems = Object.entries(cart).map(([slug, data]) => {
    const product = products.find((p) => p.slug === slug)!;
    const price = parsePrice(product.price);
    return { product, qty: data.qty, note: data.note, price };
  });

  const individualCombos: MenuCombo[] = [
    {
      id: "combo-clasico",
      title: "Combo Clasico",
      description: "Hamburguesa clasica + papitas + bebida + salsa",
      priceLabel: "$3.990",
      image: comboClasicasFullImg,
      favorite: true,
      note: "Hamburguesa + Papitas + Bebida + Salsa",
    },
    {
      id: "combo-bacon",
      title: "Combo Bacon",
      description: "Hamburguesa bacon + papitas + bebida + salsa",
      priceLabel: "$4.490",
      image: comboBaconLoversImg,
      note: "Hamburguesa + Papitas + Bebida + Salsa",
    },
    {
      id: "combo-doble",
      title: "Combo Doble",
      description: "Hamburguesa doble + papitas + bebida + salsa",
      priceLabel: "$4.990",
      image: comboFamiliarImg,
      note: "Hamburguesa + Papitas + Bebida + Salsa",
    },
  ];

  const familyCombos: MenuCombo[] = [
    {
      id: "combo-familiar-clasico",
      title: "Combo Familiar Clasico",
      description: "3 Clásicas + 2 Bacon",
      priceLabel: "$9.990",
      image: comboFamiliarImg,
      items: [
        { slug: "cs-clasica", qty: 3 },
        { slug: "cs-bacon", qty: 2 },
      ],
      favorite: true,
      note: "Ideales para compartir",
    },
    {
      id: "combo-familiar-bacon",
      title: "Combo Familiar Bacon",
      description: "5 hamburguesas bacon",
      priceLabel: "$10.990",
      image: comboBaconLoversImg,
      note: "Ideales para compartir",
    },
    {
      id: "combo-familiar-mix",
      title: "Combo Familiar Mix",
      description: "2 clasicas + 2 bacon + papas grandes",
      priceLabel: "$10.490",
      image: comboClasicasFullImg,
      note: "Ideales para compartir",
    },
  ];

  const sideMenu: MenuCategoryItem[] = [
    {
      name: "Papitas fritas",
      description: "El acompanamiento clasico para cualquier pedido.",
      priceLabel: "$1.490",
      image: comboClasicasFullImg,
      imageAlt: "Papitas fritas",
    },
    {
      name: "Aros de cebolla",
      description: "En promo porque se viene proximamente.",
      priceLabel: "$1.990",
      image: comboBaconLoversImg,
      imageAlt: "Aros de cebolla",
      badge: "Proximamente",
    },
    {
      name: "Nuggets",
      description: "En promo porque se viene proximamente.",
      priceLabel: "$2.490",
      image: comboFamiliarImg,
      imageAlt: "Nuggets",
      badge: "Proximamente",
    },
    {
      name: "Empanadas de queso",
      description: "En promo porque se viene proximamente.",
      priceLabel: "$2.290",
      image: comboClasicasFullImg,
      imageAlt: "Empanadas de queso",
      badge: "Proximamente",
    },
  ];

  const drinkMenu: MenuCategoryItem[] = [
    {
      name: "Bebida mediana",
      description: "Formato mediano para acompanar combos o pedidos individuales.",
      priceLabel: "$990",
      image: comboFamiliarImg,
      imageAlt: "Bebida mediana",
    },
    {
      name: "Bebida grande",
      description: "Formato grande para quienes quieren mas bebida.",
      priceLabel: "$1.290",
      image: comboBaconLoversImg,
      imageAlt: "Bebida grande",
    },
  ];

  const sauceMenu: MenuCategoryItem[] = [
    {
      name: "Mayo casera",
      description: "Extra para acompanar tu pedido.",
      priceLabel: "$300",
      image: comboClasicasFullImg,
      imageAlt: "Mayo casera",
    },
    {
      name: "Ketchup",
      description: "Extra para acompanar tu pedido.",
      priceLabel: "$300",
      image: comboFamiliarImg,
      imageAlt: "Ketchup",
    },
    {
      name: "Mostaza",
      description: "Extra para acompanar tu pedido.",
      priceLabel: "$300",
      image: comboBaconLoversImg,
      imageAlt: "Mostaza",
    },
    {
      name: "BBQ",
      description: "Extra para acompanar tu pedido.",
      priceLabel: "$500",
      image: comboBaconLoversImg,
      imageAlt: "Salsa BBQ",
    },
    {
      name: "Ajo",
      description: "Extra para acompanar tu pedido.",
      priceLabel: "$500",
      image: comboFamiliarImg,
      imageAlt: "Salsa de ajo",
    },
  ];

  function confirmPromo(promo: MenuCombo) {
    // build message for the promotion and open WhatsApp
    const lines: string[] = [];
    lines.push(`Quiero la promoción: ${promo.title}`);
    lines.push(`Precio: ${promo.priceLabel}`);
    lines.push("Incluye:");
    if (promo.note) {
      lines.push(`- ${promo.note}`);
    }
    promo.items?.forEach((it) => {
      const prod = products.find((p) => p.slug === it.slug);
      lines.push(`- ${prod ? prod.name : it.slug} x${it.qty}`);
    });
    const message = lines.join("\n");
    const phone = "56945568889";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setPromoToConfirm(null);
  }

  const total = cartItems.reduce((s, it) => s + it.price * it.qty, 0);
  const totalCount = cartItems.reduce((s, it) => s + it.qty, 0);
  const menuTabs: { id: MenuTab; label: string }[] = [
    { id: "hamburguesas", label: "Hamburguesas" },
    { id: "acompanamientos", label: "Acompañamientos" },
    { id: "bebidas", label: "Bebidas" },
    { id: "salsas", label: "Salsas" },
  ];

  function renderCategoryCards(items: MenuCategoryItem[], columnsClassName = "grid-cols-2") {
    return (
      <div className={`grid gap-4 ${columnsClassName}`}>
        {items.map((item) => (
          <div key={item.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-square overflow-hidden">
              <img src={item.image} alt={item.imageAlt} className="h-full w-full object-cover" />
              {item.badge ? (
                <span className="absolute right-3 top-3 rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-800">
                  {item.badge}
                </span>
              ) : null}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                <div className="text-sm font-semibold text-red-700">{item.priceLabel}</div>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="grid gap-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">Menú completo</p>
        <h3 className="text-3xl font-bold text-slate-900">Todos nuestros productos</h3>
        <p className="text-base text-slate-600">Explora el menú completo con el nuevo orden de categorías y los combos destacados en carrusel.</p>
      </div>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-slate-900">Combos Individuales</h4>
          <span className="text-sm text-slate-500">Hamburguesa + Papitas + Bebida + Salsa</span>
        </div>
        <div className="-mx-4 overflow-x-auto px-4 pb-2">
          <div className="flex gap-4 snap-x snap-mandatory">
            {individualCombos.map((combo) => (
              <div key={combo.id} className="flex flex-col items-start min-w-[200px]">
                <article
                  onClick={() => setPromoToConfirm(combo)}
                  className={`w-full aspect-square snap-start rounded-2xl overflow-hidden bg-white shadow-md transition hover:scale-105 flex items-center justify-center cursor-pointer ${combo.favorite ? 'border-2 border-yellow-400' : ''}`}
                >
                  <img src={combo.image} alt={combo.title} className="h-full w-full object-cover" />
                </article>
                <div className="mt-2 w-full">
                  <div className="text-base font-semibold text-slate-900 flex items-center gap-1">
                    {combo.title}
                    {combo.favorite && <StarIcon className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <div className="text-xs text-slate-500">{combo.description}</div>
                  <div className="mt-1 text-lg font-bold text-slate-900">{combo.priceLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-slate-900">Combos Familiares</h4>
          <span className="text-sm text-slate-500">Ideales para compartir</span>
        </div>
        <div className="-mx-4 overflow-x-auto px-4 pb-2">
          <div className="flex gap-4 snap-x snap-mandatory">
            {familyCombos.map((combo) => (
              <div key={combo.id} className="flex flex-col items-start min-w-[200px]">
                <article
                  onClick={() => setPromoToConfirm(combo)}
                  className={`w-full aspect-square snap-start rounded-2xl overflow-hidden bg-white shadow-md transition hover:scale-105 flex items-center justify-center cursor-pointer ${combo.favorite ? 'border-2 border-yellow-400' : ''}`}
                >
                  <img src={combo.image} alt={combo.title} className="h-full w-full object-cover" />
                </article>
                <div className="mt-2 w-full">
                  <div className="text-base font-semibold text-slate-900 flex items-center gap-1">
                    {combo.title}
                    {combo.favorite && <StarIcon className="w-4 h-4 text-yellow-400" />}
                  </div>
                  <div className="text-xs text-slate-500">{combo.description}</div>
                  <div className="mt-1 text-lg font-bold text-slate-900">{combo.priceLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-slate-900">Explora por categoria</h4>
          <span className="text-sm text-slate-500">Contenido dinamico segun el boton</span>
        </div>
        <div className="-mx-4 overflow-x-auto px-4 pb-2">
          <div className="flex w-max gap-3">
            {menuTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveMenuTab(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeMenuTab === tab.id
                    ? "bg-red-700 text-white shadow-md"
                    : "bg-white text-slate-700 ring-1 ring-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeMenuTab === "hamburguesas" ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-semibold text-slate-900">Hamburguesas Solas</h5>
              <span className="text-sm text-slate-500">Las 5 hamburguesas del menu anterior</span>
            </div>
            <div className="grid gap-4 grid-cols-2">
              {products.map((product) => (
                <div
                  key={product.slug}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-transform duration-200 hover:scale-105"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover transition duration-200"
                    />
                    {(product.mostOrdered || product.tag === "Top ventas") && (
                      <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
                        <StarIcon className="h-3 w-3" aria-hidden />
                        {product.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-900">{product.name}</h4>
                      <span className="text-sm font-semibold text-red-700">{product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {activeMenuTab === "acompanamientos" ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-semibold text-slate-900">Acompañamientos</h5>
              <span className="text-sm text-slate-500">Para complementar tu pedido</span>
            </div>
            {renderCategoryCards(sideMenu)}
          </div>
        ) : null}

        {activeMenuTab === "bebidas" ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-semibold text-slate-900">Bebidas</h5>
              <span className="text-sm text-slate-500">Formatos disponibles</span>
            </div>
            {renderCategoryCards(drinkMenu)}
          </div>
        ) : null}

        {activeMenuTab === "salsas" ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-base font-semibold text-slate-900">Salsas Extra</h5>
              <span className="text-sm text-slate-500">Elige tu favorita</span>
            </div>
            {renderCategoryCards(sauceMenu)}
          </div>
        ) : null}
      </section>

      {/* Floating CTA (centered, small float animation). Hidden when modal open */}
      {!isOpen && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
          <style>{`
            @keyframes floatY{0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)}}
            @keyframes shine {
              0% { opacity: 0; background-position: -120px 0; }
              80% { opacity: 0; background-position: -120px 0; }
              83% { opacity: 1; background-position: -120px 0; }
              87% { opacity: 1; background-position: 120px 0; }
              90% { opacity: 0; background-position: 120px 0; }
              100% { opacity: 0; background-position: 120px 0; }
            }
          `}</style>
          <button
            aria-label="Abrir carrito"
            onClick={() => setIsOpen(true)}
            style={{
              animation: "floatY 3s ease-in-out infinite",
              boxShadow: "0 0 12px 2px rgba(255,255,255,0.25)"
            }}
            className="inline-flex items-center gap-3 rounded-full bg-red-700 px-4 py-3 text-white shadow-2xl relative overflow-hidden"
          >
            <span className="relative z-10">Pedir ahora</span>
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                animation: "shine 6s linear infinite",
                backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)",
                backgroundSize: "240px 100%",
                backgroundRepeat: "no-repeat",
                opacity: 0
              }}
            ></span>
            {totalCount > 0 ? (
              <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold relative z-10">{totalCount}</span>
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
              {products.map((product) => {
                const qty = cart[product.slug]?.qty ?? 0;
                return (
                  <button
                    key={product.slug}
                    onClick={() => addToCart(product.slug)}
                    className="relative flex flex-col items-center gap-2"
                  >
                    <img src={product.image} alt={product.imageAlt} className="h-16 w-16 rounded-md object-cover" />
                    {qty > 0 ? (
                      <span className="absolute -right-1 -top-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">{qty}</span>
                    ) : null}
                    <span className="text-xs text-center">{product.name}</span>
                  </button>
                );
              })}
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
                      <div key={it.product.slug} className="py-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <img src={it.product.image} alt={it.product.imageAlt} className="h-10 w-10 rounded-md object-cover" />
                            <div>
                              <div className="text-sm font-medium">{it.product.name}</div>
                              <div className="text-xs text-slate-500">{it.qty} x ${formatPrice(it.price)}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                              <div className="relative">
                                <button
                                  onClick={() => toggleNoteEditor(it.product.slug)}
                                  className="text-sm text-slate-600"
                                  aria-label={`Agregar nota a ${it.product.name}`}
                                  style={tagHint === it.product.slug ? { animation: 'pulseHighlight 6s forwards' } : undefined}
                                >
                                  <TagIcon
                                    className={`h-4 w-4 ${it.note ? 'text-amber-600' : tagHint === it.product.slug ? 'text-amber-400' : 'text-slate-600'}`}
                                    style={tagHint === it.product.slug ? { animation: 'tagColor 6s forwards' } : undefined}
                                  />
                                </button>
                                {/* tooltip moved to a fixed top-level element so it stacks above everything */}
                              </div>
                              <button onClick={() => removeFromCart(it.product.slug)} className="text-sm text-red-600">-</button>
                              <div className="text-sm font-semibold">{it.qty}</div>
                              <button onClick={() => addToCart(it.product.slug)} className="text-sm text-green-600">+</button>
                            </div>
                        </div>
                        <div className="mt-2">
                          {showNoteEditor[it.product.slug] ? (
                            <div>
                              <label className="text-xs text-slate-500">Detalles (ej. sin cebolla)</label>
                              <div className="mt-1 flex gap-2">
                                <input
                                  value={it.note ?? ""}
                                  onChange={(e) => {
                                    const note = e.target.value;
                                    setCart((prev) => ({
                                      ...prev,
                                      [it.product.slug]: { ...(prev[it.product.slug] || { qty: it.qty }), note },
                                    }));
                                  }}
                                  placeholder="Agregar detalle para este producto"
                                  className="w-full rounded-md border px-2 py-1 text-sm"
                                />
                                <button
                                  className="rounded-md bg-slate-100 px-3 text-sm"
                                  onClick={() => toggleNoteEditor(it.product.slug)}
                                >
                                  Hecho
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-slate-500">{it.note ? it.note : ''}</div>
                            </div>
                          )}
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
                      const lines = ["Quiero hacer un pedido:"];
                      lines.push(`Tipo: ${orderType === 'delivery' ? '*Delivery*' : '*Retiro en local*'}`);
                      if (orderType === 'delivery') {
                        lines.push(`Dirección: *${address}*`);
                        lines.push(`_Falta agregar el valor del envío/delivery_`);
                      }
                      cartItems.forEach((it) => {
                        const notePart = it.note ? ` (${it.note})` : "";
                        lines.push(`- ${it.product.name} x *${it.qty}* -- $${formatPrice(it.price * it.qty)}${notePart}`);
                      });
                      lines.push(`Total: *$${formatPrice(total)}*`);
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
      {/* Fixed global hint so it is always visible above other elements */}
      {tagHint ? (
        <div className="fixed left-1/2 bottom-24 z-[9999] -translate-x-1/2 pointer-events-none">
          <style>{`
            @keyframes hintAnimGlobal {
              0% { opacity: 0; transform: translateY(0); }
              10% { opacity: 1; transform: translateY(-6px); }
              90% { opacity: 1; transform: translateY(-6px); }
              100% { opacity: 0; transform: translateY(0); }
            }
            @keyframes pulseHighlight {
              0% { transform: scale(1); box-shadow: none; }
              10% { transform: scale(1.06); box-shadow: 0 6px 20px rgba(250,204,21,0.12); }
              50% { transform: scale(1.06); box-shadow: 0 10px 30px rgba(250,204,21,0.18); }
              90% { transform: scale(1.06); box-shadow: 0 6px 20px rgba(250,204,21,0.12); }
              100% { transform: scale(1); box-shadow: none; }
            }
            @keyframes tagColor {
              0% { color: #facc15; }
              60% { color: #f87171; }
              100% { color: #dc2626; }
            }
          `}</style>
          <div
            role="status"
            className="mx-auto rounded-md bg-black/90 px-3 py-2 text-xs text-white shadow text-center"
            style={{ animation: "hintAnimGlobal 6s forwards", width: "50vw" }}
          >
            Si aprietas el boton senalando la etiqueta puedes agregar un detalle
          </div>
        </div>
      ) : null}
      {/* Promo confirmation modal */}
      {promoToConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPromoToConfirm(null)} />
          <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="text-lg font-semibold">Confirmar promocion</h3>
            <p className="mt-2 text-sm text-slate-600">¿Deseas realizar el pedido de "{promoToConfirm.title}" por {promoToConfirm.priceLabel}?</p>
            <div className="mt-4 flex items-center justify-end gap-3">
              <button className="rounded-md px-3 py-2 text-sm" onClick={() => setPromoToConfirm(null)}>Cancelar</button>
              <button className="rounded-full bg-red-700 px-4 py-2 text-sm text-white" onClick={() => confirmPromo(promoToConfirm)}>Realizar el pedido</button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
