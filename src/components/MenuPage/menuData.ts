import { products } from "../Products";
import comboFamiliarImg from "../../../img/combos/combo-familiar.webp";
import comboClasicasFullImg from "../../../img/combos/combo-clasicas-full.webp";
import comboBaconLoversImg from "../../../img/combos/combo-bacon-lovers.webp";
import comboClasicaIndividualImg from "../../../img/combos-individual/Clasica.webp";
import comboBaconIndividualImg from "../../../img/combos-individual/bacon.webp";
import comboItalianaIndividualImg from "../../../img/combos-individual/italiana.webp";
import comboRompedietaUnoIndividualImg from "../../../img/combos-individual/rompedieta-uno.webp";
import comboRompedietaDosIndividualImg from "../../../img/combos-individual/rompedieta-dos.webp";
import comboSmokeCriminalIndividualImg from "../../../img/combos-individual/combo-smoke-criminal.webp";
import comboSmokeCriminalXlIndividualImg from "../../../img/combos-individual/combo-smoke-criminal-xl.webp";
import comboPaperoBaconImg from "../../../img/Combos-paperos/combo-papero-bacon.webp";
import comboPaperoClasicaImg from "../../../img/Combos-paperos/combo-papero-clasica.webp";
import comboPaperoItalianaImg from "../../../img/Combos-paperos/combo-papero-italiana.webp";
import smokeCriminalOfferImg from "../../../img/ofertar/smoke-criminal-oferta.webp";
import hambBaconImg from "../../../img/hamb-solas/bacon.webp";
import hambClasicaImg from "../../../img/hamb-solas/clasica.webp";
import hambItalianaImg from "../../../img/hamb-solas/italiana.webp";
import hambRompedietaUnoImg from "../../../img/hamb-solas/rompedieta-uno.webp";
import hambRompedietaDosImg from "../../../img/hamb-solas/rompedieta-dos.webp";
import hambSmokeCriminalImg from "../../../img/hamb-solas/smoke-criminal.webp";
import hambSmokeCriminalXlImg from "../../../img/hamb-solas/smoke-criminal-xl.webp";
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

export const comboDrinkOptions = ["Sprite", "Coca-Cola", "Fanta", "Sin bebida"];
export const friesSauceOptions = ["Mayonesa", "Ketchup", "Mostaza", "BBQ", "Chick Fill A"];
export const comboFriesSauceOptions = [...friesSauceOptions, "Sin salsa"];

function createOptionGroup(id: string, label: string, choices: string[]): MenuOptionGroup {
  return { id, label, choices };
}

const burgerImagesBySlug: Partial<Record<string, string>> = {
  "cs-bacon": hambBaconImg,
  "cs-clasica": hambClasicaImg,
  "cs-italiana": hambItalianaImg,
  "cs-nueva": hambRompedietaUnoImg,
  "cs-romp-ii": hambRompedietaDosImg,
  "smoke-criminal": hambSmokeCriminalImg,
  "smoke-criminal-xl": hambSmokeCriminalXlImg,
};
const newBurgerSlugs = new Set(["smoke-criminal", "smoke-criminal-xl"]);

export const offerItems: MenuItem[] = [
  {
    id: "oferta-smoke-criminal-2x",
    title: "Oferta Smoke Criminal 2x",
    description: "2 Smoke Criminal por precio especial. Solo por hoy, cupos limitados.",
    price: 8000,
    image: smokeCriminalOfferImg,
    imageAlt: "Oferta 2 Smoke Criminal por 8000 pesos",
    category: "combo-familiar",
    badge: "Oferta",
    removableIngredients: ["BBQ", "Mayo", "Tocino", "Cheddar", "Cebolla crispy"],
    removalUnitLabels: ["Smoke Criminal 1", "Smoke Criminal 2"],
  },
];

