import comboClasicasFullImg from "../../../img/combos/01-full-clasicas.webp";
import comboFamiliarImg from "../../../img/combos/02-combo-familiar.webp";
import comboBaconLoversImg from "../../../img/combos/03-full-bacon.webp";
import trioFamiliarImg from "../../../img/trios/01-trio-familiar.webp";
import trioPremiunImg from "../../../img/trios/02-trio-premiun.webp";
import trioPremiunSmokeImg from "../../../img/trios/03-trio-premiun-smoke.webp";
import comboClasicaIndividualImg from "../../../img/combos-individual/clasicos/01-combo-clasico.webp";
import comboItalianaIndividualImg from "../../../img/combos-individual/clasicos/02-combo-italiana.webp";
import comboBaconIndividualImg from "../../../img/combos-individual/clasicos/03-combo-bacon.webp";
import comboSmokeCriminalIndividualImg from "../../../img/combos-individual/clasicos/04-combo-smoke-criminal.webp";
import comboRompedietaUnoIndividualImg from "../../../img/combos-individual/premium/01-combo-rompedieta-i.webp";
import comboRompedietaDosIndividualImg from "../../../img/combos-individual/premium/02-combo-rompedieta-ii.webp";
import comboSmokeCriminalXlIndividualImg from "../../../img/combos-individual/premium/03-combo-smoke-criminal-xl.webp";
import comboPaperoBaconImg from "../../../img/Combos-paperos/combo-papero-bacon.webp";
import comboPaperoClasicaImg from "../../../img/Combos-paperos/combo-papero-clasica.webp";
import comboPaperoItalianaImg from "../../../img/Combos-paperos/combo-papero-italiana.webp";
import smokeCriminalOfferImg from "../../../img/ofertar/smoke-criminal-oferta.webp";
import hambBaconImg from "../../../img/hamb-solas/bacon.webp";
import hambClasicaImg from "../../../img/hamb-solas/clasica.webp";
import hambItalianaImg from "../../../img/hamb-solas/italiana.webp";
import hambRompedietaUnoImg from "../../../img/hamb-solas/rompedieta-uno.webp";
import hambRompedietaDosImg from "../../../img/hamb-solas/rompedieta-dos.webp";
import hambRompedietitaImg from "../../../img/hamb-solas/rompedietita-i.webp";
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
import type { MenuItem, MenuTab, MenuOptionGroup } from "./menuUtils";

export const comboDrinkOptions = ["Sprite", "Coca-Cola", "Coca Zero", "Fanta", "Sin bebida"];
const sideDrinkOptions = comboDrinkOptions.filter((choice) => choice !== "Sin bebida");
export const friesSauceOptions = ["Mayonesa", "Ketchup", "Mostaza", "BBQ", "Chick Fill A"];
export const comboFriesSauceOptions = [...friesSauceOptions, "Sin salsa"];

function createOptionGroup(id: string, label: string, choices: string[]): MenuOptionGroup {
  return { id, label, choices };
}

const clasicaRemovableIngredients = ["Tomate", "Lechuga", "Aderezo", "Queso cheddar"];
const baconRemovableIngredients = ["Tocino", "Salsa BBQ", "Cebolla caramelizada", "Queso cheddar"];

const burgerImagesBySlug: Partial<Record<string, string>> = {
  "cs-bacon": hambBaconImg,
  "cs-clasica": hambClasicaImg,
  "cs-italiana": hambItalianaImg,
  "cs-nueva": hambRompedietaUnoImg,
  "cs-romp-ii": hambRompedietaDosImg,
  "rompedietita-i": hambRompedietitaImg,
  "smoke-criminal": hambSmokeCriminalImg,
  "smoke-criminal-xl": hambSmokeCriminalXlImg,
};
const newBurgerSlugs = new Set(["rompedietita-i", "smoke-criminal", "smoke-criminal-xl"]);
const classicBurgerSlugs = ["rompedietita-i", "cs-clasica", "cs-italiana", "cs-bacon", "smoke-criminal"];
const premiumBurgerSlugs = ["cs-nueva", "cs-romp-ii", "smoke-criminal-xl"];

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

const comboSmokeCriminal: MenuItem = {
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
};

const comboSmokeCriminalXl: MenuItem = {
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
};

