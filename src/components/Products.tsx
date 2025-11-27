import csBaconImage from "../../img/cs-bacon.PNG";
import csRompeImage from "../../img/cs-rompedieta.JPG";
import csClasicaImage from "../../img/cs-clasica.png";

type Product = {
  name: string;
  price: string;
  description: string;
  spec: string;
  tag: string;
  image: string;
  imageAlt: string;
};

const products: Product[] = [
  {
    name: "Cs-Bacon",
    price: "$2.390",
    description: "Pan brioche, 90g de vacuno, cheddar, tocino ahumado, cebolla caramelizada y aderezos de la casa.",
    spec: "Gancho estrella · lista en 14–17 min",
    tag: "Producto estrella",
    image: csBaconImage,
    imageAlt: "Hamburguesa Cs-Bacon con tocino y queso cheddar",
  },
  {
    name: "Cs-Romp II",
    price: "$2.990",
    description: "Hamburguesa 100g, doble cheddar, doble tocino, huevo frito, cebolla caramelizada y pan artesanal.",
    spec: "Premium accesible · ideal fin de semana",
    tag: "Producto premium",
    image: csRompeImage,
    imageAlt: "Hamburguesa Cs-Romp II con doble cheddar y huevo",
  },
  {
    name: "Cs-Clásica",
    price: "$1.990",
    description: "Pan brioche, 90g de vacuno, cheddar, tomate, lechuga y aderezos. La opción segura y rápida.",
    spec: "Opción económica · pedidos frecuentes",
    tag: "Complemento",
    image: csClasicaImage,
    imageAlt: "Hamburguesa Cs-Clásica de Ceeseburgers",
  },
];

type ProductsProps = {
  ctaHref: string;
};

export function Products({ ctaHref }: ProductsProps) {
  return (
    <section id="pedido" className="space-y-6">
      <div className="grid gap-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-600">Productos destacados</p>
        <h3 className="text-3xl font-bold text-slate-900">Lo mejor de Ceeseburgers para tu antojo</h3>
        <p className="text-base text-slate-600">Seleccionados para maximizar conversión: un estrella, un premium y un clásico.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((product) => (
          <article key={product.name} className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="relative">
              <img src={product.image} alt={product.imageAlt} className="h-44 w-full object-cover" />
              <div className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
                {product.tag}
              </div>
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-baseline gap-2">
                <h4 className="text-xl font-semibold text-slate-900">{product.name}</h4>
                <span className="text-sm font-semibold text-cyan-700">{product.price}</span>
              </div>
              <p className="text-sm text-slate-600">{product.description}</p>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{product.spec}</p>
            </div>
            <div className="p-5 pt-0">
              <a
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-cyan-500"
                href={ctaHref}
              >
                Agregar al pedido
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
