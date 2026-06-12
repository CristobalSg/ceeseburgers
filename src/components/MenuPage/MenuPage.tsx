import {
  BanknotesIcon,
  BuildingStorefrontIcon,
  CheckCircleIcon,
  CreditCardIcon,
  MapPinIcon,
  ShoppingCartIcon,
  StarIcon,
  TruckIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { getClassicBurgerItems, getPremiumBurgerItems, sideItems as menuSideItems, sauceItems as menuSauceItems, menuTabs, trioCombos, classicCombos, premiumCombos, familyCombos, paperoCombos } from "./menuData";
import { formatPrice, buildCartSignature, usesPerUnitOptions, usesPerUnitRemovals } from "./menuUtils";
import { createOrder } from "@/services/orders";

import type { MenuItem, MenuTab, CartItem, ProductModalStep } from "./menuUtils";
import type { CreateOrderPayload, OrderItemPayload } from "@/services/orders";
import type { PointerEvent as ReactPointerEvent } from "react";

const WHATSAPP_PHONE = "56956270428";
const DELIVERY_ESTIMATE_MIN = 2000;
const DELIVERY_ESTIMATE_MAX = 2500;
const CASH_PAYMENT_STEPS = [1000, 2000, 5000, 10000];
const OPEN_DAYS = new Set([4, 5, 6]);
const OPEN_HOUR = 17;
const CLOSE_HOUR_AFTER_MIDNIGHT = 1;

function isBusinessOpen(date = new Date()) {
  const day = date.getDay();
  const hour = date.getHours();

  if (OPEN_DAYS.has(day) && hour >= OPEN_HOUR) {
    return true;
  }

  const previousDay = day === 0 ? 6 : day - 1;
  return OPEN_DAYS.has(previousDay) && hour < CLOSE_HOUR_AFTER_MIDNIGHT;
}

function shouldShowMenuScheduleNotice() {
  return !isBusinessOpen();
}

function appendCount(counter: Map<string, number>, value: string, amount = 1) {
  if (!value) return;
  counter.set(value, (counter.get(value) ?? 0) + amount);
}

function formatCountSummary(counter: Map<string, number>) {
  return Array.from(counter.entries())
    .map(([value, count]) => `${count} ${value}`)
    .join(" | ");
}

function formatIngredientName(ingredient: string) {
  return ingredient ? `${ingredient.charAt(0).toLowerCase()}${ingredient.slice(1)}` : ingredient;
}

function formatIngredientList(ingredients: string[]) {
  const normalized = ingredients.map(formatIngredientName);

  if (normalized.length <= 1) {
    return normalized[0] ?? "";
  }

  if (normalized.length === 2) {
    return `${normalized[0]} y ${normalized[1]}`;
  }

  return `${normalized.slice(0, -1).join(", ")} y ${normalized[normalized.length - 1]}`;
}

function buildGroupedSelectionLines(unitSelections: Record<string, string>[] | undefined, qtyFallback = 1) {
  if (!unitSelections?.length) return [];

  const groupedSelections = new Map<string, Map<string, number>>();

  unitSelections.forEach((selection) => {
    Object.entries(selection).forEach(([key, value]) => {
      if (!value) return;

      const optionCounts = groupedSelections.get(key) ?? new Map<string, number>();
      appendCount(optionCounts, value);
      groupedSelections.set(key, optionCounts);
    });
  });

  const lines: string[] = [];
  const bebidaCounts = groupedSelections.get("bebida");
  const salsaCounts = groupedSelections.get("salsa");

  if (bebidaCounts?.size) {
    lines.push(`Bebidas: ${formatCountSummary(bebidaCounts)}`);
  }

  if (salsaCounts?.size) {
    lines.push(`Salsas: ${formatCountSummary(salsaCounts)}`);
  }

  groupedSelections.forEach((counts, key) => {
    if (key === "bebida" || key === "salsa" || !counts.size) return;
    const label = `${key.charAt(0).toUpperCase()}${key.slice(1)}s`;
    lines.push(`${label}: ${formatCountSummary(counts)}`);
  });

  if (lines.length > 0) {
    return lines;
  }

  const fallbackSelections = unitSelections[0];
  return Object.entries(fallbackSelections)
    .filter(([, value]) => value)
    .map(([key, value]) => {
      const label = key === "bebida" ? "Bebidas" : key === "salsa" ? "Salsas" : `${key.charAt(0).toUpperCase()}${key.slice(1)}s`;
      return `${label}: ${qtyFallback} ${value}`;
    });
}

function buildSelectionLines(cartItem: CartItem) {
  if (cartItem.unitSelections?.length) {
    return buildGroupedSelectionLines(cartItem.unitSelections, cartItem.qty);
  }

  const repeatedSelections = Array.from({ length: cartItem.qty }, () => ({ ...cartItem.selections }));
  return buildGroupedSelectionLines(repeatedSelections, cartItem.qty);
}

function collectCartSelectionCounts(cartItems: CartItem[]) {
  const groupedSelections = new Map<string, Map<string, number>>();

  cartItems.forEach((cartItem) => {
    const selectionUnits = cartItem.unitSelections?.length
      ? cartItem.unitSelections
      : Array.from({ length: cartItem.qty }, () => ({ ...cartItem.selections }));

    selectionUnits.forEach((selection) => {
      Object.entries(selection).forEach(([key, value]) => {
        if (!value) return;

        const optionCounts = groupedSelections.get(key) ?? new Map<string, number>();
        appendCount(optionCounts, value);
        groupedSelections.set(key, optionCounts);
      });
    });
  });

  return groupedSelections;
}

function buildAddOnsSummaryLines(cartItems: CartItem[]) {
  const lines: string[] = [];
  const papitasQty = cartItems
    .filter((cartItem) => cartItem.item.id === "papitas-fritas")
    .reduce((sum, cartItem) => sum + cartItem.qty, 0);
  const groupedSelections = collectCartSelectionCounts(cartItems);
  const bebidaCounts = groupedSelections.get("bebida");
  const salsaCounts = groupedSelections.get("salsa");

  if (papitasQty > 0) {
    lines.push(`Papitas extra: ${papitasQty}`);
  }

  if (bebidaCounts?.size) {
    lines.push(`Bebidas: ${formatCountSummary(bebidaCounts)}`);
  }

  if (salsaCounts?.size) {
    lines.push(`Salsas: ${formatCountSummary(salsaCounts)}`);
  }

  return lines;
}

function getRemovalUnitLabels(item: MenuItem, qty: number) {
  if (item.removalUnitLabels?.length) {
    return Array.from({ length: qty }).flatMap((_, comboIndex) =>
      item.removalUnitLabels!.map((label) =>
        qty > 1 ? `Combo ${comboIndex + 1} - ${label}` : label
      )
    );
  }

  const unitLabel =
    item.category === "combo-individual"
      ? "Combo"
      : item.category === "hamburguesas"
        ? "Hamburguesa"
        : "Unidad";

  return Array.from({ length: qty }, (_, index) => `${unitLabel} ${index + 1}`);
}

function getRemovalIngredientsForUnit(item: MenuItem, unitIndex: number) {
  return item.removalUnitIngredients?.[unitIndex] ?? item.removableIngredients ?? [];
}

function getOptionUnitLabel(item: MenuItem, index: number) {
  if (item.category === "combo-individual") return `Combo ${index + 1}`;
  if (item.id === "bebida") return `Bebida ${index + 1}`;
  return `Unidad ${index + 1}`;
}

function buildGroupedRemovalLines(cartItem: CartItem) {
  if (cartItem.unitRemovals?.length) {
    if (cartItem.item.removalUnitLabels?.length) {
      const labels = getRemovalUnitLabels(cartItem.item, cartItem.qty);
      return labels.map((label, index) =>
        cartItem.unitRemovals?.[index]?.length
          ? `* ${label} sin ${formatIngredientList(cartItem.unitRemovals[index])}`
          : `* ${label}: normal`
      );
    }

    const groupedRemovals = new Map<string, { count: number; removals: string[] }>();

    cartItem.unitRemovals.forEach((removals) => {
      if (!removals.length) return;

      const normalizedRemovals = [...removals].sort((a, b) => a.localeCompare(b, "es"));
      const signature = normalizedRemovals.join("|");
      const existing = groupedRemovals.get(signature);

      if (existing) {
        existing.count += 1;
        return;
      }

      groupedRemovals.set(signature, { count: 1, removals: normalizedRemovals });
    });

    if (!groupedRemovals.size) return [];

    const unitLabel =
      cartItem.item.category === "combo-individual" || cartItem.item.category === "hamburguesas"
        ? "hamburguesa"
        : "unidad";

    return Array.from(groupedRemovals.values()).map(
      ({ count, removals }) =>
        `* ${count} ${unitLabel}${count > 1 ? "s" : ""} sin ${formatIngredientList(removals)}`
    );
  }

  if (!cartItem.removals?.length) return [];

  const prefix = cartItem.qty > 1 ? `* ${cartItem.qty} unidades sin ` : "* Sin ";
  return [`${prefix}${formatIngredientList(cartItem.removals)}`];
}

function buildCashPaymentSuggestions(total: number) {
  if (total <= 0) return [];

  return Array.from(
    new Set(
      CASH_PAYMENT_STEPS.map((step) => Math.ceil(total / step) * step)
        .filter((amount) => amount > total)
        .sort((a, b) => a - b)
    )
  ).slice(0, 4);
}

export function MenuPage() {
  const featuredCarouselRef = useRef<HTMLDivElement>(null);
  const cashPaymentSectionRef = useRef<HTMLDivElement>(null);
  const featuredCarouselPausedUntilRef = useRef(0);
  const featuredDragStartXRef = useRef(0);
  const featuredDragScrollLeftRef = useRef(0);
  const isFeaturedCarouselDraggingRef = useRef(false);
  const didFeaturedCarouselDragRef = useRef(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderDetailOpen, setIsOrderDetailOpen] = useState(false);
  const [isMenuPopupOpen, setIsMenuPopupOpen] = useState(shouldShowMenuScheduleNotice);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [selectedUnitOptions, setSelectedUnitOptions] = useState<Record<string, string>[]>([]);
  const [selectedRemovals, setSelectedRemovals] = useState<string[]>([]);
  const [selectedUnitRemovals, setSelectedUnitRemovals] = useState<string[][]>([]);
  const [editingCartItemId, setEditingCartItemId] = useState<string | null>(null);
  const [productModalStep, setProductModalStep] = useState<ProductModalStep>("quantity");
  const [activeComboOptionIndex, setActiveComboOptionIndex] = useState(0);
  const [cartFeedback, setCartFeedback] = useState<{ title: string; mode: "added" | "edited" } | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderName, setOrderName] = useState("");
  const [orderType, setOrderType] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "cash" | "">("");
  const [cashPaymentType, setCashPaymentType] = useState<"exact" | "amount">("exact");
  const [cashAmount, setCashAmount] = useState("");
  const [showAdvancedCashPayment, setShowAdvancedCashPayment] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState<MenuTab>("hamburguesas");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [orderError, setOrderError] = useState("");

  useEffect(() => {
    const hasOpenModal = isCartOpen || isMenuPopupOpen || selectedItem !== null;
    const previousOverflow = document.body.style.overflow;

    if (hasOpenModal) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isCartOpen, isMenuPopupOpen, selectedItem]);

  useEffect(() => {
    if (!cartFeedback) return;

    const timeoutId = window.setTimeout(() => {
      setCartFeedback(null);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [cartFeedback]);

  useEffect(() => {
    if (productModalStep !== "options" || !selectedItem || !usesPerUnitOptions(selectedItem)) return;

    const nextElement = document.getElementById(`combo-config-${activeComboOptionIndex + 1}`);
    nextElement?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeComboOptionIndex, productModalStep, selectedItem]);

  useEffect(() => {
    if (paymentMethod !== "cash") return;

    const timeoutId = window.setTimeout(() => {
      cashPaymentSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);

    return () => window.clearTimeout(timeoutId);
  }, [paymentMethod]);

  useEffect(() => {
    const carousel = featuredCarouselRef.current;
    if (!carousel) return;

    const intervalId = window.setInterval(() => {
      if (performance.now() < featuredCarouselPausedUntilRef.current) return;

      const track = carousel.firstElementChild;
      const firstRepeatedItem = track?.children[track.children.length / 2] as HTMLElement | undefined;
      if (!firstRepeatedItem) return;

      if (carousel.scrollLeft >= firstRepeatedItem.offsetLeft) {
        carousel.scrollLeft -= firstRepeatedItem.offsetLeft;
      }

      carousel.scrollLeft += 1;
    }, 20);

    return () => window.clearInterval(intervalId);
  }, []);

  const classicBurgerItems = getClassicBurgerItems();
  const premiumBurgerItems = getPremiumBurgerItems();
  const featuredItems = [
    trioCombos.find((item) => item.id === "trio-premiun"),
    familyCombos.find((item) => item.id === "combo-familiar"),
    premiumCombos.find((item) => item.id === "combo-smoke-criminal-xl"),
    classicCombos.find((item) => item.id === "combo-bacon"),
    paperoCombos.find((item) => item.id === "combo-papero-cs-italiana"),
  ].filter((item): item is MenuItem => Boolean(item));
  const featuredLoopItems = [...featuredItems, ...featuredItems];
  const sideItems = menuSideItems;
  const sauceItems = menuSauceItems;

  const subtotal = cart.reduce((sum, item) => sum + item.item.price * item.qty, 0);
  const deliveryFee = orderType === "delivery" ? DELIVERY_ESTIMATE_MAX : 0;
  const total = subtotal + deliveryFee;
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cashPaymentSuggestions = buildCashPaymentSuggestions(total);
  const normalizedCashAmount = Number(cashAmount.replace(/\D/g, ""));
  const hasValidPayment =
    paymentMethod === "transfer"
    || (paymentMethod === "cash"
      && (cashPaymentType === "exact" || normalizedCashAmount >= total));

  function pauseFeaturedCarousel() {
    featuredCarouselPausedUntilRef.current = performance.now() + 2000;
  }

  function openCart() {
    setIsOrderDetailOpen(false);
    setIsCartOpen(true);
  }

  function startFeaturedCarouselDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const carousel = featuredCarouselRef.current;
    if (!carousel) return;

    pauseFeaturedCarousel();
    isFeaturedCarouselDraggingRef.current = true;
    didFeaturedCarouselDragRef.current = false;
    featuredDragStartXRef.current = event.clientX;
    featuredDragScrollLeftRef.current = carousel.scrollLeft;
    carousel.setPointerCapture(event.pointerId);
  }

  function moveFeaturedCarouselDrag(event: ReactPointerEvent<HTMLDivElement>) {
    const carousel = featuredCarouselRef.current;
    if (!carousel || !isFeaturedCarouselDraggingRef.current) return;

    const distance = event.clientX - featuredDragStartXRef.current;
    if (Math.abs(distance) > 4) {
      didFeaturedCarouselDragRef.current = true;
    }

    carousel.scrollLeft = featuredDragScrollLeftRef.current - distance;
    pauseFeaturedCarousel();
  }

  function stopFeaturedCarouselDrag(event: ReactPointerEvent<HTMLDivElement>) {
    isFeaturedCarouselDraggingRef.current = false;
    pauseFeaturedCarousel();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  function renderMenuTabButton(tab: (typeof menuTabs)[number]) {
    const isActive = activeMenuTab === tab.id;

    return (
      <button
        key={tab.id}
        type="button"
        onClick={() => setActiveMenuTab(tab.id)}
        className={`group inline-flex w-[45vw] min-w-[144px] max-w-[170px] shrink-0 items-center gap-2 rounded-[20px] border px-2.5 py-2.5 text-left transition duration-200 ${
          isActive
            ? "border-slate-900 bg-slate-900 text-white shadow-xl shadow-slate-900/20"
            : "border-slate-200 bg-white text-slate-800 shadow-sm shadow-slate-200/70 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
        }`}
      >
        <span
          className={`inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-xl ring-1 ${
            isActive ? "bg-white/15 ring-white/25" : "bg-slate-100 ring-black/5"
          }`}
        >
          <img src={tab.icon} alt={tab.iconAlt} className="h-full w-full object-cover" />
        </span>
        <span className="min-w-0">
          <span className="block whitespace-nowrap text-[11px] font-bold leading-tight tracking-tight sm:text-sm">{tab.label}</span>
        </span>
      </button>
    );
  }

  function openProductModal(item: MenuItem) {
    const defaults = Object.fromEntries(
      (item.options ?? []).map((group) => [group.id, ""])
    );
    setSelectedItem(item);
    setSelectedQty(1);
    setSelectedOptions(defaults);
    setSelectedUnitOptions(usesPerUnitOptions(item) ? [defaults] : []);
    setSelectedRemovals([]);
    setSelectedUnitRemovals(usesPerUnitRemovals(item) ? getRemovalUnitLabels(item, 1).map(() => []) : []);
    setEditingCartItemId(null);
    setProductModalStep("quantity");
    setActiveComboOptionIndex(0);
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
      cartItem.unitRemovals ?? (usesPerUnitRemovals(cartItem.item) ? getRemovalUnitLabels(cartItem.item, cartItem.qty).map(() => []) : [])
    );
    setEditingCartItemId(cartItem.id);
    setProductModalStep("quantity");
    setActiveComboOptionIndex(0);
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
    setProductModalStep("quantity");
    setActiveComboOptionIndex(0);
  }

  function syncUnitOptions(nextQty: number) {
    if (!selectedItem) return;

    setActiveComboOptionIndex((prev) => Math.min(prev, Math.max(0, nextQty - 1)));

    if (usesPerUnitOptions(selectedItem)) {
      setSelectedUnitOptions((prev) => {
        const base =
          prev[0] ??
          Object.fromEntries((selectedItem.options ?? []).map((group) => [group.id, ""]));
        return Array.from({ length: nextQty }, (_, index) => prev[index] ?? { ...base });
      });
    }

    if (usesPerUnitRemovals(selectedItem)) {
      const nextRemovalCount = getRemovalUnitLabels(selectedItem, nextQty).length;
      setSelectedUnitRemovals((prev) =>
        Array.from({ length: nextRemovalCount }, (_, index) => prev[index] ?? [])
      );
    }
  }

  function addSelectedItemToCart() {
    if (!selectedItem) return;
    const perUnitOptionsEnabled = usesPerUnitOptions(selectedItem);
    const perUnitRemovalsEnabled = usesPerUnitRemovals(selectedItem);
    const normalizedSelections =
      perUnitOptionsEnabled ? {} : selectedOptions;
    const normalizedUnitSelections =
      perUnitOptionsEnabled ? selectedUnitOptions.slice(0, selectedQty) : undefined;
    const normalizedRemovals =
      perUnitRemovalsEnabled ? [] : selectedRemovals;
    const normalizedUnitRemovals =
      perUnitRemovalsEnabled ? selectedUnitRemovals.slice(0, getRemovalUnitLabels(selectedItem, selectedQty).length) : undefined;
    const removalUnitLabels = getRemovalUnitLabels(selectedItem, selectedQty);
    const unitSignatureCount = Math.max(
      perUnitOptionsEnabled ? selectedQty : 0,
      perUnitRemovalsEnabled ? removalUnitLabels.length : 0
    );
    const signature = buildCartSignature(
      selectedItem.id,
      perUnitOptionsEnabled || perUnitRemovalsEnabled
        ? Object.fromEntries(
            Array.from({ length: unitSignatureCount }, (_, index) => [
              `unit-${index + 1}`,
              [
                ...(perUnitOptionsEnabled
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
            item.id === signature
              ? {
                  ...item,
                  qty: item.qty + selectedQty,
                  unitSelections:
                    item.unitSelections || normalizedUnitSelections
                      ? [...(item.unitSelections ?? []), ...(normalizedUnitSelections ?? [])]
                      : undefined,
                  unitRemovals:
                    item.unitRemovals || normalizedUnitRemovals
                      ? [...(item.unitRemovals ?? []), ...(normalizedUnitRemovals ?? [])]
                      : undefined,
                }
              : item
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
          item.id === signature
            ? {
                ...item,
                qty: item.qty + selectedQty,
                unitSelections:
                  item.unitSelections || normalizedUnitSelections
                    ? [...(item.unitSelections ?? []), ...(normalizedUnitSelections ?? [])]
                    : undefined,
                unitRemovals:
                  item.unitRemovals || normalizedUnitRemovals
                    ? [...(item.unitRemovals ?? []), ...(normalizedUnitRemovals ?? [])]
                    : undefined,
              }
            : item
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
          const nextRemovalCount = getRemovalUnitLabels(item.item, nextQty).length;
          const nextUnitRemovals =
            nextRemovalCount > (item.unitRemovals?.length ?? 0)
              ? [
                  ...(item.unitRemovals ?? []),
                  ...Array.from({ length: nextRemovalCount - (item.unitRemovals?.length ?? 0) }, () => [...fallbackRemovals]),
                ]
              : item.unitRemovals?.slice(0, nextRemovalCount);

          return { ...item, qty: nextQty, unitSelections: nextUnitSelections, unitRemovals: nextUnitRemovals };
        }

        if (item.unitRemovals?.length) {
          const nextRemovalCount = getRemovalUnitLabels(item.item, nextQty).length;
          const fallbackRemovals = item.item.removalUnitLabels?.length ? [] : item.unitRemovals[item.unitRemovals.length - 1] ?? [];
          const nextUnitRemovals =
            nextRemovalCount > item.unitRemovals.length
              ? [
                  ...item.unitRemovals,
                  ...Array.from({ length: nextRemovalCount - item.unitRemovals.length }, () => [...fallbackRemovals]),
                ]
              : item.unitRemovals.slice(0, nextRemovalCount);

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

  function renderUnitSelections(unitSelections?: Record<string, string>[], item?: MenuItem) {
    if (!unitSelections || unitSelections.length === 0) return null;

    return unitSelections.map((selection, index) => (
      <div key={`combo-${index + 1}`} className="mt-1 rounded-xl bg-slate-50 px-2 py-1">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          {item ? getOptionUnitLabel(item, index) : `Combo ${index + 1}`}
        </div>
        {renderSelections(selection)}
      </div>
    ));
  }

  function renderUnitRemovals(unitRemovals: string[][] | undefined, label: string, labels?: string[]) {
    if (!unitRemovals?.length) return null;

    return unitRemovals.map((removals, index) =>
      removals.length ? (
        <div key={`${label}-removals-${index}`} className="text-xs text-slate-500">
          {labels?.[index] ?? `${label} ${index + 1}`} sin: {removals.join(", ")}
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

    if (usesPerUnitOptions(selectedItem)) {
      return selectedUnitOptions.length === selectedQty
        && selectedUnitOptions.every((selection) =>
          selectedItem.options?.every((group) => Boolean(selection[group.id]))
        );
    }

    return selectedItem.options.every((group) => Boolean(selectedOptions[group.id]));
  }

  function hasOptionsStep(item: MenuItem) {
    return Boolean(item.options?.length);
  }

  function hasRemovalsStep(item: MenuItem) {
    return Boolean(item.removableIngredients?.length || item.removalUnitIngredients?.some((ingredients) => ingredients.length));
  }

  function getProductModalSteps(item: MenuItem): ProductModalStep[] {
    const steps: ProductModalStep[] = ["quantity"];
    if (hasOptionsStep(item)) steps.push("options");
    if (hasRemovalsStep(item)) steps.push("removals");
    return steps;
  }

  function getNextProductStep(item: MenuItem, currentStep: ProductModalStep) {
    const steps = getProductModalSteps(item);
    const currentIndex = steps.indexOf(currentStep);
    return steps[currentIndex + 1] ?? null;
  }

  function getPreviousProductStep(item: MenuItem, currentStep: ProductModalStep) {
    const steps = getProductModalSteps(item);
    const currentIndex = steps.indexOf(currentStep);
    return steps[currentIndex - 1] ?? null;
  }

  function canEditCartItem(cartItem: CartItem) {
    return Boolean(
      cartItem.item.options?.length
      || cartItem.item.removableIngredients?.length
      || cartItem.item.removalUnitIngredients?.some((ingredients) => ingredients.length)
    );
  }

  function isUnitSelectionComplete(item: MenuItem, selection: Record<string, string>) {
    return (item.options ?? []).every((group) => Boolean(selection[group.id]));
  }

  function handleComboUnitOptionSelect(comboIndex: number, groupId: string, choice: string) {
    if (!selectedItem || !usesPerUnitOptions(selectedItem)) return;

    setSelectedUnitOptions((prev) => {
      const nextSelections = prev.map((selection, index) =>
        index === comboIndex ? { ...selection, [groupId]: choice } : selection
      );

      if (
        isUnitSelectionComplete(selectedItem, nextSelections[comboIndex] ?? {})
        && comboIndex < selectedQty - 1
      ) {
        setActiveComboOptionIndex(comboIndex + 1);
      }

      return nextSelections;
    });
  }

  function renderMenuCards(items: MenuItem[], hideDescription = false, columnsClassName = "grid-cols-2") {
    return (
      <div className={`grid gap-3 ${columnsClassName}`}>
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => (item.badge === "Proximamente" ? undefined : openProductModal(item))}
            disabled={item.badge === "Proximamente"}
            className={`overflow-hidden rounded-xl border text-left shadow-sm transition-transform duration-200 ${
              item.badge === "Proximamente"
                ? "border-slate-300 bg-slate-100 text-slate-500 opacity-90 grayscale"
                : item.badge === "Nuevo"
                ? "border-red-700 bg-red-50 shadow-lg shadow-red-950/10 ring-1 ring-red-200 hover:scale-[1.02]"
                : "border-slate-200 bg-white hover:scale-[1.02]"
            }`}
          >
            {item.image ? (
              <div className="relative aspect-square overflow-hidden">
                <img src={item.image} alt={item.imageAlt} className="h-full w-full object-cover" />
                {item.badge ? (
                  <span className={`absolute right-2 top-2 rounded-full px-1.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] ${
                    item.badge === "Nuevo"
                      ? "bg-red-700 text-white shadow-md shadow-red-950/20"
                      : "bg-amber-100 text-amber-800"
                  }`}>
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
            ) : (
              <div className="relative flex aspect-square items-center justify-center bg-slate-200">
                {item.badge ? (
                  <span className="rounded-full bg-slate-300 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-600">
                    {item.badge}
                  </span>
                ) : null}
              </div>
            )}
            <div className="p-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-semibold leading-tight text-slate-900">{item.title}</div>
                {item.price > 0 ? (
                  <div className="text-xs font-semibold text-red-700">${formatPrice(item.price)}</div>
                ) : null}
              </div>
              {!hideDescription ? <p className="mt-1 text-xs leading-tight text-slate-600">{item.description}</p> : null}
            </div>
          </button>
        ))}
      </div>
    );
  }

  function renderBurgerCards(items: MenuItem[]) {
    return (
      <div className="grid gap-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openProductModal(item)}
            className={`group relative grid h-[136px] grid-cols-[136px_minmax(0,1fr)] overflow-hidden rounded-2xl border bg-white text-left shadow-md shadow-slate-950/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-xl ${
              item.badge === "Nuevo"
                ? "border-red-200 ring-1 ring-red-100"
                : item.favorite
                  ? "border-yellow-300 ring-1 ring-yellow-100"
                  : "border-slate-200"
            }`}
          >
            <div className="relative aspect-square h-full overflow-hidden border-r border-slate-100 bg-slate-100">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : null}
              {item.badge || item.favorite ? (
                <span
                  className={`absolute left-1.5 top-1.5 inline-flex max-w-[calc(100%-0.75rem)] items-center gap-1 rounded-full px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wide shadow-sm ${
                    item.badge === "Nuevo"
                      ? "bg-red-700 text-white"
                      : "bg-white/95 text-slate-950"
                  }`}
                >
                  {item.favorite ? <StarIcon className="h-2.5 w-2.5 shrink-0 text-yellow-400" /> : null}
                  {item.badge ?? "Favorita"}
                </span>
              ) : null}
            </div>
            <div className="flex min-w-0 flex-col justify-center px-3.5 py-3">
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h6 className="text-base font-black leading-tight text-slate-950">{item.title}</h6>
                  <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-sm font-black text-red-700 ring-1 ring-red-100">
                    ${formatPrice(item.price)}
                  </span>
                </div>
                <p className="mt-1.5 overflow-hidden text-xs font-medium leading-[1.15rem] text-slate-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                  {item.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  }

  function buildWhatsAppOrderMessage() {
    const lines = ["Quiero hacer un pedido:"];
    lines.push(`Nombre: *${orderName.trim()}*`);
    lines.push(`Tipo: ${orderType === "delivery" ? "*Delivery*" : "*Retiro en local*"}`);
    if (orderType === "delivery") {
      lines.push(`Dirección: *${address}*`);
      lines.push(
        `Delivery estimado: *$${formatPrice(DELIVERY_ESTIMATE_MIN)} a $${formatPrice(DELIVERY_ESTIMATE_MAX)}*`
      );
    }
    lines.push(`Pago: *${paymentMethod === "transfer" ? "Transferencia" : "Efectivo"}*`);
    if (paymentMethod === "cash") {
      lines.push(
        cashPaymentType === "exact"
          ? "Efectivo: *justo*"
          : `Paga con: *$${formatPrice(normalizedCashAmount)}*`
      );
    }

    if (cart.length) {
      lines.push("");
    }

    cart.forEach((cartItem) => {
      lines.push(
        `*${cartItem.item.title} x${cartItem.qty}* — $${formatPrice(cartItem.item.price * cartItem.qty)}`
      );

      buildSelectionLines(cartItem).forEach((line) => lines.push(line));

      const removalLines = buildGroupedRemovalLines(cartItem);
      if (removalLines.length) {
        lines.push("*Modificaciones:*");
        removalLines.forEach((line) => lines.push(line));
      }

      lines.push("");
    });

    if (lines[lines.length - 1] === "") {
      lines.pop();
    }

    const addOnsSummaryLines = buildAddOnsSummaryLines(cart);
    if (addOnsSummaryLines.length) {
      lines.push("");
      lines.push("*Resumen de agregados:*");
      addOnsSummaryLines.forEach((line) => lines.push(line));
    }

    lines.push("");
    lines.push(`Subtotal: *$${formatPrice(subtotal)}*`);
    lines.push(`Total: *$${formatPrice(total)}*`);
    return lines.join("\n");
  }

  function buildOrderItemsPayload(): OrderItemPayload[] {
    return cart.map((cartItem) => {
      const selectionLines = buildSelectionLines(cartItem);
      const removalLines = buildGroupedRemovalLines(cartItem);

      return {
        cartId: cartItem.id,
        productId: cartItem.item.id,
        title: cartItem.item.title,
        category: cartItem.item.category,
        unitPrice: cartItem.item.price,
        quantity: cartItem.qty,
        lineTotal: cartItem.item.price * cartItem.qty,
        selections: cartItem.selections,
        unitSelections: cartItem.unitSelections ?? [],
        removals: cartItem.removals ?? [],
        unitRemovals: cartItem.unitRemovals ?? [],
        notes: [...selectionLines, ...removalLines],
      };
    });
  }

  function buildOrderPayload(whatsappMessage: string): CreateOrderPayload | null {
    if (paymentMethod === "") return null;

    return {
      customerName: orderName.trim(),
      orderType,
      address: orderType === "delivery" ? address.trim() : null,
      paymentMethod,
      cashPaymentType: paymentMethod === "cash" ? cashPaymentType : null,
      cashAmount: paymentMethod === "cash" && cashPaymentType === "amount" ? normalizedCashAmount : null,
      subtotal,
      deliveryFee,
      deliveryEstimateMin: orderType === "delivery" ? DELIVERY_ESTIMATE_MIN : null,
      deliveryEstimateMax: orderType === "delivery" ? DELIVERY_ESTIMATE_MAX : null,
      total,
      totalItems: totalCount,
      whatsappMessage,
      items: buildOrderItemsPayload(),
      metadata: {
        source: "react-vite-frontend",
        userAgent: window.navigator.userAgent,
      },
    };
  }

  async function submitOrder() {
    if (
      cart.length === 0
      || orderName.trim() === ""
      || !hasValidPayment
      || (orderType === "delivery" && address.trim() === "")
      || isSubmittingOrder
    ) {
      return;
    }

    const whatsappMessage = buildWhatsAppOrderMessage();
    const orderPayload = buildOrderPayload(whatsappMessage);
    if (!orderPayload) return;

    setIsSubmittingOrder(true);
    setOrderError("");

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;
    const whatsappWindow = window.open("", "_blank");

    try {
      await createOrder(orderPayload);
      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappUrl;
      } else {
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error(error);
      whatsappWindow?.close();
      setOrderError("No pudimos guardar el pedido. Revisa tu conexion e intenta nuevamente.");
    } finally {
      setIsSubmittingOrder(false);
    }
  }

  return (
    <section className="space-y-4">
      <div className="grid gap-1.5 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-700">Menu completo</p>
        <h3 className="text-2xl font-bold text-slate-900">Todos nuestros productos</h3>
        <p className="text-sm text-slate-600">Presiona cualquier producto para configurarlo y agregarlo al carrito.</p>
      </div>

      <section className="-mx-3 space-y-3 border-y border-red-100 bg-white px-3 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h4 className="text-lg font-black uppercase tracking-wide text-slate-950">Destacados</h4>
            <p className="text-xs font-semibold text-slate-600">Los favoritos para pedir rapido</p>
          </div>
          <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-black uppercase tracking-wide text-white shadow-sm">
            Top picks
          </span>
        </div>
        <div
          ref={featuredCarouselRef}
          onPointerDown={startFeaturedCarouselDrag}
          onPointerMove={moveFeaturedCarouselDrag}
          onPointerUp={stopFeaturedCarouselDrag}
          onPointerCancel={stopFeaturedCarouselDrag}
          onWheel={pauseFeaturedCarousel}
          className="cursor-grab touch-pan-y overflow-x-auto pb-1 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max gap-3">
            {featuredLoopItems.map((combo, index) => (
              <div key={`${combo.id}-${index}`} className="flex w-[190px] shrink-0 flex-col items-start">
                <button
                  type="button"
                  onClick={() => {
                    if (didFeaturedCarouselDragRef.current) {
                      didFeaturedCarouselDragRef.current = false;
                      return;
                    }
                    openProductModal(combo);
                  }}
                  className="relative w-full aspect-square overflow-hidden rounded-xl border-2 border-red-700 bg-white shadow-lg shadow-red-950/10 transition hover:scale-105"
                >
                  <img src={combo.image} alt={combo.imageAlt} className="h-full w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded-full bg-slate-950 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                    Destacado
                  </span>
                </button>
                <div className="mt-1.5 w-full">
                  <div className="flex items-center gap-1 text-base font-black text-slate-950">
                    {combo.title}
                  </div>
                  <div className="text-[12px] font-medium leading-tight text-slate-700">{combo.description}</div>
                  <div className="mt-1 text-lg font-black text-red-700">${formatPrice(combo.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold text-slate-900">Combos Clásicos</h4>
          <span className="text-xs text-slate-500">Hamburguesa + Papitas + Bebida + Salsa</span>
        </div>
        <div className="-mx-3 overflow-x-auto px-3 pb-1">
          <div className="flex gap-3 snap-x snap-mandatory">
            {classicCombos.map((combo) => (
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
          <h4 className="text-base font-semibold text-slate-900">Combos Premium</h4>
          <span className="text-xs text-slate-500">Más grandes</span>
        </div>
        <div className="-mx-3 overflow-x-auto px-3 pb-1">
          <div className="flex gap-3 snap-x snap-mandatory">
            {premiumCombos.map((combo) => (
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
          <h4 className="text-base font-semibold text-slate-900">Tríos</h4>
          <span className="text-xs text-slate-500">Para compartir</span>
        </div>
        <div className="-mx-3 overflow-x-auto px-3 pb-1">
          <div className="flex gap-3 snap-x snap-mandatory">
            {trioCombos.map((combo) => (
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
          <h4 className="text-base font-semibold text-slate-900">Combo Papero</h4>
          <span className="text-xs text-slate-500">Hamburguesa + Papitas + Salsa</span>
        </div>
        <div className="-mx-3 overflow-x-auto px-3 pb-1">
          <div className="flex gap-3 snap-x snap-mandatory">
            {paperoCombos.map((combo) => (
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
          <div className="flex w-max gap-3">
            {menuTabs.map((tab) => renderMenuTabButton(tab))}
          </div>
        </div>

        {activeMenuTab === "hamburguesas" ? (
          <div className="space-y-5">
            <div className="rounded-2xl border border-red-100 bg-red-50/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h5 className="text-lg font-black uppercase tracking-wide text-slate-950">Hamburguesas Solas</h5>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                    Elige tu burger y ajusta ingredientes antes de agregarla.
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wide text-red-700 shadow-sm ring-1 ring-red-100">
                  A tu pinta
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h6 className="text-base font-black text-slate-950">Clásicas</h6>
                  <p className="text-xs font-medium text-slate-500">Livianas, rápidas y buenas para partir.</p>
                </div>
                <span className="text-xs font-bold text-slate-400">{classicBurgerItems.length} opciones</span>
              </div>
              {renderBurgerCards(classicBurgerItems)}
            </div>

            <div className="space-y-3">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <h6 className="text-base font-black text-slate-950">Premium</h6>
                  <p className="text-xs font-medium text-slate-500">Más grandes, más carga y más sabor.</p>
                </div>
                <span className="text-xs font-bold text-slate-400">{premiumBurgerItems.length} opciones</span>
              </div>
              {renderBurgerCards(premiumBurgerItems)}
            </div>
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

      {isMenuPopupOpen ? (
        <div className="fixed inset-0 z-[70] flex min-h-[100dvh] items-center justify-center px-4 py-6">
          <div
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]"
            onClick={() => setIsMenuPopupOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-schedule-notice-title"
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/70 bg-white p-6 text-center shadow-2xl shadow-slate-950/25 sm:max-w-md sm:p-7"
          >
            <button
              type="button"
              aria-label="Cerrar aviso"
              onClick={() => setIsMenuPopupOpen(false)}
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-500 shadow-md ring-1 ring-slate-200 backdrop-blur transition hover:bg-slate-100 hover:text-slate-900"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl font-black text-red-700 ring-1 ring-red-100">
              !
            </div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-red-700">
              Aviso de horario
            </p>
            <h4 id="menu-schedule-notice-title" className="text-2xl font-black leading-tight text-slate-950">
              Por ahora atendemos de jueves a sábado
            </h4>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Nuestro horario aproximado es de{" "}
              <strong className="font-black text-slate-950">5:00 PM a 1:00 AM</strong>.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Gracias por tu comprensión, ¡te esperamos pronto!
            </p>
            <button
              type="button"
              onClick={() => setIsMenuPopupOpen(false)}
              className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-red-700"
            >
              Ver menú
            </button>
          </div>
        </div>
      ) : null}

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
              className="pointer-events-none absolute bottom-[calc(100%+12px)] right-0 w-max max-w-[220px] rounded-2xl bg-slate-900 px-3 py-2 text-right text-xs text-white shadow-xl"
              style={{ animation: "feedbackIn 1.8s ease forwards" }}
            >
              {cartFeedback.mode === "edited" ? "Producto actualizado" : "Producto agregado"}
              <div className="mt-0.5 truncate text-[11px] text-white/75">{cartFeedback.title}</div>
            </div>
          ) : null}
          <div
            className="relative inline-flex"
            style={{
              animation: cartFeedback ? "cartPop 420ms ease-out 1" : "floatY 3s ease-in-out infinite",
            }}
          >
            <button
              aria-label="Abrir carrito"
              onClick={openCart}
              style={{
                boxShadow: "0 0 12px 2px rgba(255,255,255,0.25)",
              }}
              className="relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-red-700 text-white shadow-2xl"
            >
              <ShoppingCartIcon className="relative z-10 h-7 w-7" />
              <span
                className="absolute inset-0 pointer-events-none rounded-full"
                style={{
                  animation: "shine 6s linear infinite",
                  backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)",
                  backgroundSize: "240px 100%",
                  backgroundRepeat: "no-repeat",
                  opacity: 0,
                }}
              />
            </button>
            {totalCount > 0 ? (
              <span className="absolute -right-1 -top-1 z-20 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-black leading-none text-red-700 shadow-md ring-2 ring-red-700">
                {totalCount}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {selectedItem ? (
        <div className="fixed inset-0 z-[60] flex min-h-[100dvh] items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeProductModal} />
          <div className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-lg flex-col rounded-t-3xl bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-2xl sm:max-h-[92vh] sm:rounded-3xl sm:pb-5">
            <button
              type="button"
              onClick={closeProductModal}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/95 p-2 text-slate-500 shadow-md ring-1 ring-slate-200 backdrop-blur"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <style>{`
              @keyframes productImageExpand {
                from { opacity: 0.88; transform: translateY(8px) scale(0.96); }
                to { opacity: 1; transform: translateY(0) scale(1); }
              }
              @keyframes productImageCompact {
                from { opacity: 0.88; transform: translateY(-8px) scale(1.04); }
                to { opacity: 1; transform: translateY(0) scale(1); }
              }
              @keyframes productInfoShift {
                from { opacity: 0.86; transform: translateY(6px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            <div className="overflow-y-auto pr-1">
            <div className={`grid gap-4 transition-all duration-300 ease-out ${
              productModalStep === "quantity"
                ? "grid-cols-1 sm:grid-cols-[180px_1fr]"
                : "grid-cols-[96px_1fr] sm:grid-cols-[112px_1fr]"
            }`}>
              <div
                className={`overflow-hidden rounded-2xl transition-all duration-300 ease-out ${
                  productModalStep === "quantity"
                    ? "aspect-square w-full max-h-[min(42dvh,18rem)] sm:h-auto sm:w-auto"
                    : "h-24 w-24 sm:h-auto sm:w-auto sm:aspect-square"
                }`}
                style={{
                  animation:
                    productModalStep === "quantity"
                      ? "productImageExpand 280ms ease-out"
                      : "productImageCompact 280ms ease-out",
                }}
              >
                <img
                  src={selectedItem.image}
                  alt={selectedItem.imageAlt}
                  className={`h-full w-full object-cover transition-transform duration-300 ease-out ${
                    productModalStep === "quantity" ? "scale-100" : "scale-[0.96]"
                  }`}
                />
              </div>
              <div
                className={productModalStep === "quantity" ? "space-y-4" : "contents sm:block sm:space-y-4"}
                style={{ animation: "productInfoShift 260ms ease-out" }}
              >
                {(() => {
                  const steps = getProductModalSteps(selectedItem);
                  const currentStepIndex = steps.indexOf(productModalStep);
                  const currentStepNumber = currentStepIndex + 1;
                  const nextStep = getNextProductStep(selectedItem, productModalStep);
                  const previousStep = getPreviousProductStep(selectedItem, productModalStep);

                  return (
                    <>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedItem.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{selectedItem.description}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="text-xl font-bold text-slate-900">${formatPrice(selectedItem.price)}</div>
                    <div className="shrink-0 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          Paso {currentStepNumber} de {steps.length}
                        </div>
                        <div className="flex items-center gap-1">
                          {steps.map((step) => (
                            <span
                              key={step}
                              className={`h-2 w-2 rounded-full transition-colors ${
                                steps.indexOf(step) <= currentStepIndex ? "bg-red-700" : "bg-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-xs font-semibold leading-tight text-slate-900">
                        {productModalStep === "quantity"
                          ? "Selecciona la cantidad"
                          : productModalStep === "options"
                            ? selectedItem.id === "bebida"
                              ? "Elige sabor de bebida"
                              : selectedItem.category === "combo-individual"
                                ? "Elige bebida y salsa"
                                : "Elige opciones"
                            : "Quita ingredientes si quieres"}
                      </div>
                    </div>
                  </div>
                </div>

                {productModalStep === "quantity" ? (
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
                ) : null}

                {productModalStep === "options" && usesPerUnitOptions(selectedItem) ? (
                  <div className="col-span-full max-h-72 space-y-3 overflow-y-auto pr-1">
                    {Array.from({ length: selectedQty }).map((_, comboIndex) => (
                      <div
                        id={`combo-config-${comboIndex + 1}`}
                        key={`combo-config-${comboIndex + 1}`}
                        className={`rounded-2xl border p-3 transition-all duration-300 ${
                          activeComboOptionIndex === comboIndex
                            ? "border-red-300 bg-red-50/40 shadow-sm"
                            : "border-slate-200"
                        }`}
                      >
                        {selectedQty > 1 ? (
                          <div className="mb-2 flex items-center justify-between gap-2">
                            <div className="text-sm font-semibold text-slate-900">{getOptionUnitLabel(selectedItem, comboIndex)}</div>
                            {activeComboOptionIndex === comboIndex ? (
                              <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-red-700">
                                En curso
                              </span>
                            ) : null}
                          </div>
                        ) : null}
                        {(selectedItem.options ?? []).map((group) => (
                          <div key={`${group.id}-${comboIndex}`} className="mt-3 space-y-2 first:mt-0">
                            <div className="text-sm font-medium text-slate-800">{group.label}</div>
                            <div className="flex flex-wrap gap-2">
                              {group.choices.map((choice) => {
                                const isSelected = selectedUnitOptions[comboIndex]?.[group.id] === choice;
                                const isWithoutOption = choice.toLowerCase().startsWith("sin ");

                                return (
                                  <button
                                    key={`${choice}-${comboIndex}`}
                                    type="button"
                                    onClick={() => handleComboUnitOptionSelect(comboIndex, group.id, choice)}
                                    className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                                      isSelected
                                        ? isWithoutOption
                                          ? "bg-slate-800 text-white"
                                          : "bg-red-700 text-white"
                                        : isWithoutOption
                                          ? "border border-dashed border-slate-400 bg-white text-slate-600"
                                          : "bg-slate-100 text-slate-700"
                                    }`}
                                  >
                                    {choice}
                                  </button>
                                );
                              })}
                            </div>
                            {!selectedUnitOptions[comboIndex]?.[group.id] ? (
                              <div className="text-xs text-red-600">Debes elegir una opcion.</div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : null}

                {productModalStep === "removals" && selectedItem.category === "combo-individual" ? (
                  <div className="col-span-full max-h-72 space-y-3 overflow-y-auto pr-1">
                    {Array.from({ length: selectedQty }).map((_, comboIndex) => (
                      <div key={`combo-removals-${comboIndex + 1}`} className="rounded-2xl border border-slate-200 p-3">
                        <div className="mb-2 text-sm font-semibold text-slate-900">Combo {comboIndex + 1}</div>
                        {selectedItem.removableIngredients?.length ? (
                          <div className="space-y-2">
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
                ) : null}

                {productModalStep === "removals" && selectedItem.category === "hamburguesas" && selectedItem.removableIngredients?.length ? (
                  <div className="col-span-full max-h-72 space-y-3 overflow-y-auto pr-1">
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
                ) : null}

                {productModalStep === "removals" && selectedItem.category === "combo-familiar" && hasRemovalsStep(selectedItem) ? (
                  <div className="col-span-full max-h-72 space-y-3 overflow-y-auto pr-1">
                    {getRemovalUnitLabels(selectedItem, selectedQty).map((label, burgerIndex) => (
                      <div key={`family-removals-${burgerIndex + 1}`} className="rounded-2xl border border-slate-200 p-3">
                        <div className="mb-2 text-sm font-semibold text-slate-900">{label}</div>
                        <div className="space-y-2">
                          <div className="text-sm font-medium text-slate-800">Quitar ingredientes</div>
                          <div className="flex flex-wrap gap-2">
                            {getRemovalIngredientsForUnit(selectedItem, burgerIndex).map((ingredient) => (
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
                ) : null}

                {productModalStep === "options" && !usesPerUnitOptions(selectedItem) ? (
                  <div className="col-span-full space-y-4">
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
                  </div>
                ) : null}

                {productModalStep === "removals"
                  && selectedItem.category !== "combo-individual"
                  && selectedItem.category !== "hamburguesas"
                  && selectedItem.category !== "combo-familiar" ? (
                  <div className="col-span-full">
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
                  </div>
                ) : null}

                <div className="sticky bottom-0 col-span-full -mx-1 flex justify-between gap-3 border-t border-slate-100 bg-white px-1 pt-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:static sm:mx-0 sm:px-0 sm:pb-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (previousStep) {
                        setProductModalStep(previousStep);
                        return;
                      }
                      closeProductModal();
                    }}
                    className="rounded-full px-4 py-3 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50"
                  >
                    {previousStep ? "Volver" : "Cancelar"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (nextStep) {
                        setProductModalStep(nextStep);
                        return;
                      }
                      addSelectedItemToCart();
                    }}
                    disabled={productModalStep === "options" && !hasAllRequiredSelections()}
                    className="rounded-full bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-50"
                  >
                    {nextStep ? "Continuar" : editingCartItemId ? "Guardar cambios" : "Agregar al carrito"}
                  </button>
                </div>
                    </>
                  );
                })()}
              </div>
            </div>
            </div>
          </div>
        </div>
      ) : null}

      {isCartOpen ? (
        <div className="fixed inset-0 z-50 flex min-h-[100dvh] items-end justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 p-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Tu carrito</h3>
                <p className="text-sm text-slate-500">Revisa lo que ya agregaste antes de pedir.</p>
              </div>
              <button className="text-sm text-slate-500" onClick={() => setIsCartOpen(false)}>Cerrar</button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setIsOrderDetailOpen((isOpen) => !isOpen)}
                  className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left"
                  aria-expanded={isOrderDetailOpen}
                >
                  <div>
                    <div className="text-sm font-bold text-slate-950">Detalle del pedido</div>
                    <div className="text-xs text-slate-500">
                      {totalCount} {totalCount === 1 ? "producto" : "productos"}
                    </div>
                  </div>
                  <span className={`text-lg font-black text-red-700 transition-transform ${isOrderDetailOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>

                {isOrderDetailOpen ? (
                  <div className="max-h-56 space-y-3 overflow-y-auto border-t border-slate-100 p-3">
                    {cart.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                        Tu carrito esta vacio.
                      </div>
                    ) : cart.map((cartItem) => (
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
                              ? renderUnitSelections(cartItem.unitSelections, cartItem.item)
                              : renderSelections(cartItem.selections)}
                            {cartItem.unitSelections?.length
                              ? renderUnitRemovals(cartItem.unitRemovals, "Combo")
                              : cartItem.unitRemovals?.length
                                ? renderUnitRemovals(
                                    cartItem.unitRemovals,
                                    cartItem.item.category === "hamburguesas" ? "Hamburguesa" : "Unidad",
                                    cartItem.item.removalUnitLabels ? getRemovalUnitLabels(cartItem.item, cartItem.qty) : undefined
                                  )
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
                                ? renderUnitSelections(cartItem.unitSelections, cartItem.item)
                                : renderSelections(cartItem.selections)}
                              {cartItem.unitSelections?.length
                                ? renderUnitRemovals(cartItem.unitRemovals, "Combo")
                                : cartItem.unitRemovals?.length
                                  ? renderUnitRemovals(
                                      cartItem.unitRemovals,
                                      cartItem.item.category === "hamburguesas" ? "Hamburguesa" : "Unidad",
                                      cartItem.item.removalUnitLabels ? getRemovalUnitLabels(cartItem.item, cartItem.qty) : undefined
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
                    ))}
                  </div>
                ) : null}
              </div>

            <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3 shadow-sm">
                <label className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Nombre del pedido</label>
                <div className={`mt-2 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 ring-1 transition ${
                  orderName.trim() === "" ? "ring-red-100 focus-within:ring-red-300" : "ring-slate-200 focus-within:ring-red-300"
                }`}>
                  <UserIcon className="h-5 w-5 shrink-0 text-red-700" />
                  <input
                    value={orderName}
                    onChange={(e) => setOrderName(e.target.value)}
                    placeholder="Nombre de quien pide"
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
                {orderName.trim() === "" ? (
                  <div className="mt-2 text-xs font-medium text-red-600">Debes ingresar un nombre para el pedido.</div>
                ) : null}
              </div>

              <div className="space-y-2">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-slate-950">¿Como quieres tu pedido?</div>
                    <div className="text-xs text-slate-500">Elige retiro o delivery.</div>
                  </div>
                  {orderType === "delivery" ? (
                    <span className="shrink-0 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-700">
                      + ${formatPrice(deliveryFee)}
                    </span>
                  ) : null}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType("pickup")}
                    className={`relative rounded-2xl border p-3 text-left transition ${
                      orderType === "pickup"
                        ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15"
                        : "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-red-200"
                    }`}
                  >
                    <BuildingStorefrontIcon className={`h-5 w-5 ${orderType === "pickup" ? "text-white" : "text-red-700"}`} />
                    <div className="mt-2 text-sm font-bold leading-tight">Retiro</div>
                    <div className={`mt-0.5 text-[11px] leading-tight ${orderType === "pickup" ? "text-white/70" : "text-slate-500"}`}>
                      En local
                    </div>
                    {orderType === "pickup" ? <CheckCircleIcon className="absolute right-2 top-2 h-5 w-5 text-white" /> : null}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("delivery")}
                    className={`relative rounded-2xl border p-3 text-left transition ${
                      orderType === "delivery"
                        ? "border-red-700 bg-red-700 text-white shadow-lg shadow-red-950/20"
                        : "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-red-200"
                    }`}
                  >
                    <TruckIcon className={`h-5 w-5 ${orderType === "delivery" ? "text-white" : "text-red-700"}`} />
                    <div className="mt-2 text-sm font-bold leading-tight">Delivery</div>
                    <div className={`mt-0.5 text-[11px] leading-tight ${orderType === "delivery" ? "text-white/75" : "text-slate-500"}`}>
                      A domicilio
                    </div>
                    {orderType === "delivery" ? <CheckCircleIcon className="absolute right-2 top-2 h-5 w-5 text-white" /> : null}
                  </button>
                </div>
              </div>

              {orderType === "delivery" ? (
                <div className="rounded-2xl border border-red-100 bg-red-50/50 p-3">
                  <label className="text-xs font-bold uppercase tracking-[0.14em] text-red-700">Direccion de entrega</label>
                  <div className={`mt-2 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 ring-1 transition ${
                    address.trim() === "" ? "ring-red-100 focus-within:ring-red-300" : "ring-slate-200 focus-within:ring-red-300"
                  }`}>
                    <MapPinIcon className="h-5 w-5 shrink-0 text-red-700" />
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle, numero, referencia"
                      className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <p className="mt-2 text-xs font-medium leading-5 text-slate-600">
                    Delivery estimado entre ${formatPrice(DELIVERY_ESTIMATE_MIN)} y ${formatPrice(DELIVERY_ESTIMATE_MAX)}.
                    Se agregan ${formatPrice(DELIVERY_ESTIMATE_MAX)} al total.
                  </p>
                </div>
              ) : null}

              <div className="space-y-2">
                <div>
                  <div className="text-sm font-bold text-slate-950">¿Como pagas?</div>
                  <div className="text-xs text-slate-500">Confirma el metodo para cerrar el pedido.</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("transfer")}
                    className={`relative rounded-2xl border p-3 text-left transition ${
                      paymentMethod === "transfer"
                        ? "border-red-700 bg-red-700 text-white shadow-lg shadow-red-950/20"
                        : "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-red-200"
                    }`}
                  >
                    <CreditCardIcon className={`h-5 w-5 ${paymentMethod === "transfer" ? "text-white" : "text-red-700"}`} />
                    <div className="mt-2 text-sm font-bold leading-tight">Transferencia</div>
                    <div className={`mt-0.5 text-[11px] leading-tight ${paymentMethod === "transfer" ? "text-white/75" : "text-slate-500"}`}>
                      Pago digital
                    </div>
                    {paymentMethod === "transfer" ? <CheckCircleIcon className="absolute right-2 top-2 h-5 w-5 text-white" /> : null}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cash")}
                    className={`relative rounded-2xl border p-3 text-left transition ${
                      paymentMethod === "cash"
                        ? "border-slate-950 bg-slate-950 text-white shadow-lg shadow-slate-950/15"
                        : "border-slate-200 bg-white text-slate-800 shadow-sm hover:border-red-200"
                    }`}
                  >
                    <BanknotesIcon className={`h-5 w-5 ${paymentMethod === "cash" ? "text-white" : "text-red-700"}`} />
                    <div className="mt-2 text-sm font-bold leading-tight">Efectivo</div>
                    <div className={`mt-0.5 text-[11px] leading-tight ${paymentMethod === "cash" ? "text-white/70" : "text-slate-500"}`}>
                      Con vuelto
                    </div>
                    {paymentMethod === "cash" ? <CheckCircleIcon className="absolute right-2 top-2 h-5 w-5 text-white" /> : null}
                  </button>
                </div>
              </div>

              {paymentMethod === "cash" ? (
                <div ref={cashPaymentSectionRef} className="scroll-mb-40 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-bold text-slate-950">¿Con cuanto pagas?</div>
                      <div className="text-xs text-slate-500">Para calcular el vuelto.</div>
                    </div>
                    <BanknotesIcon className="h-6 w-6 shrink-0 text-red-700" />
                  </div>
                  <div className="mt-3 overflow-x-auto pb-1">
                    <div className="flex w-max gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setCashPaymentType("exact");
                          setCashAmount("");
                          setShowAdvancedCashPayment(false);
                        }}
                        className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-bold transition ${
                          cashPaymentType === "exact" ? "bg-red-700 text-white shadow-md shadow-red-950/20" : "bg-white text-slate-700 ring-1 ring-slate-200"
                        }`}
                      >
                        Justo
                      </button>
                      {cashPaymentSuggestions.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setCashPaymentType("amount");
                            setCashAmount(String(amount));
                            setShowAdvancedCashPayment(false);
                          }}
                          className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-bold transition ${
                            cashPaymentType === "amount" && normalizedCashAmount === amount
                              ? "bg-red-700 text-white shadow-md shadow-red-950/20"
                              : "bg-white text-slate-700 ring-1 ring-slate-200"
                          }`}
                        >
                          ${formatPrice(amount)}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          setShowAdvancedCashPayment((isVisible) => !isVisible);
                          setCashPaymentType("amount");
                        }}
                        className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-bold transition ${
                          showAdvancedCashPayment
                            ? "bg-slate-950 text-white shadow-md shadow-slate-950/15"
                            : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        Otro
                      </button>
                    </div>
                  </div>
                  {showAdvancedCashPayment ? (
                    <div className="mt-2 flex items-center gap-2 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-slate-200 focus-within:ring-red-300">
                      <span className="text-sm font-black text-red-700">$</span>
                      <input
                        value={cashAmount}
                        onChange={(e) => {
                          setCashPaymentType("amount");
                          setCashAmount(e.target.value);
                        }}
                        inputMode="numeric"
                        placeholder={`Ej: ${formatPrice(cashPaymentSuggestions[0] ?? total)}`}
                        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                      />
                    </div>
                  ) : null}
                  {cashPaymentType === "amount" && normalizedCashAmount < total ? (
                    <div className="mt-2 text-xs font-medium text-red-600">
                      El monto debe ser igual o mayor al total.
                    </div>
                  ) : null}
                </div>
              ) : null}

              {paymentMethod === "" ? (
                <div className="rounded-2xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700">Debes elegir un metodo de pago.</div>
              ) : null}
            </div>
            </div>

            <div className="shrink-0 border-t border-slate-200 bg-white px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-12px_30px_rgba(15,23,42,0.08)]">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-xs font-black uppercase tracking-[0.12em] text-slate-500">Total</div>
                  {orderType === "delivery" ? (
                    <div className="text-[11px] font-medium text-slate-500">Incluye delivery</div>
                  ) : null}
                </div>
                <div className="text-2xl font-black text-slate-950">${formatPrice(total)}</div>
              </div>

              <button
                type="button"
                disabled={
                  cart.length === 0
                  || orderName.trim() === ""
                  || !hasValidPayment
                  || (orderType === "delivery" && address.trim() === "")
                  || isSubmittingOrder
                }
                onClick={submitOrder}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-4 py-3.5 text-sm font-black uppercase tracking-wide text-white shadow-xl shadow-green-900/20 transition hover:bg-green-700 disabled:opacity-50"
              >
                <ShoppingCartIcon className="h-5 w-5" />
                {isSubmittingOrder ? "Guardando pedido..." : "Pedir por WhatsApp"}
              </button>
              {orderError ? (
                <div className="mt-2 text-center text-xs text-red-600">{orderError}</div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
