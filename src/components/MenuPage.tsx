import { StarIcon } from "@heroicons/react/24/solid";
import { products } from "./Products";
import type { Product } from "./Products";

export function MenuPage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-2 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-700">Menú completo</p>
        <h3 className="text-3xl font-bold text-slate-900">Todos nuestros productos</h3>
        <p className="text-base text-slate-600">Explora el menú completo y haz clic en cualquier producto para ver más detalles.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((product: Product) => {
          const isFeatured = product.featured;
          const cardHref = `/producto/${product.slug}`;
          return (
            <a
              key={product.slug}
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
