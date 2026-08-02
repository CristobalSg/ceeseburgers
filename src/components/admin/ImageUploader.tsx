import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import {
  createUniqueMenuImageName,
  uploadMenuImage,
} from "@/services/adminImages";

import { processImageToSquareWebp } from "./imageProcessing";

type UploadState = "idle" | "processing" | "uploading" | "success" | "error";

type ImageUploaderProps = {
  onUploaded: () => void;
};

export function ImageUploader({ onUploaded }: ImageUploaderProps) {
  const [state, setState] = useState<UploadState>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    setState("processing");
    setMessage("Procesando a 800x800 px y convirtiendo a WebP...");

    try {
      if (!file.type.startsWith("image/")) {
        throw new Error("Selecciona un archivo de imagen valido.");
      }

      const processed = await processImageToSquareWebp(file);

      setPreviewUrl((currentPreviewUrl) => {
        if (currentPreviewUrl) URL.revokeObjectURL(currentPreviewUrl);
        return processed.previewUrl;
      });

      const fileName = createUniqueMenuImageName(file.name);
      setState("uploading");
      setMessage("Subiendo imagen al bucket menu-images...");

      await uploadMenuImage(processed.blob, fileName);

      setState("success");
      setMessage(`Imagen subida como ${fileName}.`);
      onUploaded();
    } catch (uploadError) {
      setState("error");
      setMessage(uploadError instanceof Error ? uploadError.message : "No pudimos subir la imagen.");
    }
  }

  const isBusy = state === "processing" || state === "uploading";

  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-black tracking-tight text-zinc-950">Gestion de imagenes</h2>
          <p className="mt-1 text-sm text-zinc-600">
            La imagen se recorta al centro, queda en 800x800 px y se sube como WebP.
          </p>
        </div>

        <label className="inline-flex cursor-pointer items-center justify-center rounded-md bg-zinc-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-600">
          <input
            className="sr-only"
            type="file"
            accept="image/*"
            disabled={isBusy}
            onChange={handleFileChange}
          />
          {isBusy ? "Trabajando..." : "Seleccionar imagen"}
        </label>
      </div>

      {previewUrl ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-[160px_1fr] sm:items-center">
          <img
            className="aspect-square w-40 rounded-md border border-zinc-200 object-cover"
            src={previewUrl}
            alt="Vista previa procesada"
          />
          <p className="text-sm text-zinc-600">Vista previa del archivo WebP final.</p>
        </div>
      ) : null}

      {message ? (
        <p
          className={[
            "mt-5 rounded-md border px-4 py-3 text-sm",
            state === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "",
            state === "error" ? "border-red-200 bg-red-50 text-red-700" : "",
            state === "processing" || state === "uploading"
              ? "border-amber-200 bg-amber-50 text-amber-800"
              : "",
          ].join(" ")}
        >
          {message}
        </p>
      ) : null}
    </section>
  );
}
