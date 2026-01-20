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
          const cardHref = `/producto/${product.slug}`;
          return (
            <a
              key={product.slug}
              href={cardHref}
              className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm transition duration-200 hover:scale-[1.02]"
            >
              <img
                src={product.image}
                alt={product.imageAlt}
                className="w-full h-56 object-cover transition duration-200"
              />
              <div className="absolute left-0 right-0 bottom-0 p-4">
                <p className="bg-black/70 inline-block text-white text-lg font-semibold px-3 py-1 rounded">{product.name}</p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
