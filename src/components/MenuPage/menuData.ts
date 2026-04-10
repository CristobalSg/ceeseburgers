import { products } from "../Products";
import comboFamiliarImg from "../../../img/combos/combo-familiar.webp";
import comboClasicasFullImg from "../../../img/combos/combo-clasicas-full.webp";
import comboBaconLoversImg from "../../../img/combos/combo-bacon-lovers.webp";
import comboClasicaIndividualImg from "../../../img/combos-individual/Clasica.webp";
import comboBaconIndividualImg from "../../../img/combos-individual/bacon.webp";
import comboItalianaIndividualImg from "../../../img/combos-individual/italiana.webp";
import comboRompedietaUnoIndividualImg from "../../../img/combos-individual/rompedieta-uno.webp";
import comboRompedietaDosIndividualImg from "../../../img/combos-individual/rompedieta-dos.webp";
import comboPaperoBaconImg from "../../../img/combos-paperos/bacon-papero.webp";
import hambBaconImg from "../../../img/hamb-solas/bacon.webp";
import hambClasicaImg from "../../../img/hamb-solas/clasica.webp";
import hambItalianaImg from "../../../img/hamb-solas/italiana.webp";
import hambRompedietaUnoImg from "../../../img/hamb-solas/rompedieta-uno.webp";
import hambRompedietaDosImg from "../../../img/hamb-solas/rompedieta-dos.webp";
import friesImage from "../../../img/acompaniamiento/papas.webp";
import drinkImage from "../../../img/acompaniamiento/bebidas.webp";
import nuggetsX5Image from "../../../img/acompaniamiento/nuggets-x5.webp";
import nuggetsX10Image from "../../../img/acompaniamiento/nuggets-x10.webp";
import ketchupImage from "../../../img/salsas/ketchup.webp";
import mayoImage from "../../../img/salsas/mayo.webp";
import mostazaImage from "../../../img/salsas/mostaza.webp";
import bbqImage from "../../../img/salsas/bbq.webp";
import chickFillAImage from "../../../img/salsas/chick-fill-a.webp";
import { parsePrice } from "./menuUtils";
import type { MenuItem, MenuTab, MenuOptionGroup } from "./menuUtils";

export const comboDrinkOptions = ["Sprite", "Coca-Cola", "Fanta"];
export const friesSauceOptions = ["Mayonesa", "Ketchup", "Mostaza", "BBQ", "Chick Fill A"];

function createOptionGroup(id: string, label: string, choices: string[]): MenuOptionGroup {
  return { id, label, choices };
}

const burgerImagesBySlug: Partial<Record<string, string>> = {
  "cs-bacon": hambBaconImg,
  "cs-clasica": hambClasicaImg,
  "cs-italiana": hambItalianaImg,
  "cs-nueva": hambRompedietaUnoImg,
  "cs-romp-ii": hambRompedietaDosImg,
};

export const individualCombos: MenuItem[] = [
  {
    id: "combo-clasico",
    title: "Combo Clasico",
    description: "Hamburguesa clasica + papitas + bebida + salsa",
    price: 4490,
    image: comboClasicaIndividualImg,
    imageAlt: "Combo clasico",
    category: "combo-individual",
    removableIngredients: ["Salsa", "Tomate", "Lechuga", "Queso"],
    options: [
      createOptionGroup("bebida", "Sabor de bebida", comboDrinkOptions),
      createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions),
    ],
  },
  {
    id: "combo-bacon",
    title: "Combo Bacon",
    description: "Hamburguesa bacon + papitas + bebida + salsa",
    price: 4890,
    image: comboBaconIndividualImg,
    imageAlt: "Combo bacon",
    category: "combo-individual",
    favorite: true,
    removableIngredients: ["Salsa", "Tocino", "Queso", "Cebolla caramelizada"],
    options: [
      createOptionGroup("bebida", "Sabor de bebida", comboDrinkOptions),
      createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions),
    ],
  },
  {
    id: "combo-italiana",
    title: "Combo Italiana",
    description: "Hamburguesa italiana + papitas + bebida + salsa",
    price: 4690,
    image: comboItalianaIndividualImg,
    imageAlt: "Combo italiana",
    category: "combo-individual",
    removableIngredients: ["Mayonesa", "Palta", "Tomate", "Queso"],
    options: [
      createOptionGroup("bebida", "Sabor de bebida", comboDrinkOptions),
      createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions),
    ],
  },
  {
    id: "combo-rompedieta-ii",
    title: "Combo Rompedieta II",
    description: "Hamburguesa Rompedieta II + papitas + bebida + salsa",
    price: 5590,
    image: comboRompedietaDosIndividualImg,
    imageAlt: "Combo Rompedieta II",
    category: "combo-individual",
    removableIngredients: ["Salsa BBQ", "Huevo frito", "Tocino", "Queso cheddar", "Cebolla caramelizada"],
    options: [
      createOptionGroup("bebida", "Sabor de bebida", comboDrinkOptions),
      createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions),
    ],
  },
  {
    id: "combo-rompedieta-i",
    title: "Combo Rompedieta I",
    description: "Hamburguesa Rompedieta I + papitas + bebida + salsa",
    price: 5590,
    image: comboRompedietaUnoIndividualImg,
    imageAlt: "Combo Rompedieta I",
    category: "combo-individual",
    removableIngredients: ["Mayonesa", "Tocino", "Lechuga", "Tomate", "Cebolla morada", "Queso cheddar"],
    options: [
      createOptionGroup("bebida", "Sabor de bebida", comboDrinkOptions),
      createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions),
    ],
  },
];

