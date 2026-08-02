import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import type { MenuImage } from "@/services/adminImages";
import { createProduct, listProducts } from "@/services/adminProducts";
import type { Product } from "@/services/adminProducts";

type ProductManagerProps = {
  images: MenuImage[];
};

const currencyFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function ProductManager({ images }: ProductManagerProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [nombre, setNombre] = useState("");
  const [detalle, setDetalle] = useState("");
  const [valor, setValor] = useState("");
  const [selectedImagePath, setSelectedImagePath] = useState("");
  const [ingredients, setIngredients] = useState([""]);

  const selectedImage = useMemo(
    () => images.find((image) => image.path === selectedImagePath) ?? null,
    [images, selectedImagePath]
  );

  const loadProducts = useCallback(async () => {
    setIsLoadingProducts(true);

    try {
      const nextProducts = await listProducts();
      setProducts(nextProducts);
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "No pudimos cargar los productos.",
      });
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    void loadProducts();
  }, [loadProducts]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    const parsedValue = Number(valor);

    if (!nombre.trim() || !detalle.trim()) {
      setStatus({ type: "error", message: "Completa nombre y detalle." });
      return;
    }

    if (!Number.isInteger(parsedValue) || parsedValue < 0) {
      setStatus({ type: "error", message: "Ingresa un valor valido en pesos." });
      return;
    }

    if (!selectedImage) {
      setStatus({ type: "error", message: "Selecciona una imagen para el producto." });
      return;
    }

    setIsSaving(true);

    try {
      await createProduct({
        nombre,
        detalle,
        valor: parsedValue,
        image: selectedImage,
        removableIngredients: ingredients,
      });

      setNombre("");
      setDetalle("");
      setValor("");
      setSelectedImagePath("");
      setIngredients([""]);
      setStatus({ type: "success", message: "Producto creado correctamente." });
      await loadProducts();
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "No pudimos crear el producto.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  function updateIngredient(index: number, value: string) {
    setIngredients((currentIngredients) =>
      currentIngredients.map((ingredient, ingredientIndex) =>
        ingredientIndex === index ? value : ingredient
      )
    );
  }

  function removeIngredient(index: number) {
    setIngredients((currentIngredients) =>
      currentIngredients.length === 1
        ? [""]
        : currentIngredients.filter((_, ingredientIndex) => ingredientIndex !== index)
    );
  }

  return (
    <section className="mb-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-black tracking-tight text-zinc-950">Productos</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Crea productos usando una imagen ya procesada desde el bucket menu-images.
        </p>
      </div>

      <form className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-bold text-zinc-800">Nombre</span>
            <input
              className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
              value={nombre}
              required
              onChange={(event) => setNombre(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-zinc-800">Detalle</span>
            <textarea
              className="mt-2 min-h-28 w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
              value={detalle}
              required
              onChange={(event) => setDetalle(event.target.value)}
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-zinc-800">Valor</span>
            <input
              className="mt-2 w-full rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
              type="number"
              min="0"
              step="1"
              value={valor}
              required
              onChange={(event) => setValor(event.target.value)}
            />
          </label>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-sm font-bold text-zinc-800">Ingredientes que se pueden eliminar</span>
              <button
                className="rounded-md border border-zinc-300 px-3 py-2 text-xs font-bold text-zinc-800 transition hover:border-red-300 hover:text-red-700"
                type="button"
                onClick={() => setIngredients((currentIngredients) => [...currentIngredients, ""])}
              >
                Agregar
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ingredient, index) => (
                <div className="grid grid-cols-[minmax(0,1fr)_88px] gap-2" key={index}>
                  <input
                    className="rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/15"
                    value={ingredient}
                    placeholder="Ej: tomate"
                    onChange={(event) => updateIngredient(index, event.target.value)}
                  />
                  <button
                    className="rounded-md border border-zinc-300 px-3 py-2 text-xs font-bold text-zinc-800 transition hover:border-red-300 hover:text-red-700"
                    type="button"
                    onClick={() => removeIngredient(index)}
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside>
          <span className="text-sm font-bold text-zinc-800">Imagen</span>

          {images.length === 0 ? (
            <p className="mt-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              Sube una imagen antes de crear productos.
            </p>
          ) : (
            <div className="mt-2 max-h-[520px] space-y-2 overflow-auto rounded-md border border-zinc-200 p-2">
              {images.map((image) => (
                <label
                  className={[
                    "grid cursor-pointer grid-cols-[64px_1fr] gap-3 rounded-md border p-2 transition",
                    selectedImagePath === image.path
                      ? "border-red-500 bg-red-50"
                      : "border-zinc-200 hover:border-zinc-300",
                  ].join(" ")}
                  key={image.path}
                >
                  <input
                    className="sr-only"
                    type="radio"
                    name="product-image"
                    value={image.path}
                    checked={selectedImagePath === image.path}
                    onChange={() => setSelectedImagePath(image.path)}
                  />
                  <img className="aspect-square w-16 rounded object-cover" src={image.url} alt={image.name} />
                  <span className="break-all text-xs font-semibold text-zinc-700">{image.name}</span>
                </label>
              ))}
            </div>
          )}
        </aside>

        <div className="lg:col-span-2">
          {status ? (
            <p
              className={[
                "mb-4 rounded-md border px-4 py-3 text-sm",
                status.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-700",
              ].join(" ")}
            >
              {status.message}
            </p>
          ) : null}

          <button
            className="rounded-md bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-zinc-400"
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Crear producto"}
          </button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-5">
        <h3 className="text-base font-black tracking-tight text-zinc-950">Productos creados</h3>

        {isLoadingProducts ? (
          <p className="mt-3 text-sm text-zinc-600">Cargando productos...</p>
        ) : null}

        {!isLoadingProducts && products.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-600">Todavia no hay productos.</p>
        ) : null}

        {products.length > 0 ? (
          <div className="mt-4 grid gap-3">
            {products.map((product) => (
              <article
                className="grid gap-4 rounded-lg border border-zinc-200 p-4 sm:grid-cols-[96px_1fr_auto]"
                key={product.id}
              >
                {product.imagen_url ? (
                  <img
                    className="aspect-square w-24 rounded-md object-cover"
                    src={product.imagen_url}
                    alt={product.nombre}
                    loading="lazy"
                  />
                ) : null}
                <div>
                  <h4 className="font-black text-zinc-950">{product.nombre}</h4>
                  <p className="mt-1 text-sm text-zinc-600">{product.detalle}</p>
                  {product.producto_ingredientes_eliminar.length > 0 ? (
                    <p className="mt-2 text-xs font-semibold text-zinc-500">
                      Removibles:{" "}
                      {product.producto_ingredientes_eliminar
                        .map((ingredient) => ingredient.nombre)
                        .join(", ")}
                    </p>
                  ) : null}
                </div>
                <p className="text-sm font-black text-zinc-950">{currencyFormatter.format(product.valor)}</p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