export const newCombos: MenuItem[] = [
  {
    id: "combo-smoke-criminal",
    title: "Combo Smoke Criminal",
    description: "Hamburguesa Smoke Criminal + papitas + bebida + salsa",
    price: 4690,
    image: comboSmokeCriminalIndividualImg,
    imageAlt: "Combo Smoke Criminal",
    category: "combo-individual",
    removableIngredients: ["BBQ", "Mayo", "Tocino", "Cheddar", "Cebolla crispy"],
    options: [
      createOptionGroup("bebida", "Sabor de bebida", comboDrinkOptions),
      createOptionGroup("salsa", "Salsa para las papas", comboFriesSauceOptions),
    ],
  },
  {
    id: "combo-smoke-criminal-xl",
    title: "Combo Smoke Criminal XL",
    description: "Hamburguesa Smoke Criminal XL + papitas + bebida + salsa",
    price: 6990,
    image: comboSmokeCriminalXlIndividualImg,
    imageAlt: "Combo Smoke Criminal XL",
    category: "combo-individual",
    removableIngredients: ["BBQ", "Mayo", "Doble tocino", "Triple cheddar", "Cebolla crispy"],
    options: [
      createOptionGroup("bebida", "Sabor de bebida", comboDrinkOptions),
      createOptionGroup("salsa", "Salsa para las papas", comboFriesSauceOptions),
    ],
  },
];

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
      createOptionGroup("salsa", "Salsa para las papas", comboFriesSauceOptions),
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
      createOptionGroup("salsa", "Salsa para las papas", comboFriesSauceOptions),
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
      createOptionGroup("salsa", "Salsa para las papas", comboFriesSauceOptions),
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
      createOptionGroup("salsa", "Salsa para las papas", comboFriesSauceOptions),
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
      createOptionGroup("salsa", "Salsa para las papas", comboFriesSauceOptions),
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
    removableIngredients: ["Salsa", "Tomate", "Lechuga", "Queso", "Tocino", "Cebolla caramelizada"],
    removalUnitLabels: ["Clasica 1", "Clasica 2", "Clasica 3", "Bacon 1", "Bacon 2"],
  },
  {
    id: "combo-full-bacon",
    title: "Full Bacon",
    description: "5 hamburguesas bacon",
    price: 11490,
    image: comboBaconLoversImg,
    imageAlt: "Combo familiar bacon",
    category: "combo-familiar",
    removableIngredients: ["Salsa", "Tocino", "Queso", "Cebolla caramelizada"],
    removalUnitLabels: ["Bacon 1", "Bacon 2", "Bacon 3", "Bacon 4", "Bacon 5"],
  },
  {
    id: "combo-full-clasicas",
    title: "Full Clasicas",
    description: "5 hamburguesas clasicas",
    price: 9490,
    image: comboClasicasFullImg,
    imageAlt: "Combo full clasicas",
    category: "combo-familiar",
    removableIngredients: ["Salsa", "Tomate", "Lechuga", "Queso"],
    removalUnitLabels: ["Clasica 1", "Clasica 2", "Clasica 3", "Clasica 4", "Clasica 5"],
  },
];

export const paperoCombos: MenuItem[] = [
  {
    id: "combo-papero-cs-clasica",
    title: "Combo Papero Cs-Clasica",
    description: "Cs-Clasica + papitas + salsa a eleccion.",
    price: 3490,
    image: comboPaperoClasicaImg,
    imageAlt: "Combo Papero Cs-Clasica",
    category: "acompanamientos",
    removableIngredients: ["Salsa", "Tomate", "Lechuga", "Queso"],
    options: [createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions)],
  },
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
  {
    id: "combo-papero-cs-italiana",
    title: "Combo Papero Cs-Italiana",
    description: "Cs-Italiana + papitas + salsa a eleccion.",
    price: 3690,
    image: comboPaperoItalianaImg,
    imageAlt: "Combo Papero Cs-Italiana",
    category: "acompanamientos",
    removableIngredients: ["Mayonesa", "Palta", "Tomate", "Queso"],
    options: [createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions)],
  },
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
    badge: newBurgerSlugs.has(product.slug)
      ? "Nuevo"
      : product.mostOrdered || product.tag === "Top ventas"
      ? product.tag
      : undefined,
    favorite: product.mostOrdered,
    removableIngredients:
      product.slug === "cs-bacon"
        ? ["Tocino", "Salsa BBQ", "Cebolla caramelizada", "Queso cheddar"]
        : product.slug === "cs-romp-ii"
        ? ["Huevo frito", "Tocino", "Cebolla caramelizada", "Salsa BBQ", "Queso cheddar"]
        : product.slug === "smoke-criminal"
        ? ["BBQ", "Mayo", "Tocino", "Cheddar", "Cebolla crispy"]
        : product.slug === "smoke-criminal-xl"
        ? ["BBQ", "Mayo", "Doble tocino", "Triple cheddar", "Cebolla crispy"]
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
