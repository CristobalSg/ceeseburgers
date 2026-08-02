import { supabase } from "@/lib/supabase";

const MENU_IMAGES_BUCKET = "menu-images";
const MENU_IMAGES_FOLDER = "productos";

export type MenuImage = {
  name: string;
  path: string;
  url: string;
  size: number | null;
  createdAt: string | null;
};

export async function listMenuImages() {
  const { data, error } = await supabase.storage
    .from(MENU_IMAGES_BUCKET)
    .list(MENU_IMAGES_FOLDER, {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });

  if (error) {
    throw new Error(error.message || "No pudimos cargar las imagenes.");
  }

  return (data ?? [])
    .filter((item) => item.name.toLowerCase().endsWith(".webp"))
    .map((item) => {
      const path = `${MENU_IMAGES_FOLDER}/${item.name}`;
      const { data: publicUrlData } = supabase.storage
        .from(MENU_IMAGES_BUCKET)
        .getPublicUrl(path);

      return {
        name: item.name,
        path,
        url: publicUrlData.publicUrl,
        size: item.metadata?.size ? Number(item.metadata.size) : null,
        createdAt: item.created_at ?? null,
      } satisfies MenuImage;
    });
}

export async function uploadMenuImage(file: Blob, fileName: string) {
  if (file.type !== "image/webp") {
    throw new Error("La imagen procesada no es WebP y no se subira a Supabase.");
  }

  const { error } = await supabase.storage
    .from(MENU_IMAGES_BUCKET)
    .upload(`${MENU_IMAGES_FOLDER}/${fileName}`, file, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message || "No pudimos subir la imagen.");
  }
}

export function createUniqueMenuImageName(originalName: string) {
  const baseName = originalName
    .replace(/\.[^/.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

  const safeName = baseName || "menu-image";
  return `${Date.now()}-${crypto.randomUUID()}-${safeName}.webp`;
}
