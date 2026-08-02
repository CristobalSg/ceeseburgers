import type { MenuImage } from "@/services/adminImages";

type ImageGalleryProps = {
  images: MenuImage[];
  isLoading: boolean;
  error: string | null;
};

export function ImageGallery({ images, isLoading, error }: ImageGalleryProps) {
  return (
    <section className="mt-6">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-black tracking-tight text-zinc-950">Galeria</h2>
          <p className="mt-1 text-sm text-zinc-600">{images.length} imagenes en menu-images</p>
        </div>
      </div>

      {isLoading ? (
        <p className="rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
          Cargando imagenes...
        </p>
      ) : null}

      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {!isLoading && !error && images.length === 0 ? (
        <p className="rounded-md border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
          Todavia no hay imagenes en el bucket.
        </p>
      ) : null}

      {images.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <article key={image.path} className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
              <img
                className="aspect-square w-full rounded-md border border-zinc-100 object-cover"
                src={image.url}
                alt={image.name}
                loading="lazy"
              />
              <div className="mt-4 space-y-2">
                <h3 className="break-words text-sm font-bold text-zinc-950">{image.name}</h3>
                <a
                  className="block break-all text-xs font-medium text-red-700 underline-offset-4 hover:underline"
                  href={image.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {image.url}
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}