export const familyCombos: MenuItem[] = [
  {
    id: "combo-familiar",
    title: "Combo Familiar",
    description: "3 hamburguesas clasicas + 2 hamburguesas bacon",
    price: 10490,
    image: comboFamiliarImg,
    imageAlt: "Combo familiar clasico",
    category: "combo-familiar",
    favorite: true,
  },
  {
    id: "combo-full-bacon",
    title: "Full Bacon",
    description: "5 hamburguesas bacon",
    price: 11490,
    image: comboBaconLoversImg,
    imageAlt: "Combo familiar bacon",
    category: "combo-familiar",
  },
  {
    id: "combo-full-clasicas",
    title: "Full Clasicas",
    description: "5 hamburguesas clasicas",
    price: 9490,
    image: comboClasicasFullImg,
    imageAlt: "Combo full clasicas",
    category: "combo-familiar",
  },
];

export const paperoCombos: MenuItem[] = [
  {
    id: "combo-papero-cs-bacon",
    title: "Combo Papero Cs-Bacon",
    description: "Cs-Bacon + papitas + salsa a eleccion.",
    price: 3890,
    image: comboPaperoBaconImg,
    imageAlt: "Combo Papero Cs-Bacon",
    category: "acompanamientos",
    favorite: true,
    removableIngredients: ["Salsa", "Tocino", "Queso", "Cebolla caramelizada"],
    options: [createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions)],
  },
];

export const paperoComingSoonItems: MenuItem[] = [
  { id: "combo-papero-cs-clasica", title: "Combo Papero Cs-Clasica", description: "Cs-Clasica + papitas + salsa a eleccion.", price: 0, category: "acompanamientos", badge: "Proximamente" },
  { id: "combo-papero-cs-italiana", title: "Combo Papero Cs-Italiana", description: "Cs-Italiana + papitas + salsa a eleccion.", price: 0, category: "acompanamientos", badge: "Proximamente" },
  { id: "combo-papero-cs-rompedieta-ii", title: "Combo Papero Cs-Rompedieta II", description: "Cs-Rompedieta II + papitas + salsa a eleccion.", price: 0, category: "acompanamientos", badge: "Proximamente" },
];

export function getBurgerItems(): MenuItem[] {
  return products.map((product) => ({
    id: product.slug,
    title: product.name,
    description: product.description,
    price: parsePrice(product.price),
    image: burgerImagesBySlug[product.slug] ?? product.image,
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
}

export const sideItems: MenuItem[] = [
  { id: "papitas-fritas", title: "Papitas fritas", description: "El acompanamiento clasico para cualquier pedido.", price: 1300, image: friesImage, imageAlt: "Papitas fritas", category: "acompanamientos" },
  { id: "bebida", title: "Bebida", description: "Acompanamiento para tu pedido.", price: 1000, image: drinkImage, imageAlt: "Bebida", category: "acompanamientos" },
  {
    id: "nuggets-x5",
    title: "Nuggets x5",
    description: "5 nuggets + una salsa a eleccion.",
    price: 1790,
    image: nuggetsX5Image,
    imageAlt: "Nuggets x5",
    category: "acompanamientos",
    options: [createOptionGroup("salsa", "Salsa para los nuggets", friesSauceOptions)],
  },
  {
    id: "nuggets-x10",
    title: "Nuggets x10",
    description: "10 nuggets + una salsa a eleccion.",
    price: 2590,
    image: nuggetsX10Image,
    imageAlt: "Nuggets x10",
    category: "acompanamientos",
    options: [createOptionGroup("salsa", "Salsa para los nuggets", friesSauceOptions)],
  },
  { id: "aros-de-cebolla", title: "Aros de cebolla", description: "En promo porque se viene proximamente.", price: 0, category: "acompanamientos", badge: "Proximamente" },
  { id: "empanadas-de-queso", title: "Empanadas de queso", description: "En promo porque se viene proximamente.", price: 0, category: "acompanamientos", badge: "Proximamente" },
];

export const sauceItems: MenuItem[] = [
  { id: "mayonesa", title: "Mayonesa", description: "Extra para acompanar tu pedido.", price: 300, image: mayoImage, imageAlt: "Mayonesa", category: "salsas" },
  { id: "ketchup", title: "Ketchup", description: "Extra para acompanar tu pedido.", price: 300, image: ketchupImage, imageAlt: "Ketchup", category: "salsas" },
  { id: "mostaza", title: "Mostaza", description: "Extra para acompanar tu pedido.", price: 300, image: mostazaImage, imageAlt: "Mostaza", category: "salsas" },
  { id: "bbq", title: "BBQ", description: "Extra para acompanar tu pedido.", price: 500, image: bbqImage, imageAlt: "BBQ", category: "salsas" },
  { id: "chick-fill-a", title: "Chick Fill A", description: "Extra para acompanar tu pedido.", price: 500, image: chickFillAImage, imageAlt: "Chick Fill A", category: "salsas" },
];

export const menuTabs: { id: MenuTab; label: string; icon: string; iconAlt: string }[] = [
  { id: "hamburguesas", label: "Hamburguesas", icon: hambClasicaImg, iconAlt: "Hamburguesas" },
  { id: "acompanamientos", label: "Acompañamientos", icon: friesImage, iconAlt: "Acompañamientos" },
  { id: "salsas", label: "Salsas", icon: ketchupImage, iconAlt: "Salsas" },
];
