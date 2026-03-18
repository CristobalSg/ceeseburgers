import { ShoppingCartIcon, StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { products } from "./Products";
import comboFamiliarImg from "../../img/combos/combo-familiar.png";
import comboClasicasFullImg from "../../img/combos/combo-clasicas-full.png";
import comboBaconLoversImg from "../../img/combos/combo-bacon-lovers.png";

type MenuTab = "hamburguesas" | "acompanamientos" | "bebidas" | "salsas";
type MenuCategory = "combo-individual" | "combo-familiar" | "hamburguesas" | "acompanamientos" | "bebidas" | "salsas";

type MenuOptionGroup = {
  id: string;
  label: string;
  choices: string[];
};

type MenuItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  category: MenuCategory;
  badge?: string;
  favorite?: boolean;
  options?: MenuOptionGroup[];
  removableIngredients?: string[];
};

type CartItem = {
  id: string;
  item: MenuItem;
  qty: number;
  selections: Record<string, string>;
  unitSelections?: Record<string, string>[];
  removals?: string[];
  unitRemovals?: string[][];
};

const comboDrinkOptions = ["Sprite", "Coca-Cola", "Fanta"];
const friesSauceOptions = ["Mayo casera", "Ketchup", "Mostaza", "BBQ", "Ajo"];

function parsePrice(price: string) {
  const digits = price.replace(/\D/g, "");
  return parseInt(digits || "0", 10);
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-CL").format(amount);
}

function buildCartSignature(itemId: string, selections: Record<string, string>) {
  const selectionKey = Object.entries(selections)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");
  return `${itemId}::${selectionKey}`;
}

function usesPerUnitRemovals(item: MenuItem) {
  return item.category === "combo-individual" || item.category === "hamburguesas";
}

