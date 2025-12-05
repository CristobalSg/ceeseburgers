import { StarIcon } from "@heroicons/react/24/solid";
import csBaconImage from "../../img/cs-bacon-prod.png";
import csRompeImage from "../../img/cs-rompedieta-prod.png";
import csClasicaImage from "../../img/cs-clasica-prod.png";

export type Product = {
  name: string;
  price: string;
  description: string;
  spec: string;
  tag: string;
  slug: string;
  featured?: boolean;
  image: string;
  imageAlt: string;
  detail?: {
    longDescription: string;
    reviews: string[];
    ingredients: string;
    availability: string;
    images: string[];
  };
};

export const products: Product[] = [
  {
    name: "Cs-Bacon",
    price: "$2.390",
    description: "Pan brioche, 90g de vacuno, cheddar, tocino ahumado, cebolla caramelizada y aderezos de la casa.",
    spec: "Gancho estrella · lista en 14–17 min",
    tag: "Producto estrella",
    slug: "cs-bacon",
    featured: true,
    image: csBaconImage,
    imageAlt: "Hamburguesa Cs-Bacon con tocino y queso cheddar",
    detail: {
      longDescription:
        "Hamburguesa artesanal con pan brioche, hamburguesa de vacuno de 90g, queso cheddar, tocino ahumado, cebolla caramelizada y aderezos de la casa. Su sabor equilibrado y su estética fotogénica la vuelven la opción favorita del público joven.",
      reviews: [
        "“Exquisita y contundente. El tocino es un 10/10, volvería a pedir sin pensarlo.” — Cliente real.",
        "“Una hamburguesa que sorprende por su sabor y precio. Ideal para el fin de semana.” — Cliente real.",
      ],
      ingredients: "Pan brioche, hamburguesa 90g, queso cheddar (1 lámina), tocino ahumado, cebolla caramelizada, aderezos.",
      availability: "Disponible para despacho (14–17 minutos promedio) y retiro en el local.",
      images: [csBaconImage, csBaconImage, csBaconImage],
    },
  },
  {
    name: "Cs-Romp II",
    price: "$2.990",
    description: "Hamburguesa 100g, doble cheddar, doble tocino, huevo frito, cebolla caramelizada y pan artesanal.",
    spec: "Cargada de sabor · ideal fin de semana",
    tag: "Intensa",
    slug: "cs-romp-ii",
    image: csRompeImage,
    imageAlt: "Hamburguesa Cs-Romp II con doble cheddar y huevo",
  },
  {
    name: "Cs-Clásica",
    price: "$1.990",
    description: "Pan brioche, 90g de vacuno, cheddar, tomate, lechuga y aderezos. La opción segura y rápida.",
    spec: "Opción conveniente para el día a día",
    tag: "Clásica",
    slug: "cs-clasica",
    image: csClasicaImage,
    imageAlt: "Hamburguesa Cs-Clásica de Ceeseburgers",
  },
];

export function Products() {
  return (
    <section id="pedido" className="space-y-6">
      <div className="grid gap-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">Productos destacados</p>
        <h3 className="text-3xl font-bold text-slate-900">Lo mejor de Ceeseburgers para tu antojo</h3>
        <p className="text-base text-slate-600">Tres opciones pensadas para distintos niveles de hambre y antojo.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((product) => {
          const isFeatured = product.featured;
          const cardHref = `/producto/${product.slug}`;
          return (
            <a
              key={product.name}
              href={cardHref}
              className={`group flex h-full flex-col justify-between overflow-hidden rounded-2xl border shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg ${
                isFeatured ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className="relative">
                <img src={product.image} alt={product.imageAlt} className="h-44 w-full object-cover transition duration-200 group-hover:scale-[1.02]" />
                <div
                  className={`absolute left-3 top-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                    isFeatured ? "bg-amber-100 text-amber-800 ring-1 ring-amber-200" : "bg-red-50 text-red-700"
                  }`}
                >
                  {isFeatured ? <StarIcon className="h-4 w-4" aria-hidden /> : null}
                  {product.tag}
                </div>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-baseline gap-2">
                  <h4 className="text-xl font-semibold text-slate-900 group-hover:text-slate-950">{product.name}</h4>
                  <span className={`text-sm font-semibold ${isFeatured ? "text-amber-800" : "text-red-700"}`}>
                    {product.price}
                  </span>
                </div>
                <p className="text-sm text-slate-600">{product.description}</p>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{product.spec}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