export const trioCombos: MenuItem[] = [
  {
    id: "trio-familiar",
    title: "Trio Familiar",
    description: "1 Bacon + 2 Clasicas",
    price: 5990,
    image: trioFamiliarImg,
    imageAlt: "Trio Familiar con una Bacon y dos Clasicas",
    category: "combo-familiar",
    removalUnitLabels: ["Bacon", "Clasica 1", "Clasica 2"],
    removalUnitIngredients: [baconRemovableIngredients, clasicaRemovableIngredients, clasicaRemovableIngredients],
  },
  {
    id: "trio-premiun",
    title: "Trio Premiun",
    description: "2 Bacon + 1 Clasica",
    price: 6390,
    image: trioPremiunImg,
    imageAlt: "Trio Premiun con dos Bacon y una Clasica",
    category: "combo-familiar",
    removalUnitLabels: ["Bacon 1", "Bacon 2", "Clasica"],
    removalUnitIngredients: [baconRemovableIngredients, baconRemovableIngredients, clasicaRemovableIngredients],
  },
  {
    id: "trio-premiun-smoke",
    title: "Trio Premiun Smoke",
    description: "3 Smoke Criminal",
    price: 6690,
    image: trioPremiunSmokeImg,
    imageAlt: "Trio Premiun Smoke con tres Smoke Criminal",
    category: "combo-familiar",
    removableIngredients: ["BBQ", "Mayo", "Tocino", "Cheddar", "Cebolla crispy"],
    removalUnitLabels: ["Smoke Criminal 1", "Smoke Criminal 2", "Smoke Criminal 3"],
  },
];

export const classicCombos: MenuItem[] = [
  {
    id: "combo-clasico",
    title: "Combo Clásico",
    description: "Hamburguesa clásica + papitas + bebida + salsa",
    price: 4490,
    image: comboClasicaIndividualImg,
    imageAlt: "Combo clásico",
    category: "combo-individual",
    removableIngredients: ["Salsa", "Tomate", "Lechuga", "Queso"],
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
  comboSmokeCriminal,
];

export const premiumCombos: MenuItem[] = [
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
  comboSmokeCriminalXl,
];

export const familyCombos: MenuItem[] = [
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
  {
    id: "combo-familiar",
    title: "Combo Familiar",
    description: "3 hamburguesas clasicas + 2 hamburguesas bacon",
    price: 10490,
    image: comboFamiliarImg,
    imageAlt: "Combo familiar clasico",
    category: "combo-familiar",
    favorite: true,
    removalUnitLabels: ["Clasica 1", "Clasica 2", "Clasica 3", "Bacon 1", "Bacon 2"],
    removalUnitIngredients: [
      clasicaRemovableIngredients,
      clasicaRemovableIngredients,
      clasicaRemovableIngredients,
      baconRemovableIngredients,
      baconRemovableIngredients,
    ],
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
];

export const paperoCombos: MenuItem[] = [
  {
    id: "combo-papero-cs-clasica",
    title: "Combo Papero Clasica",
    description: "Clasica + papitas + salsa a eleccion.",
    price: 3490,
    image: comboPaperoClasicaImg,
    imageAlt: "Combo Papero Clasica",
    category: "acompanamientos",
    removableIngredients: ["Salsa", "Tomate", "Lechuga", "Queso"],
    options: [createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions)],
  },
  {
    id: "combo-papero-cs-bacon",
    title: "Combo Papero Bacon",
    description: "Bacon + papitas + salsa a eleccion.",
    price: 3890,
    image: comboPaperoBaconImg,
    imageAlt: "Combo Papero Bacon",
    category: "acompanamientos",
    favorite: true,
    removableIngredients: ["Salsa", "Tocino", "Queso", "Cebolla caramelizada"],
    options: [createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions)],
  },
  {
    id: "combo-papero-cs-italiana",
    title: "Combo Papero Italiana",
    description: "Italiana + papitas + salsa a eleccion.",
    price: 3690,
    image: comboPaperoItalianaImg,
    imageAlt: "Combo Papero Italiana",
    category: "acompanamientos",
    removableIngredients: ["Mayonesa", "Palta", "Tomate", "Queso"],
    options: [createOptionGroup("salsa", "Salsa para las papas", friesSauceOptions)],
  },
];

