export type MenuTab = "hamburguesas" | "acompanamientos" | "salsas";
export type MenuCategory =
  | "combo-individual"
  | "combo-familiar"
  | "hamburguesas"
  | "acompanamientos"
  | "bebidas"
  | "salsas";

export type MenuOptionGroup = {
  id: string;
  label: string;
  choices: string[];
};

export type MenuItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
  imageAlt?: string;
  category: MenuCategory;
  badge?: string;
  favorite?: boolean;
  options?: MenuOptionGroup[];
  removableIngredients?: string[];
};

export type CartItem = {
  id: string;
  item: MenuItem;
  qty: number;
  selections: Record<string, string>;
  unitSelections?: Record<string, string>[];
  removals?: string[];
  unitRemovals?: string[][];
};

export type ProductModalStep = "quantity" | "options" | "removals";

export function parsePrice(price: string) {
  const digits = price.replace(/\D/g, "");
  return parseInt(digits || "0", 10);
}

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("es-CL").format(amount);
}

export function buildCartSignature(itemId: string, selections: Record<string, string>) {
  const selectionKey = Object.entries(selections)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");
  return `${itemId}::${selectionKey}`;
}

export function usesPerUnitRemovals(item: MenuItem) {
  return item.category === "combo-individual" || item.category === "hamburguesas";
}
