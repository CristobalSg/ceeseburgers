import { supabase } from "@/lib/supabase";
import type { MenuImage } from "@/services/adminImages";

export type Product = {
  id: string;
  nombre: string;
  detalle: string;
  valor: number;
  imagen_nombre: string | null;
  imagen_path: string | null;
  imagen_url: string | null;
  activo: boolean;
  created_at: string;
  producto_ingredientes_eliminar: ProductIngredient[];
};

export type ProductIngredient = {
  id: string;
  nombre: string;
  orden: number;
};

export type CreateProductPayload = {
  nombre: string;
  detalle: string;
  valor: number;
  image: MenuImage;
  removableIngredients: string[];
};

type ProductInsertResponse = {
  id: string;
};

export async function listProducts() {
  const { data, error } = await supabase
    .from("productos")
    .select(
      "id, nombre, detalle, valor, imagen_nombre, imagen_path, imagen_url, activo, created_at, producto_ingredientes_eliminar(id, nombre, orden)"
    )
    .order("created_at", { ascending: false })
    .order("orden", {
      ascending: true,
      referencedTable: "producto_ingredientes_eliminar",
    });

  if (error) {
    throw new Error(error.message || "No pudimos cargar los productos.");
  }

  return (data ?? []) as Product[];
}

export async function createProduct(payload: CreateProductPayload) {
  const cleanedIngredients = payload.removableIngredients
    .map((ingredient) => ingredient.trim())
    .filter(Boolean);

  const { data: product, error: productError } = await supabase
    .from("productos")
    .insert({
      nombre: payload.nombre.trim(),
      detalle: payload.detalle.trim(),
      valor: payload.valor,
      imagen_nombre: payload.image.name,
      imagen_path: payload.image.path,
      imagen_url: payload.image.url,
    })
    .select("id")
    .single<ProductInsertResponse>();

  if (productError || !product) {
    throw new Error(productError?.message || "No pudimos crear el producto.");
  }

  if (cleanedIngredients.length === 0) {
    return;
  }

  const { error: ingredientsError } = await supabase
    .from("producto_ingredientes_eliminar")
    .insert(
      cleanedIngredients.map((ingredient, index) => ({
        producto_id: product.id,
        nombre: ingredient,
        orden: index,
      }))
    );

  if (ingredientsError) {
    await supabase.from("productos").delete().eq("id", product.id);
    throw new Error(ingredientsError.message || "No pudimos guardar los ingredientes.");
  }
}