const burgerItems: MenuItem[] = [
  {
    id: "cs-bacon",
    title: "Bacon",
    description: "Pan de hamburguesa, 90g de hamburguesa, cheddar, tocino ahumado, cebolla caramelizada y salsa BBQ.",
    price: 2490,
    image: hambBaconImg,
    imageAlt: "Hamburguesa Bacon con tocino y queso cheddar",
    category: "hamburguesas",
    badge: "Top ventas",
    favorite: true,
    removableIngredients: baconRemovableIngredients,
  },
  {
    id: "cs-romp-ii",
    title: "Romp II",
    description: "Pan artesanal, hamburguesa de 100g, doble cheddar, doble tocino ahumado, huevo frito, cebolla caramelizada y salsa BBQ.",
    price: 3190,
    image: hambRompedietaDosImg,
    imageAlt: "Hamburguesa Romp II con doble cheddar y huevo",
    category: "hamburguesas",
    badge: "Top ventas",
    favorite: true,
    removableIngredients: ["Huevo frito", "Tocino", "Cebolla caramelizada", "Salsa BBQ", "Queso cheddar"],
  },
  {
    id: "cs-clasica",
    title: "Clásica",
    description: "Pan, hamburguesa de 90g, cheddar, tomate, lechuga y aderezo tipo Big Mac (sin pepinillo).",
    price: 2090,
    image: hambClasicaImg,
    imageAlt: "Hamburguesa Clásica de Ceeseburger's",
    category: "hamburguesas",
    removableIngredients: clasicaRemovableIngredients,
  },
  {
    id: "cs-italiana",
    title: "Italiana",
    description: "Pan de hamburguesa, 90g de hamburguesa, cheddar, mayonesa, tomate y palta.",
    price: 2290,
    image: hambItalianaImg,
    imageAlt: "Hamburguesa Italiana con cheddar, tomate y palta",
    category: "hamburguesas",
    removableIngredients: ["Palta", "Tomate", "Mayonesa", "Queso cheddar"],
  },
  {
    id: "cs-nueva",
    title: "Rompedieta I",
    description: "Pan brioche, hamburguesa de 100g, doble queso cheddar, tocino, lechuga, tomate, cebolla morada y mayonesa.",
    price: 3190,
    image: hambRompedietaUnoImg,
    imageAlt: "Hamburguesa Rompedieta I",
    category: "hamburguesas",
    removableIngredients: ["Tocino", "Lechuga", "Tomate", "Cebolla morada", "Salsa", "Queso cheddar"],
  },
  {
    id: "rompedietita-i",
    title: "Rompedietita I",
    description: "Pan, hamburguesa de 90g, queso cheddar, tocino, lechuga, tomate, cebolla morada y salsa Chick Fill A.",
    price: 2690,
    image: hambRompedietitaImg,
    imageAlt: "Hamburguesa Rompedietita I",
    category: "hamburguesas",
    badge: "Nuevo",
    removableIngredients: ["Tocino", "Lechuga", "Tomate", "Cebolla morada", "Salsa Chick Fill A", "Queso cheddar"],
  },
  {
    id: "smoke-criminal",
    title: "Smoke Criminal",
    description: "Pan, hamb de 90g, cheddar, tocino, cebolla crispy, BBQ y mayo.",
    price: 2490,
    image: hambSmokeCriminalImg,
    imageAlt: "Hamburguesa Smoke Criminal con tocino, cheddar y salsa BBQ",
    category: "hamburguesas",
    badge: "Nuevo",
    removableIngredients: ["BBQ", "Mayo", "Tocino", "Cheddar", "Cebolla crispy"],
  },
  {
    id: "smoke-criminal-xl",
    title: "Smoke Criminal XL",
    description: "Pan brioche, 2 hamburguesas de 100g, triple cheddar, doble tocino, cebolla crispy, BBQ y mayo.",
    price: 4690,
    image: hambSmokeCriminalXlImg,
    imageAlt: "Hamburguesa Smoke Criminal XL con tocino, cheddar y salsa BBQ",
    category: "hamburguesas",
    badge: "Nuevo",
    removableIngredients: ["BBQ", "Mayo", "Doble tocino", "Triple cheddar", "Cebolla crispy"],
  },
];

export function getBurgerItems(): MenuItem[] {
  return burgerItems.map((item) => ({
    ...item,
    image: burgerImagesBySlug[item.id] ?? item.image,
    badge: newBurgerSlugs.has(item.id) ? "Nuevo" : item.badge,
  }));
}

export function getClassicBurgerItems(): MenuItem[] {
  const burgerItems = getBurgerItems();
  return classicBurgerSlugs
    .map((slug) => burgerItems.find((item) => item.id === slug))
    .filter((item): item is MenuItem => Boolean(item));
}

export function getPremiumBurgerItems(): MenuItem[] {
  const burgerItems = getBurgerItems();
  return premiumBurgerSlugs
    .map((slug) => burgerItems.find((item) => item.id === slug))
    .filter((item): item is MenuItem => Boolean(item));
}

export const sideItems: MenuItem[] = [
  { id: "papitas-fritas", title: "Papitas fritas", description: "El acompanamiento clasico para cualquier pedido.", price: 1300, image: friesImage, imageAlt: "Papitas fritas", category: "acompanamientos" },
  {
    id: "bebida",
    title: "Bebida",
    description: "Acompanamiento para tu pedido.",
    price: 1000,
    image: drinkImage,
    imageAlt: "Bebida",
    category: "acompanamientos",
    options: [createOptionGroup("bebida", "Sabor de bebida", sideDrinkOptions)],
  },
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