export function MenuPage() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedUnitOptions, setSelectedUnitOptions] = useState<Record<string, string>[]>([]);
  const [selectedRemovals, setSelectedRemovals] = useState<string[]>([]);
  const [selectedUnitRemovals, setSelectedUnitRemovals] = useState<string[][]>([]);
  const [editingCartItemId, setEditingCartItemId] = useState<string | null>(null);
  const [cartFeedback, setCartFeedback] = useState<{ title: string; mode: "added" | "edited" } | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [activeMenuTab, setActiveMenuTab] = useState<MenuTab>("hamburguesas");

  useEffect(() => {
    const hasOpenModal = isCartOpen || selectedItem !== null;
    const previousOverflow = document.body.style.overflow;

    if (hasOpenModal) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen, selectedItem]);

  useEffect(() => {
    if (!cartFeedback) return;

    const timeoutId = window.setTimeout(() => {
      setCartFeedback(null);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [cartFeedback]);

  const individualCombos: MenuItem[] = [
    {
      id: "combo-clasico",
      title: "Combo Clasico",
      description: "Hamburguesa clasica + papitas + bebida + salsa",
      price: 3990,
      image: comboClasicasFullImg,
      imageAlt: "Combo clasico",
      category: "combo-individual",
      favorite: true,
      removableIngredients: ["Salsa", "Tomate", "Lechuga", "Queso"],
      options: [
        { id: "bebida", label: "Sabor de bebida", choices: comboDrinkOptions },
        { id: "salsa", label: "Salsa para las papas", choices: friesSauceOptions },
      ],
    },
    {
      id: "combo-bacon",
      title: "Combo Bacon",
      description: "Hamburguesa bacon + papitas + bebida + salsa",
      price: 4490,
      image: comboBaconLoversImg,
      imageAlt: "Combo bacon",
      category: "combo-individual",
      removableIngredients: ["Salsa", "Tocino", "Queso", "Cebolla caramelizada"],
      options: [
        { id: "bebida", label: "Sabor de bebida", choices: comboDrinkOptions },
        { id: "salsa", label: "Salsa para las papas", choices: friesSauceOptions },
      ],
    },
    {
      id: "combo-doble",
      title: "Combo Doble",
      description: "Hamburguesa doble + papitas + bebida + salsa",
      price: 4990,
      image: comboFamiliarImg,
      imageAlt: "Combo doble",
      category: "combo-individual",
      removableIngredients: ["Salsa", "Queso", "Tomate", "Lechuga"],
      options: [
        { id: "bebida", label: "Sabor de bebida", choices: comboDrinkOptions },
        { id: "salsa", label: "Salsa para las papas", choices: friesSauceOptions },
      ],
    },
  ];

  const familyCombos: MenuItem[] = [
    {
      id: "combo-familiar-clasico",
      title: "Combo Familiar Clasico",
      description: "3 hamburguesas clasicas + 2 hamburguesas bacon",
      price: 9990,
      image: comboFamiliarImg,
      imageAlt: "Combo familiar clasico",
      category: "combo-familiar",
      favorite: true,
    },
    {
      id: "combo-familiar-bacon",
      title: "Combo Familiar Bacon",
      description: "5 hamburguesas bacon",
      price: 10990,
      image: comboBaconLoversImg,
      imageAlt: "Combo familiar bacon",
      category: "combo-familiar",
    },
    {
      id: "combo-familiar-mix",
      title: "Combo Familiar Mix",
      description: "2 clasicas + 2 bacon + papas grandes",
      price: 10490,
      image: comboClasicasFullImg,
      imageAlt: "Combo familiar mix",
      category: "combo-familiar",
    },
  ];

  const burgerItems: MenuItem[] = products.map((product) => ({
    id: product.slug,
    title: product.name,
    description: product.description,
    price: parsePrice(product.price),
    image: product.image,
    imageAlt: product.imageAlt,
    category: "hamburguesas",
    badge: product.mostOrdered || product.tag === "Top ventas" ? product.tag : undefined,
    favorite: product.mostOrdered,
    removableIngredients:
      product.slug === "cs-bacon"
        ? ["Tocino", "Salsa BBQ", "Cebolla caramelizada", "Queso cheddar"]
        : product.slug === "cs-romp-ii"
          ? ["Huevo frito", "Tocino", "Cebolla caramelizada", "Salsa BBQ", "Queso cheddar"]
          : product.slug === "cs-clasica"
            ? ["Tomate", "Lechuga", "Aderezo", "Queso cheddar"]
            : product.slug === "cs-italiana"
              ? ["Palta", "Tomate", "Mayonesa", "Queso cheddar"]
              : ["Tocino", "Lechuga", "Tomate", "Cebolla morada", "Salsa", "Queso cheddar"],
  }));

  const sideItems: MenuItem[] = [
    {
      id: "papitas-fritas",
      title: "Papitas fritas",
      description: "El acompanamiento clasico para cualquier pedido.",
      price: 1490,
      image: comboClasicasFullImg,
      imageAlt: "Papitas fritas",
      category: "acompanamientos",
    },
    {
      id: "aros-de-cebolla",
      title: "Aros de cebolla",
      description: "En promo porque se viene proximamente.",
      price: 1990,
      image: comboBaconLoversImg,
      imageAlt: "Aros de cebolla",
      category: "acompanamientos",
      badge: "Proximamente",
    },
    {
      id: "nuggets",
      title: "Nuggets",
      description: "En promo porque se viene proximamente.",
      price: 2490,
      image: comboFamiliarImg,
      imageAlt: "Nuggets",
      category: "acompanamientos",
      badge: "Proximamente",
    },
    {
      id: "empanadas-de-queso",
      title: "Empanadas de queso",
      description: "En promo porque se viene proximamente.",
      price: 2290,
      image: comboClasicasFullImg,
      imageAlt: "Empanadas de queso",
      category: "acompanamientos",
      badge: "Proximamente",
    },
  ];

  const drinkItems: MenuItem[] = [
    {
      id: "bebida-mediana",
      title: "Bebida mediana",
      description: "Vaso mediano. Elige tu sabor al confirmar por WhatsApp si quieres cambiarlo.",
      price: 990,
      image: comboFamiliarImg,
      imageAlt: "Bebida mediana",
      category: "bebidas",
    },
    {
      id: "bebida-grande",
      title: "Bebida grande",
      description: "Vaso grande para quienes quieren mas bebida.",
      price: 1290,
      image: comboBaconLoversImg,
      imageAlt: "Bebida grande",
      category: "bebidas",
    },
  ];

  const sauceItems: MenuItem[] = [
    {
      id: "mayo-casera",
      title: "Mayo casera",
      description: "Extra para acompanar tu pedido.",
      price: 300,
      image: comboClasicasFullImg,
      imageAlt: "Mayo casera",
      category: "salsas",
    },
    {
      id: "ketchup",
      title: "Ketchup",
      description: "Extra para acompanar tu pedido.",
      price: 300,
      image: comboFamiliarImg,
      imageAlt: "Ketchup",
      category: "salsas",
    },
    {
      id: "mostaza",
      title: "Mostaza",
      description: "Extra para acompanar tu pedido.",
      price: 300,
      image: comboBaconLoversImg,
      imageAlt: "Mostaza",
      category: "salsas",
    },
    {
      id: "bbq",
      title: "BBQ",
      description: "Extra para acompanar tu pedido.",
      price: 500,
      image: comboBaconLoversImg,
      imageAlt: "BBQ",
      category: "salsas",
    },
    {
      id: "ajo",
      title: "Ajo",
      description: "Extra para acompanar tu pedido.",
      price: 500,
      image: comboFamiliarImg,
      imageAlt: "Ajo",
      category: "salsas",
    },
  ];

  const total = cart.reduce((sum, item) => sum + item.item.price * item.qty, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const menuTabs: { id: MenuTab; label: string }[] = [
    { id: "hamburguesas", label: "Hamburguesas" },
    { id: "acompanamientos", label: "Acompañamientos" },
    { id: "bebidas", label: "Bebidas" },
    { id: "salsas", label: "Salsas" },
  ];

  function openProductModal(item: MenuItem) {
    const defaults = Object.fromEntries(
      (item.options ?? []).map((group) => [group.id, ""])
    );
    setSelectedItem(item);
    setSelectedQty(1);
    setSelectedOptions(defaults);
    setSelectedUnitOptions(item.category === "combo-individual" ? [defaults] : []);
    setSelectedRemovals([]);
    setSelectedUnitRemovals(usesPerUnitRemovals(item) ? [[]] : []);
    setEditingCartItemId(null);
  }

  function openCartItemEditor(cartItem: CartItem) {
    const defaults = Object.fromEntries((cartItem.item.options ?? []).map((group) => [group.id, ""]));
    setSelectedItem(cartItem.item);
    setSelectedQty(cartItem.qty);
    setSelectedOptions(
      Object.keys(cartItem.selections).length ? cartItem.selections : defaults
    );
    setSelectedUnitOptions(cartItem.unitSelections ?? Array.from({ length: cartItem.qty }, () => ({ ...defaults })));
    setSelectedRemovals(cartItem.removals ?? []);
    setSelectedUnitRemovals(
      cartItem.unitRemovals ?? (usesPerUnitRemovals(cartItem.item) ? Array.from({ length: cartItem.qty }, () => []) : [])
    );
    setEditingCartItemId(cartItem.id);
    setIsCartOpen(false);
  }

  function closeProductModal() {
    setSelectedItem(null);
    setSelectedQty(1);
    setSelectedOptions({});
    setSelectedUnitOptions([]);
    setSelectedRemovals([]);
    setSelectedUnitRemovals([]);
    setEditingCartItemId(null);
  }

  function syncUnitOptions(nextQty: number) {
    if (!selectedItem) return;

    if (selectedItem.category === "combo-individual") {
      setSelectedUnitOptions((prev) => {
        const base =
          prev[0] ??
          Object.fromEntries((selectedItem.options ?? []).map((group) => [group.id, ""]));
        return Array.from({ length: nextQty }, (_, index) => prev[index] ?? { ...base });
      });
    }

    if (usesPerUnitRemovals(selectedItem)) {
      setSelectedUnitRemovals((prev) =>
        Array.from({ length: nextQty }, (_, index) => prev[index] ?? [])
      );
    }
  }

  function addSelectedItemToCart() {
    if (!selectedItem) return;
    const perUnitRemovalsEnabled = usesPerUnitRemovals(selectedItem);
    const normalizedSelections =
      selectedItem.category === "combo-individual" ? {} : selectedOptions;
    const normalizedUnitSelections =
      selectedItem.category === "combo-individual" ? selectedUnitOptions.slice(0, selectedQty) : undefined;
    const normalizedRemovals =
      perUnitRemovalsEnabled ? [] : selectedRemovals;
    const normalizedUnitRemovals =
      perUnitRemovalsEnabled ? selectedUnitRemovals.slice(0, selectedQty) : undefined;
    const signature = buildCartSignature(
      selectedItem.id,
      selectedItem.category === "combo-individual" || selectedItem.category === "hamburguesas"
        ? Object.fromEntries(
            Array.from({ length: selectedQty }, (_, index) => [
              `${selectedItem.category === "combo-individual" ? "combo" : "hamb"}-${index + 1}`,
              [
                ...(selectedItem.category === "combo-individual"
                  ? [
                      Object.entries(normalizedUnitSelections?.[index] ?? {})
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([key, value]) => `${key}:${value}`)
                        .join(","),
                    ]
                  : []),
                `sin:${(normalizedUnitRemovals?.[index] ?? []).join("/")}`,
              ].join(","),
            ])
          )
        : {
            ...normalizedSelections,
            sin: normalizedRemovals.join("/"),
          }
    );
    setCart((prev) => {
      if (editingCartItemId) {
        const withoutEditingItem = prev.filter((item) => item.id !== editingCartItemId);
        const mergeTarget = withoutEditingItem.find((item) => item.id === signature);
        if (mergeTarget) {
          return withoutEditingItem.map((item) =>
            item.id === signature ? { ...item, qty: item.qty + selectedQty } : item
          );
        }

        return [
          ...withoutEditingItem,
          {
            id: signature,
            item: selectedItem,
            qty: selectedQty,
            selections: normalizedSelections,
            unitSelections: normalizedUnitSelections,
            removals: normalizedRemovals,
            unitRemovals: normalizedUnitRemovals,
          },
        ];
      }

      const existing = prev.find((item) => item.id === signature);
      if (existing) {
        return prev.map((item) =>
          item.id === signature ? { ...item, qty: item.qty + selectedQty } : item
        );
      }

      return [
        ...prev,
        {
          id: signature,
          item: selectedItem,
          qty: selectedQty,
          selections: normalizedSelections,
          unitSelections: normalizedUnitSelections,
          removals: normalizedRemovals,
          unitRemovals: normalizedUnitRemovals,
        },
      ];
    });
    setCartFeedback({
      title: selectedItem.title,
      mode: editingCartItemId ? "edited" : "added",
    });
    closeProductModal();
  }

  function updateCartQty(cartId: string, nextQty: number) {
    if (nextQty <= 0) {
      setCart((prev) => prev.filter((item) => item.id !== cartId));
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== cartId) return item;

        if (item.unitSelections?.length) {
          const fallback = item.unitSelections[item.unitSelections.length - 1] ?? {};
          const nextUnitSelections =
            nextQty > item.unitSelections.length
              ? [
                  ...item.unitSelections,
                  ...Array.from({ length: nextQty - item.unitSelections.length }, () => ({ ...fallback })),
                ]
              : item.unitSelections.slice(0, nextQty);
          const fallbackRemovals = item.unitRemovals?.[item.unitRemovals.length - 1] ?? [];
          const nextUnitRemovals =
            nextQty > (item.unitRemovals?.length ?? 0)
              ? [
                  ...(item.unitRemovals ?? []),
                  ...Array.from({ length: nextQty - (item.unitRemovals?.length ?? 0) }, () => [...fallbackRemovals]),
                ]
              : item.unitRemovals?.slice(0, nextQty);

          return { ...item, qty: nextQty, unitSelections: nextUnitSelections, unitRemovals: nextUnitRemovals };
        }

        if (item.unitRemovals?.length) {
          const fallbackRemovals = item.unitRemovals[item.unitRemovals.length - 1] ?? [];
          const nextUnitRemovals =
            nextQty > item.unitRemovals.length
              ? [
                  ...item.unitRemovals,
                  ...Array.from({ length: nextQty - item.unitRemovals.length }, () => [...fallbackRemovals]),
                ]
              : item.unitRemovals.slice(0, nextQty);

          return { ...item, qty: nextQty, unitRemovals: nextUnitRemovals };
        }

        return { ...item, qty: nextQty };
      })
    );
  }

  function renderSelections(selections: Record<string, string>) {
    const entries = Object.entries(selections).filter(([, value]) => value);
    if (entries.length === 0) return null;

    return entries.map(([key, value]) => {
      const label = key === "bebida" ? "Bebida" : key === "salsa" ? "Salsa" : key;
      return (
        <div key={key} className="text-xs text-slate-500">
          {label}: {value}
        </div>
      );
    });
  }

  function renderUnitSelections(unitSelections?: Record<string, string>[]) {
    if (!unitSelections || unitSelections.length === 0) return null;

    return unitSelections.map((selection, index) => (
      <div key={`combo-${index + 1}`} className="mt-1 rounded-xl bg-slate-50 px-2 py-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Combo {index + 1}
        </div>
        {renderSelections(selection)}
      </div>
    ));
  }

  function renderUnitRemovals(unitRemovals: string[][] | undefined, label: string) {
    if (!unitRemovals?.length) return null;

    return unitRemovals.map((removals, index) =>
      removals.length ? (
        <div key={`${label}-removals-${index}`} className="text-xs text-slate-500">
          {label} {index + 1} sin: {removals.join(", ")}
        </div>
      ) : null
    );
  }

  function renderRemovals(removals?: string[]) {
    if (!removals || removals.length === 0) return null;
    return <div className="text-xs text-slate-500">Sin: {removals.join(", ")}</div>;
  }

  function toggleRemoval(removals: string[], ingredient: string) {
    return removals.includes(ingredient)
      ? removals.filter((item) => item !== ingredient)
      : [...removals, ingredient];
  }

  function hasAllRequiredSelections() {
    if (!selectedItem?.options?.length) return true;

    if (selectedItem.category === "combo-individual") {
      return selectedUnitOptions.length === selectedQty
        && selectedUnitOptions.every((selection) =>
          selectedItem.options?.every((group) => Boolean(selection[group.id]))
        );
    }

    return selectedItem.options.every((group) => Boolean(selectedOptions[group.id]));
  }

  function canEditCartItem(cartItem: CartItem) {
    return Boolean(cartItem.item.options?.length || cartItem.item.removableIngredients?.length);
  }

  function renderMenuCards(items: MenuItem[], hideDescription = false, columnsClassName = "grid-cols-2") {
    return (
      <div className={`grid gap-3 ${columnsClassName}`}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openProductModal(item)}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="relative aspect-square overflow-hidden">
              <img src={item.image} alt={item.imageAlt} className="h-full w-full object-cover" />
              {item.badge ? (
                <span className="absolute right-2 top-2 rounded-full bg-amber-100 px-1.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-amber-800">
                  {item.badge}
                </span>
              ) : null}
              {item.favorite ? (
                <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-1.5 py-1 text-[9px] font-semibold text-slate-900">
                  <StarIcon className="h-2.5 w-2.5 text-yellow-500" />
                  Favorito
                </span>
              ) : null}
            </div>
            <div className="p-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-semibold leading-tight text-slate-900">{item.title}</div>
                <div className="text-xs font-semibold text-red-700">${formatPrice(item.price)}</div>
              </div>
              {!hideDescription ? <p className="mt-1 text-xs leading-tight text-slate-600">{item.description}</p> : null}
            </div>
          </button>
        ))}
      </div>
    );
  }

  function sendOrderToWhatsApp() {
    const lines = ["Quiero hacer un pedido:"];
    lines.push(`Tipo: ${orderType === "delivery" ? "*Delivery*" : "*Retiro en local*"}`);
    if (orderType === "delivery") {
      lines.push(`Direccion: *${address}*`);
      lines.push("_Falta agregar el valor del envio/delivery_");
    }

    cart.forEach((cartItem) => {
      lines.push(`- ${cartItem.item.title} x *${cartItem.qty}* -- $${formatPrice(cartItem.item.price * cartItem.qty)}`);
      if (cartItem.unitSelections?.length) {
        cartItem.unitSelections.forEach((selection, index) => {
          lines.push(`  Combo ${index + 1}:`);
          Object.entries(selection).forEach(([key, value]) => {
            const label = key === "bebida" ? "Bebida" : key === "salsa" ? "Salsa" : key;
            lines.push(`  - ${label}: ${value}`);
          });
          if (cartItem.unitRemovals?.[index]?.length) {
            lines.push(`  - Sin: ${cartItem.unitRemovals[index].join(", ")}`);
          }
        });
      } else if (cartItem.item.category === "hamburguesas" && cartItem.unitRemovals?.length) {
        cartItem.unitRemovals.forEach((removals, index) => {
          if (removals.length) {
            lines.push(`  Hamburguesa ${index + 1} sin: ${removals.join(", ")}`);
          }
        });
      } else {
        Object.entries(cartItem.selections).forEach(([key, value]) => {
          const label = key === "bebida" ? "Bebida" : key === "salsa" ? "Salsa" : key;
          lines.push(`  ${label}: ${value}`);
        });
        if (cartItem.removals?.length) {
          lines.push(`  Sin: ${cartItem.removals.join(", ")}`);
        }
      }
    });

    lines.push(`Total: *$${formatPrice(total)}*`);
    const message = lines.join("\n");
    const phone = "56945568889";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-1.5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-700">Menu completo</p>
        <h3 className="text-2xl font-bold text-slate-900">Todos nuestros productos</h3>
        <p className="text-sm text-slate-600">Presiona cualquier producto para configurarlo y agregarlo al carrito.</p>
      </div>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold text-slate-900">Combos Individuales</h4>
          <span className="text-xs text-slate-500">Hamburguesa + Papitas + Bebida + Salsa</span>
        </div>
        <div className="-mx-3 overflow-x-auto px-3 pb-1">
          <div className="flex gap-3 snap-x snap-mandatory">
            {individualCombos.map((combo) => (
              <div key={combo.id} className="flex min-w-[160px] flex-col items-start">
                <button
                  type="button"
                  onClick={() => openProductModal(combo)}
                  className={`w-full aspect-square snap-start overflow-hidden rounded-xl bg-white shadow-md transition hover:scale-105 ${combo.favorite ? "border-2 border-yellow-400" : ""}`}
                >
                  <img src={combo.image} alt={combo.imageAlt} className="h-full w-full object-cover" />
                </button>
                <div className="mt-1.5 w-full">
                  <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                    {combo.title}
                    {combo.favorite ? <StarIcon className="h-3.5 w-3.5 text-yellow-400" /> : null}
                  </div>
                  <div className="text-[11px] leading-tight text-slate-500">{combo.description}</div>
                  <div className="mt-0.5 text-base font-bold text-slate-900">${formatPrice(combo.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold text-slate-900">Combos Familiares</h4>
          <span className="text-xs text-slate-500">Ideales para compartir</span>
        </div>
        <div className="-mx-3 overflow-x-auto px-3 pb-1">
          <div className="flex gap-3 snap-x snap-mandatory">
            {familyCombos.map((combo) => (
              <div key={combo.id} className="flex min-w-[160px] flex-col items-start">
                <button
                  type="button"
                  onClick={() => openProductModal(combo)}
                  className={`w-full aspect-square snap-start overflow-hidden rounded-xl bg-white shadow-md transition hover:scale-105 ${combo.favorite ? "border-2 border-yellow-400" : ""}`}
                >
                  <img src={combo.image} alt={combo.imageAlt} className="h-full w-full object-cover" />
                </button>
                <div className="mt-1.5 w-full">
                  <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                    {combo.title}
                    {combo.favorite ? <StarIcon className="h-3.5 w-3.5 text-yellow-400" /> : null}
                  </div>
                  <div className="text-[11px] leading-tight text-slate-500">{combo.description}</div>
                  <div className="mt-0.5 text-base font-bold text-slate-900">${formatPrice(combo.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <div className="-mx-3 overflow-x-auto px-3 pb-1">
          <div className="flex w-max gap-2">
            {menuTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveMenuTab(tab.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  activeMenuTab === tab.id ? "bg-red-700 text-white shadow-md" : "bg-white text-slate-700 ring-1 ring-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeMenuTab === "hamburguesas" ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-semibold text-slate-900">Hamburguesas Solas</h5>
              <span className="text-xs text-slate-500">Las 5 hamburguesas del menu anterior</span>
            </div>
            {renderMenuCards(burgerItems, true)}
          </div>
        ) : null}

        {activeMenuTab === "acompanamientos" ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-semibold text-slate-900">Acompañamientos</h5>
              <span className="text-xs text-slate-500">Para complementar tu pedido</span>
            </div>
            {renderMenuCards(sideItems)}
          </div>
        ) : null}

        {activeMenuTab === "bebidas" ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-semibold text-slate-900">Bebidas</h5>
              <span className="text-xs text-slate-500">Formatos disponibles</span>
            </div>
            {renderMenuCards(drinkItems)}
          </div>
        ) : null}

        {activeMenuTab === "salsas" ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-semibold text-slate-900">Salsas Extra</h5>
              <span className="text-xs text-slate-500">Elige tu favorita</span>
            </div>
            {renderMenuCards(sauceItems)}
          </div>
        ) : null}
      </section>

      {!isCartOpen ? (
        <div className="fixed bottom-6 right-4 z-50 sm:right-6">
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
            @keyframes cartPop {
              0% { transform: scale(1); }
              30% { transform: scale(1.12); }
              60% { transform: scale(0.96); }
              100% { transform: scale(1); }
            }
            @keyframes feedbackIn {
              0% { opacity: 0; transform: translateY(8px) scale(0.96); }
              15% { opacity: 1; transform: translateY(0) scale(1); }
              85% { opacity: 1; transform: translateY(0) scale(1); }
              100% { opacity: 0; transform: translateY(4px) scale(0.98); }
            }
          `}</style>
          {cartFeedback ? (
            <div
              className="mb-3 ml-auto w-max max-w-[220px] rounded-2xl bg-slate-900 px-3 py-2 text-right text-xs text-white shadow-xl"
              style={{ animation: "feedbackIn 1.8s ease forwards" }}
            >
              {cartFeedback.mode === "edited" ? "Producto actualizado" : "Producto agregado"}
              <div className="mt-0.5 truncate text-[11px] text-white/75">{cartFeedback.title}</div>
            </div>
          ) : null}
          <button
            aria-label="Abrir carrito"
            onClick={() => setIsCartOpen(true)}
            style={{
              animation: cartFeedback ? "cartPop 420ms ease-out 1" : "floatY 3s ease-in-out infinite",
              boxShadow: "0 0 12px 2px rgba(255,255,255,0.25)",
            }}
            className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-700 text-white shadow-2xl"
          >
            <ShoppingCartIcon className="relative z-10 h-7 w-7" />
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                animation: "shine 6s linear infinite",
                backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)",
                backgroundSize: "240px 100%",
                backgroundRepeat: "no-repeat",
                opacity: 0,
              }}
            />
            {totalCount > 0 ? (
              <span className="absolute right-1 top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold leading-none text-red-700 ring-2 ring-red-700">
                {totalCount}
              </span>
            ) : null}
          </button>
        </div>
      ) : null}

      {selectedItem ? (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeProductModal} />
          <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl">
            <button
              type="button"
              onClick={closeProductModal}
              className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-500"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="overflow-y-auto pr-1">
            <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
              <div className="overflow-hidden rounded-2xl">
                <img src={selectedItem.image} alt={selectedItem.imageAlt} className="h-full w-full object-cover" />
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.16em] text-red-700">
                    {selectedItem.category === "combo-individual" ? "Combo individual" : selectedItem.category === "combo-familiar" ? "Combo familiar" : "Producto"}
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-slate-900">{selectedItem.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{selectedItem.description}</p>
                  <div className="mt-3 text-xl font-bold text-slate-900">${formatPrice(selectedItem.price)}</div>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <span className="text-sm font-semibold text-slate-900">Cantidad</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedQty((qty) => {
                          const nextQty = Math.max(1, qty - 1);
                          syncUnitOptions(nextQty);
                          return nextQty;
                        })
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-red-700 shadow-sm ring-1 ring-slate-200"
                    >
                      -
                    </button>
                    <span className="min-w-8 text-center text-lg font-bold text-slate-900">{selectedQty}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedQty((qty) => {
                          const nextQty = qty + 1;
                          syncUnitOptions(nextQty);
                          return nextQty;
                        })
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-green-700 shadow-sm ring-1 ring-slate-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {selectedItem.category === "combo-individual" ? (
                  <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                    {Array.from({ length: selectedQty }).map((_, comboIndex) => (
                      <div key={`combo-config-${comboIndex + 1}`} className="rounded-2xl border border-slate-200 p-3">
                        <div className="mb-2 text-sm font-semibold text-slate-900">Combo {comboIndex + 1}</div>
                        {(selectedItem.options ?? []).map((group) => (
                          <div key={`${group.id}-${comboIndex}`} className="mt-3 space-y-2 first:mt-0">
                            <div className="text-sm font-medium text-slate-800">{group.label}</div>
                            <div className="flex flex-wrap gap-2">
                              {group.choices.map((choice) => (
                                <button
                                  key={`${choice}-${comboIndex}`}
                                  type="button"
                                  onClick={() =>
                                    setSelectedUnitOptions((prev) =>
                                      prev.map((selection, index) =>
                                        index === comboIndex ? { ...selection, [group.id]: choice } : selection
                                      )
                                    )
                                  }
                                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                                    selectedUnitOptions[comboIndex]?.[group.id] === choice
                                      ? "bg-red-700 text-white"
                                      : "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  {choice}
                                </button>
                              ))}
                            </div>
                            {!selectedUnitOptions[comboIndex]?.[group.id] ? (
                              <div className="text-xs text-red-600">Debes elegir una opcion.</div>
                            ) : null}
                          </div>
                        ))}
                        {selectedItem.removableIngredients?.length ? (
                          <div className="mt-3 space-y-2">
                            <div className="text-sm font-medium text-slate-800">Quitar ingredientes</div>
                            <div className="flex flex-wrap gap-2">
                              {selectedItem.removableIngredients.map((ingredient) => (
                                <button
                                  key={`${ingredient}-${comboIndex}`}
                                  type="button"
                                  onClick={() =>
                                    setSelectedUnitRemovals((prev) =>
                                      prev.map((removals, index) =>
                                        index === comboIndex ? toggleRemoval(removals, ingredient) : removals
                                      )
                                    )
                                  }
                                  className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition ${
                                    selectedUnitRemovals[comboIndex]?.includes(ingredient)
                                      ? "bg-slate-900 text-white"
                                      : "bg-slate-100 text-slate-700"
                                  }`}
                                >
                                  <XMarkIcon className="h-3.5 w-3.5" />
                                  Sin {ingredient}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : selectedItem.category === "hamburguesas" && selectedItem.removableIngredients?.length ? (
                  <div className="max-h-72 space-y-3 overflow-y-auto pr-1">
                    {Array.from({ length: selectedQty }).map((_, burgerIndex) => (
                      <div key={`burger-config-${burgerIndex + 1}`} className="rounded-2xl border border-slate-200 p-3">
                        <div className="mb-2 text-sm font-semibold text-slate-900">Hamburguesa {burgerIndex + 1}</div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-slate-800">Quitar ingredientes</div>
                          <div className="flex flex-wrap gap-2">
                            {(selectedItem.removableIngredients ?? []).map((ingredient) => (
                              <button
                                key={`${ingredient}-${burgerIndex}`}
                                type="button"
                                onClick={() =>
                                  setSelectedUnitRemovals((prev) =>
                                    prev.map((removals, index) =>
                                      index === burgerIndex ? toggleRemoval(removals, ingredient) : removals
                                    )
                                  )
                                }
                                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition ${
                                  selectedUnitRemovals[burgerIndex]?.includes(ingredient)
                                    ? "bg-slate-900 text-white"
                                    : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                <XMarkIcon className="h-3.5 w-3.5" />
                                Sin {ingredient}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    {(selectedItem.options ?? []).map((group) => (
                      <div key={group.id} className="space-y-2">
                        <div className="text-sm font-semibold text-slate-900">{group.label}</div>
                        <div className="flex flex-wrap gap-2">
                        {group.choices.map((choice) => (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => setSelectedOptions((prev) => ({ ...prev, [group.id]: choice }))}
                              className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                                selectedOptions[group.id] === choice ? "bg-red-700 text-white" : "bg-slate-100 text-slate-700"
                              }`}
                          >
                            {choice}
                          </button>
                        ))}
                      </div>
                      {!selectedOptions[group.id] ? (
                        <div className="text-xs text-red-600">Debes elegir una opcion.</div>
                      ) : null}
                    </div>
                  ))}
                  {selectedItem.removableIngredients?.length ? (
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-slate-900">Quitar ingredientes</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.removableIngredients.map((ingredient) => (
                            <button
                              key={ingredient}
                          type="button"
                          onClick={() => setSelectedRemovals((prev) => toggleRemoval(prev, ingredient))}
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition ${
                            selectedRemovals.includes(ingredient)
                              ? "bg-slate-900 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          <XMarkIcon className="h-3.5 w-3.5" />
                          Sin {ingredient}
                        </button>
                      ))}
                        </div>
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </div>
            </div>

            <div className="mt-4 flex justify-end border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={addSelectedItemToCart}
                disabled={!hasAllRequiredSelections()}
                className="rounded-full bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-50"
              >
                {editingCartItemId ? "Guardar cambios" : "Agregar al carrito"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isCartOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md rounded-t-3xl bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Tu carrito</h3>
                <p className="text-sm text-slate-500">Revisa lo que ya agregaste antes de pedir.</p>
              </div>
              <button className="text-sm text-slate-500" onClick={() => setIsCartOpen(false)}>Cerrar</button>
            </div>

            <div className="mt-4 max-h-56 space-y-3 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                  Tu carrito esta vacio.
                </div>
              ) : (
                cart.map((cartItem) => (
                  <div key={cartItem.id} className="rounded-2xl border border-slate-200 p-3">
                    <div className="flex items-start justify-between gap-3">
                      {canEditCartItem(cartItem) ? (
                        <button
                          type="button"
                          onClick={() => openCartItemEditor(cartItem)}
                          className="flex items-start gap-3 text-left"
                        >
                          <img src={cartItem.item.image} alt={cartItem.item.imageAlt} className="h-14 w-14 rounded-xl object-cover" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{cartItem.item.title}</div>
                            <div className="text-xs text-slate-500">
                              {cartItem.qty} x ${formatPrice(cartItem.item.price)}
                            </div>
                            <div className="mt-1 space-y-1">
                            {cartItem.unitSelections?.length
                              ? renderUnitSelections(cartItem.unitSelections)
                              : renderSelections(cartItem.selections)}
                            {cartItem.unitSelections?.length
                              ? renderUnitRemovals(cartItem.unitRemovals, "Combo")
                              : cartItem.item.category === "hamburguesas" && cartItem.unitRemovals?.length
                                ? renderUnitRemovals(cartItem.unitRemovals, "Hamburguesa")
                                : renderRemovals(cartItem.removals)}
                          </div>
                        </div>
                        </button>
                      ) : (
                        <div className="flex items-start gap-3">
                          <img src={cartItem.item.image} alt={cartItem.item.imageAlt} className="h-14 w-14 rounded-xl object-cover" />
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{cartItem.item.title}</div>
                            <div className="text-xs text-slate-500">
                              {cartItem.qty} x ${formatPrice(cartItem.item.price)}
                            </div>
                            <div className="mt-1 space-y-1">
                              {cartItem.unitSelections?.length
                                ? renderUnitSelections(cartItem.unitSelections)
                                : renderSelections(cartItem.selections)}
                              {cartItem.unitSelections?.length
                                ? cartItem.unitRemovals?.map((removals, index) =>
                                    removals.length ? (
                                      <div key={`unit-removals-${index}`} className="text-xs text-slate-500">
                                        Combo {index + 1} sin: {removals.join(", ")}
                                      </div>
                                    ) : null
                                  )
                                : renderRemovals(cartItem.removals)}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateCartQty(cartItem.id, cartItem.qty - 1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-red-700"
                        >
                          -
                        </button>
                        <span className="min-w-5 text-center text-sm font-semibold">{cartItem.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQty(cartItem.id, cartItem.qty + 1)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-green-700"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="text-sm font-medium text-slate-900">¿Como quieres tu pedido?</div>
              <div className="mt-2 flex items-center gap-4">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="orderType"
                    value="pickup"
                    checked={orderType === "pickup"}
                    onChange={() => setOrderType("pickup")}
                    className="h-4 w-4"
                  />
                  <span>Retiro en local</span>
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="orderType"
                    value="delivery"
                    checked={orderType === "delivery"}
                    onChange={() => setOrderType("delivery")}
                    className="h-4 w-4"
                  />
                  <span>Delivery</span>
                </label>
              </div>

              {orderType === "delivery" ? (
                <div className="mt-3">
                  <label className="text-xs text-slate-600">Direccion de entrega</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Calle, numero, referencia"
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  />
                </div>
              ) : null}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-slate-700">Total</div>
              <div className="text-lg font-bold text-slate-900">${formatPrice(total)}</div>
            </div>

            <div className="mt-4">
              <button
                type="button"
                disabled={cart.length === 0 || (orderType === "delivery" && address.trim() === "")}
                onClick={sendOrderToWhatsApp}
                className="w-full rounded-full bg-green-600 px-4 py-3 text-white disabled:opacity-50"
              >
                Pedir por WhatsApp
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
