import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import { listMenuImages } from "@/services/adminImages";
import type { MenuImage } from "@/services/adminImages";

import { ImageGallery } from "./ImageGallery";
import { ImageUploader } from "./ImageUploader";
import { ProductManager } from "./ProductManager";

type AdminDashboardProps = {
  userEmail: string;
};

export function AdminDashboard({ userEmail }: AdminDashboardProps) {
  const [images, setImages] = useState<MenuImage[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [galleryError, setGalleryError] = useState<string | null>(null);

  const loadImages = useCallback(async () => {
    setIsLoadingImages(true);
    setGalleryError(null);

    try {
      const nextImages = await listMenuImages();
      setImages(nextImages);
    } catch (error) {
      setGalleryError(error instanceof Error ? error.message : "No pudimos cargar la galeria.");
    } finally {
      setIsLoadingImages(false);
    }
  }, []);

  useEffect(() => {
    void loadImages();
  }, [loadImages]);

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-6 text-zinc-950 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-6 flex flex-col gap-4 border-b border-zinc-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Panel administrativo</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight">Ceeseburgers</h1>
            <p className="mt-1 text-sm text-zinc-600">{userEmail}</p>
          </div>

          <button
            className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-4 py-3 text-sm font-bold text-zinc-950 transition hover:border-red-300 hover:text-red-700"
            type="button"
            onClick={handleSignOut}
          >
            Cerrar sesion
          </button>
        </header>

        <ProductManager images={images} />
        <ImageUploader onUploaded={loadImages} />
        <ImageGallery images={images} isLoading={isLoadingImages} error={galleryError} />
      </div>
    </main>
  );
}
