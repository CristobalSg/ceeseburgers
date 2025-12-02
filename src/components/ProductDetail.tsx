import { useEffect, useState } from "react";
import type { Product } from "./Products";

type ProductDetailProps = {
  product: Product | null;
  ctaHref: string;
};

export function ProductDetail({ product, ctaHref }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!product) {
    return (
      <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Producto no encontrado</h2>
        <p className="text-sm text-slate-600">Parece que este producto ya no está disponible.</p>
        <a className="text-sm font-semibold text-red-700 underline decoration-red-200 underline-offset-4" href="/">
          Volver al catálogo
        </a>
      </section>
    );
  }

  const gallery = (product.detail?.images ?? [product.image]).slice(0, 4);

  useEffect(() => {
    if (!gallery.length) return;
    const id = window.setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % gallery.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [gallery.length]);

  return (
    <section className="space-y-8">
      <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-[1fr_1.1fr] sm:p-8">
        <div className="overflow-hidden rounded-2xl">
          <div className="relative">
            <img src={gallery[photoIndex]} alt={`${product.name} foto ${photoIndex + 1}`} className="w-full object-cover transition duration-300" />
            {gallery.length > 1 ? (
              <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                {gallery.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPhotoIndex(idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                    className={`h-2 w-6 rounded-full transition ${idx === photoIndex ? "bg-red-700" : "bg-white/60 hover:bg-white"}`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
            <span>Destacado</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>
          <p className="text-lg text-slate-700">{product.detail?.longDescription ?? product.description}</p>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">{product.spec}</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-2xl font-semibold text-amber-800">{product.price}</span>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
              <button
                className="rounded-full bg-white px-2 py-1 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <span className="min-w-[1.5rem] text-center">{quantity}</span>
              <button
                className="rounded-full bg-white px-2 py-1 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
                onClick={() => setQuantity((q) => Math.min(12, q + 1))}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-full bg-red-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-red-600"
              href={ctaHref}
            >
              Agregar {quantity} al carrito
            </a>
            <a className="text-sm font-semibold text-red-700 underline decoration-red-200 underline-offset-4" href="/">
              Volver
            </a>
          </div>
        </div>
      </div>

      <div className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Resumen de conversión</h2>
          <dl className="space-y-2 text-sm text-slate-700">
            <div className="flex gap-2">
              <dt className="w-32 font-semibold text-slate-900">Precio</dt>
              <dd>
                $2.390. Precio competitivo que refuerza la accesibilidad del menú manteniendo una percepción de calidad superior. Su margen permite un
                crecimiento sostenible.
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-32 font-semibold text-slate-900">Descripción</dt>
              <dd>{product.detail?.longDescription ?? product.description}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-32 font-semibold text-slate-900">Disponibilidad</dt>
              <dd>{product.detail?.availability ?? "Disponible"}</dd>
            </div>
          </dl>
        </div>
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Especificaciones técnicas</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>
              <span className="font-semibold text-slate-900">Ingredientes:</span> {product.detail?.ingredients ?? product.description}
            </li>
            <li>
              <span className="font-semibold text-slate-900">Costo:</span> {product.detail?.cost ?? "—"}
            </li>
            <li>
              <span className="font-semibold text-slate-900">Ganancia estimada:</span> {product.detail?.profit ?? "—"}
            </li>
          </ul>
        </div>
      </div>

      {product.detail?.reviews?.length ? (
        <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-slate-900">Reseñas reales</h2>
          <ul className="space-y-2 text-sm text-slate-700">
            {product.detail.reviews.map((review) => (
              <li key={review} className="rounded-lg bg-slate-50 p-3 text-slate-800 shadow-sm">
                {review}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900">Imágenes sugeridas</h2>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">3–5 fotos profesionales</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {(product.detail?.images ?? [product.image]).map((img, idx) => (
            <div key={`${img}-${idx}`} className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <img src={img} alt={`${product.name} - foto ${idx + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
